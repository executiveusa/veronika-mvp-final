import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { authenticateUser } from '../middleware/auth';
import { PiAgent, ChatMessage } from '../agent/index';

export const chatRouter = Router();

/**
 * POST /api/chat
 *
 * Streams a response from the Pi Agent using Server-Sent Events (SSE).
 *
 * Request Headers:
 *   Authorization: Bearer <supabase_jwt>
 *   Content-Type: application/json
 *
 * Request Body:
 *   { messages: [{role: 'user'|'assistant', content: string}], sessionId?: string }
 *
 * SSE Response Stream:
 *   event: text        data: <string content chunk>
 *   event: tool_call   data: {"name":"...", "args":{...}}
 *   event: tool_result data: {"name":"...", "result":{...}}
 *   event: done        data: {}
 *   event: error       data: {"message":"..."}
 */
chatRouter.post('/', authenticateUser, async (req: Request, res: Response): Promise<void> => {
  const { messages } = req.body as { messages?: ChatMessage[] };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages must be a non-empty array' });
    return;
  }

  // Validate each message has the right shape
  for (const msg of messages) {
    if (!msg.role || !['user', 'assistant'].includes(msg.role)) {
      res.status(400).json({ error: "Each message must have role 'user' or 'assistant'" });
      return;
    }
    if (typeof msg.content !== 'string' || msg.content.trim() === '') {
      res.status(400).json({ error: 'Each message must have a non-empty content string' });
      return;
    }
  }

  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    res.status(500).json({ error: 'Server configuration error: missing Supabase credentials' });
    return;
  }

  // Set SSE headers before any writes
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx proxy buffering

  // CORS credentials header for SSE (may be needed in some browser configs)
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  res.flushHeaders();

  // Emit a named SSE event
  const sendEvent = (eventName: string, data: unknown): void => {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    res.write(`event: ${eventName}\ndata: ${payload}\n\n`);
  };

  // Keep-alive comment every 15 seconds to prevent proxy/browser timeouts
  const keepAliveTimer = setInterval(() => {
    res.write(': keep-alive\n\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(keepAliveTimer);
  });

  // Create Supabase service-role client; all queries are filtered by userId
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const agent = new PiAgent(supabase, userId);

    for await (const event of agent.chat(messages)) {
      switch (event.type) {
        case 'text':
          sendEvent('text', event.content);
          break;
        case 'tool_call':
          sendEvent('tool_call', { name: event.name, args: event.args });
          break;
        case 'tool_result':
          sendEvent('tool_result', { name: event.name, result: event.result });
          break;
        case 'done':
          sendEvent('done', {});
          break;
        case 'error':
          sendEvent('error', { message: event.message });
          break;
      }

      if (event.type === 'done' || event.type === 'error') break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected agent error';
    console.error('[Chat Route] Unhandled error:', message);
    sendEvent('error', { message });
  } finally {
    clearInterval(keepAliveTimer);
    res.end();
  }
});
