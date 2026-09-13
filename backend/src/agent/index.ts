import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';
import { allTools, skillHandlers } from './skills/index';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// SSE event types emitted by the agent generator
export type AgentEvent =
  | { type: 'text'; content: string }
  | { type: 'tool_call'; name: string; args: Record<string, unknown> }
  | { type: 'tool_result'; name: string; result: unknown }
  | { type: 'done' }
  | { type: 'error'; message: string };

// Accumulated tool call data while streaming
interface ToolCallAccumulator {
  index: number;
  id: string;
  name: string;
  arguments: string;
}

export class PiAgent {
  private openai: OpenAI;
  private supabase: SupabaseClient;
  private userId: string;
  private systemPrompt: string;

  constructor(supabase: SupabaseClient, userId: string) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    this.openai = new OpenAI({ apiKey });
    this.supabase = supabase;
    this.userId = userId;

    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.systemPrompt = `You are Pi, an intelligent AI assistant for Veronika — a business management platform for freelancers and consultants. You have access to the user's business data including clients, projects, expenses, bookings, payments, and notes. Help users understand their business, take actions on their behalf, and provide insights. Be concise, professional, and proactive. Today's date is ${today}. Always use tools to get real data rather than making up numbers.

When users ask about their business data, always fetch fresh data using the available tools. When performing actions like creating records, confirm what you did after the action. If a user's request is ambiguous, ask a clarifying question before proceeding.`;
  }

  /**
   * Main agent chat loop. Streams events as an async generator.
   * Implements the ReAct pattern: think → act (tool) → observe → repeat until done.
   */
  async *chat(messages: ChatMessage[]): AsyncGenerator<AgentEvent> {
    // Build the message history including the system prompt
    const openaiMessages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: this.systemPrompt },
      ...messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    // Agent loop — keep calling OpenAI until no more tool calls
    const MAX_ITERATIONS = 10; // prevent infinite loops
    let iteration = 0;

    while (iteration < MAX_ITERATIONS) {
      iteration++;

      let finalText = '';
      const toolCallAccumulators: Map<number, ToolCallAccumulator> = new Map();
      let finishReason: string | null = null;

      try {
        // Start a streaming completion
        const stream = await this.openai.chat.completions.create({
          model: 'gpt-4o',
          messages: openaiMessages,
          tools: allTools,
          tool_choice: 'auto',
          stream: true,
          temperature: 0.7,
          max_tokens: 4096,
        });

        // Process stream chunks
        for await (const chunk of stream) {
          const choice = chunk.choices[0];
          if (!choice) continue;

          finishReason = choice.finish_reason ?? finishReason;
          const delta = choice.delta;

          // Accumulate text content
          if (delta.content) {
            finalText += delta.content;
            yield { type: 'text', content: delta.content };
          }

          // Accumulate tool call chunks
          if (delta.tool_calls) {
            for (const toolCallDelta of delta.tool_calls) {
              const idx = toolCallDelta.index;

              if (!toolCallAccumulators.has(idx)) {
                toolCallAccumulators.set(idx, {
                  index: idx,
                  id: toolCallDelta.id ?? '',
                  name: toolCallDelta.function?.name ?? '',
                  arguments: '',
                });
              }

              const acc = toolCallAccumulators.get(idx)!;
              if (toolCallDelta.id) acc.id = toolCallDelta.id;
              if (toolCallDelta.function?.name) acc.name += toolCallDelta.function.name;
              if (toolCallDelta.function?.arguments) {
                acc.arguments += toolCallDelta.function.arguments;
              }
            }
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'OpenAI API error';
        yield { type: 'error', message };
        return;
      }

      // If there were tool calls, execute them
      if (toolCallAccumulators.size > 0 && finishReason === 'tool_calls') {
        // Add the assistant message with tool calls to history
        const toolCalls: OpenAI.ChatCompletionMessageToolCall[] = Array.from(
          toolCallAccumulators.values()
        ).map((acc) => ({
          id: acc.id,
          type: 'function' as const,
          function: {
            name: acc.name,
            arguments: acc.arguments,
          },
        }));

        // If there was text before tool calls, include it
        openaiMessages.push({
          role: 'assistant',
          content: finalText || null,
          tool_calls: toolCalls,
        });

        // Execute each tool call and collect results
        const toolResults: OpenAI.ChatCompletionToolMessageParam[] = [];

        for (const toolCall of toolCalls) {
          const toolName = toolCall.function.name;
          let parsedArgs: Record<string, unknown> = {};

          try {
            parsedArgs = JSON.parse(toolCall.function.arguments || '{}');
          } catch {
            parsedArgs = {};
          }

          // Emit tool call event so the frontend can show it
          yield { type: 'tool_call', name: toolName, args: parsedArgs };

          let result: unknown;
          try {
            const handler = skillHandlers[toolName];
            if (!handler) {
              result = { error: `Unknown tool: ${toolName}` };
            } else {
              result = await handler(this.supabase, this.userId, parsedArgs);
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Tool execution failed';
            result = { error: errorMessage };
          }

          // Emit tool result event
          yield { type: 'tool_result', name: toolName, result };

          toolResults.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          });
        }

        // Add all tool results to the message history
        openaiMessages.push(...toolResults);

        // Continue the loop to get the next response from OpenAI
        continue;
      }

      // No tool calls — we're done. Emit done event.
      yield { type: 'done' };
      return;
    }

    // Hit max iterations
    yield {
      type: 'error',
      message: 'Agent reached maximum iterations. Please try a more specific question.',
    };
  }
}
