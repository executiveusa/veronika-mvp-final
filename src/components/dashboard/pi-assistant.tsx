import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Zap,
  Bot,
  User,
  Loader2,
  Terminal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RefreshCw,
  Database,
  Users,
  FolderOpen,
  DollarSign,
  Calendar,
  FileText,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: ToolCallDisplay[];
  isStreaming?: boolean;
}

interface ToolCallDisplay {
  name: string;
  args: Record<string, unknown>;
  result?: unknown;
  status: 'running' | 'done' | 'error';
}

const SKILL_ICONS: Record<string, React.ReactNode> = {
  list_clients: <Users className="h-3 w-3" />,
  get_client: <Users className="h-3 w-3" />,
  create_client: <Users className="h-3 w-3" />,
  search_clients: <Users className="h-3 w-3" />,
  list_projects: <FolderOpen className="h-3 w-3" />,
  get_project: <FolderOpen className="h-3 w-3" />,
  create_project: <FolderOpen className="h-3 w-3" />,
  update_project_progress: <FolderOpen className="h-3 w-3" />,
  list_expenses: <DollarSign className="h-3 w-3" />,
  create_expense: <DollarSign className="h-3 w-3" />,
  get_expense_summary: <DollarSign className="h-3 w-3" />,
  list_bookings: <Calendar className="h-3 w-3" />,
  create_booking: <Calendar className="h-3 w-3" />,
  update_booking_status: <Calendar className="h-3 w-3" />,
  list_payments: <DollarSign className="h-3 w-3" />,
  create_payment: <DollarSign className="h-3 w-3" />,
  update_payment_status: <DollarSign className="h-3 w-3" />,
  get_payment_summary: <DollarSign className="h-3 w-3" />,
  list_notes: <FileText className="h-3 w-3" />,
  create_note: <FileText className="h-3 w-3" />,
  search_notes: <FileText className="h-3 w-3" />,
  get_dashboard_summary: <BarChart3 className="h-3 w-3" />,
  get_revenue_summary: <BarChart3 className="h-3 w-3" />,
  get_upcoming_schedule: <Calendar className="h-3 w-3" />,
};

const SKILL_LABELS: Record<string, string> = {
  list_clients: 'Listing clients',
  get_client: 'Getting client',
  create_client: 'Creating client',
  search_clients: 'Searching clients',
  list_projects: 'Listing projects',
  get_project: 'Getting project',
  create_project: 'Creating project',
  update_project_progress: 'Updating project',
  list_expenses: 'Listing expenses',
  create_expense: 'Creating expense',
  get_expense_summary: 'Summarizing expenses',
  list_bookings: 'Listing bookings',
  create_booking: 'Creating booking',
  update_booking_status: 'Updating booking',
  list_payments: 'Listing payments',
  create_payment: 'Creating payment',
  update_payment_status: 'Updating payment',
  get_payment_summary: 'Summarizing payments',
  list_notes: 'Listing notes',
  create_note: 'Creating note',
  search_notes: 'Searching notes',
  get_dashboard_summary: 'Getting overview',
  get_revenue_summary: 'Analyzing revenue',
  get_upcoming_schedule: 'Checking schedule',
};

const SUGGESTED_PROMPTS = [
  { icon: <BarChart3 className="h-4 w-4" />, text: 'Give me a summary of my business today' },
  { icon: <Users className="h-4 w-4" />, text: 'List my active clients' },
  { icon: <Calendar className="h-4 w-4" />, text: 'What bookings do I have coming up?' },
  { icon: <DollarSign className="h-4 w-4" />, text: 'Show me my pending payments' },
  { icon: <FolderOpen className="h-4 w-4" />, text: 'Which projects are in progress?' },
  { icon: <Database className="h-4 w-4" />, text: 'What expenses did I log this month?' },
];

function ToolCallBadge({ tool, expanded, onToggle }: {
  tool: ToolCallDisplay;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-lg overflow-hidden text-xs"
      style={{
        background: 'rgba(56, 189, 248, 0.08)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
      }}
    >
      <button
        className="w-full flex items-center gap-2 px-3 py-2 text-left"
        style={{ color: 'rgba(56, 189, 248, 0.9)' }}
        onClick={onToggle}
      >
        <Terminal className="h-3 w-3 flex-shrink-0" />
        {SKILL_ICONS[tool.name] || <Zap className="h-3 w-3" />}
        <span className="flex-1 font-mono">
          {SKILL_LABELS[tool.name] || tool.name}
        </span>
        {tool.status === 'running' && (
          <Loader2 className="h-3 w-3 animate-spin" style={{ color: '#38BDF8' }} />
        )}
        {tool.status === 'done' && (
          <span style={{ color: '#4ADE80' }}>✓</span>
        )}
        {tool.status === 'error' && (
          <span style={{ color: '#EF4444' }}>✗</span>
        )}
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>
      {expanded && (
        <div
          className="px-3 pb-2 space-y-1"
          style={{ borderTop: '1px solid rgba(56, 189, 248, 0.1)' }}
        >
          <p className="font-mono pt-2" style={{ color: 'rgba(56, 189, 248, 0.6)' }}>
            args: {JSON.stringify(tool.args, null, 2)}
          </p>
          {tool.result !== undefined && (
            <p className="font-mono whitespace-pre-wrap break-all" style={{ color: 'rgba(74, 222, 128, 0.8)' }}>
              result: {typeof tool.result === 'string' ? tool.result : JSON.stringify(tool.result, null, 2)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const [expandedTools, setExpandedTools] = useState<Record<number, boolean>>({});
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
        style={{
          background: isUser
            ? 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)'
            : 'rgba(56, 189, 248, 0.15)',
          border: isUser ? 'none' : '1px solid rgba(56, 189, 248, 0.3)',
        }}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5 text-white" />
        ) : (
          <Bot className="h-3.5 w-3.5" style={{ color: '#38BDF8' }} />
        )}
      </div>

      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {message.toolCalls && message.toolCalls.length > 0 && !isUser && (
          <div className="w-full space-y-1.5">
            {message.toolCalls.map((tool, i) => (
              <ToolCallBadge
                key={i}
                tool={tool}
                expanded={!!expandedTools[i]}
                onToggle={() => setExpandedTools(prev => ({ ...prev, [i]: !prev[i] }))}
              />
            ))}
          </div>
        )}

        {(message.content || message.isStreaming) && (
          <div
            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
            }`}
            style={{
              background: isUser
                ? 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
              color: 'rgba(226, 232, 240, 0.95)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.content}
            {message.isStreaming && (
              <span
                className="inline-block w-0.5 h-4 ml-0.5 animate-pulse"
                style={{ background: '#38BDF8', verticalAlign: 'text-bottom' }}
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function PiAssistant() {
  const { session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/health`, { signal: AbortSignal.timeout(3000) });
      setIsBackendAvailable(res.ok);
    } catch {
      setIsBackendAvailable(false);
    }
  };

  const getToken = useCallback(async () => {
    if (session?.access_token) return session.access_token;
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  }, [session]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
    };

    const assistantId = crypto.randomUUID();
    const assistantMsg: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      toolCalls: [],
      isStreaming: true,
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput('');
    setIsLoading(true);

    const historyForApi = messages.map(m => ({ role: m.role, content: m.content }));
    historyForApi.push({ role: 'user', content: text.trim() });

    abortControllerRef.current = new AbortController();

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Not authenticated. Please log in again.');
      }

      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: historyForApi }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || `Server error: ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const updateAssistant = (updater: (msg: Message) => Message) => {
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? updater(m) : m)
        );
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw || raw === '[DONE]') continue;

          try {
            const event = JSON.parse(raw);

            if (event.type === 'text') {
              updateAssistant(m => ({ ...m, content: m.content + event.content }));
            } else if (event.type === 'tool_call') {
              updateAssistant(m => ({
                ...m,
                toolCalls: [
                  ...(m.toolCalls ?? []),
                  { name: event.name, args: event.args ?? {}, status: 'running' },
                ],
              }));
            } else if (event.type === 'tool_result') {
              updateAssistant(m => ({
                ...m,
                toolCalls: (m.toolCalls ?? []).map((tc, i) =>
                  i === (m.toolCalls!.length - 1) && tc.name === event.name
                    ? { ...tc, result: event.result, status: 'done' }
                    : tc
                ),
              }));
            } else if (event.type === 'done') {
              updateAssistant(m => ({ ...m, isStreaming: false }));
            } else if (event.type === 'error') {
              throw new Error(event.message);
            }
          } catch (parseErr) {
            // skip malformed SSE lines
          }
        }
      }

      updateAssistant(m => ({ ...m, isStreaming: false }));
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
      setMessages(prev => prev.filter(m => m.id !== assistantId));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading, getToken]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setMessages(prev =>
      prev.map(m => m.isStreaming ? { ...m, isStreaming: false } : m)
    );
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-[calc(100vh-12rem)] min-h-[500px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}
          >
            <Sparkles className="h-5 w-5" style={{ color: '#38BDF8' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                className="text-xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(226, 232, 240, 0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Pi Agent
              </h2>
              <Badge
                className="border-0 text-xs"
                style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ADE80' }}
              >
                GPT-4o
              </Badge>
              {isBackendAvailable === false && (
                <Badge
                  className="border-0 text-xs"
                  style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}
                >
                  Backend offline
                </Badge>
              )}
              {isBackendAvailable === true && (
                <Badge
                  className="border-0 text-xs"
                  style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ADE80' }}
                >
                  Online
                </Badge>
              )}
            </div>
            <p className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
              Your intelligent business assistant with full data access
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-xs rounded-lg border-0"
              style={{ color: 'rgba(226, 232, 240, 0.5)', background: 'rgba(255,255,255,0.04)' }}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto rounded-2xl p-4 space-y-5 mb-4"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <div className="text-center space-y-2">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)' }}
              >
                <Bot className="h-7 w-7" style={{ color: '#38BDF8' }} />
              </div>
              <h3 className="font-semibold text-white">Ask Pi anything about your business</h3>
              <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
                Pi reads and writes your real business data — clients, projects, payments, and more.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => sendMessage(prompt.text)}
                  className="flex items-center gap-2 p-3 rounded-xl text-left text-sm transition-colors"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'rgba(226, 232, 240, 0.8)',
                  }}
                >
                  <span style={{ color: '#38BDF8' }}>{prompt.icon}</span>
                  {prompt.text}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {messages.map(msg => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div
          className="mb-3 px-4 py-2 rounded-xl text-sm flex items-center gap-2"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#EF4444',
          }}
        >
          <span className="font-medium">Error:</span> {error}
          <button className="ml-auto text-xs underline" onClick={() => setError(null)}>dismiss</button>
        </div>
      )}

      {/* Input area */}
      <div
        className="rounded-2xl p-3"
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="flex gap-3 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Pi to query your data, create records, or analyze your business..."
            className="min-h-[44px] max-h-36 resize-none border-0 bg-transparent text-sm p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ color: 'rgba(226, 232, 240, 0.95)' }}
            rows={1}
            disabled={isLoading && !isBackendAvailable}
          />
          {isLoading ? (
            <Button
              onClick={handleStop}
              size="icon"
              className="rounded-xl flex-shrink-0 w-9 h-9"
              style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              <span className="text-xs font-bold">■</span>
            </Button>
          ) : (
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              size="icon"
              className="rounded-xl flex-shrink-0 w-9 h-9"
              style={{
                background: input.trim()
                  ? 'linear-gradient(135deg, #0369a1 0%, #38BDF8 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: input.trim() ? 'white' : 'rgba(226, 232, 240, 0.3)',
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-xs mt-2 ml-2" style={{ color: 'rgba(226, 232, 240, 0.3)' }}>
          Enter to send · Shift+Enter for new line · Pi has access to your live business data
        </p>
      </div>
    </motion.div>
  );
}
