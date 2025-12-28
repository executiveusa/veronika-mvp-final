import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Zap, 
  Mail, 
  Calendar, 
  Database,
  Lightbulb,
  Slack
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SuggestedAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  prompt: string;
}

const SUGGESTED_ACTIONS: SuggestedAction[] = [
  {
    id: 'email-clients',
    icon: <Mail className="h-5 w-5" />,
    label: 'Send Client Emails',
    description: 'Compose and send emails to clients',
    prompt: 'Send a welcome email to all new clients this month'
  },
  {
    id: 'calendar-sync',
    icon: <Calendar className="h-5 w-5" />,
    label: 'Sync Calendar',
    description: 'Add bookings to Google Calendar',
    prompt: 'Add all my upcoming bookings to Google Calendar'
  },
  {
    id: 'slack-updates',
    icon: <Slack className="h-5 w-5" />,
    label: 'Post to Slack',
    description: 'Share updates with your team',
    prompt: 'Post today\'s schedule to my Slack channel'
  },
  {
    id: 'data-sync',
    icon: <Database className="h-5 w-5" />,
    label: 'Sync to Airtable',
    description: 'Manage data in Airtable',
    prompt: 'Sync all client contacts to my Airtable base'
  },
];

export function RubeAssistant() {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = text;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Processing: "${userMessage}". I'm connecting to your integrated apps (Gmail, Google Calendar, Slack, Airtable) to handle this request. In production, this would execute the action across all connected services.`
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestedAction = (action: SuggestedAction) => {
    handleSendMessage(action.prompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Zap className="h-6 w-6" style={{ color: '#4ADE80' }} />
          <h2 
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(226, 232, 240, 0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Rube AI Assistant
          </h2>
          <Badge 
            className="border-0"
            style={{ 
              background: 'rgba(74, 222, 128, 0.15)',
              color: '#4ADE80'
            }}
          >
            Internal Only
          </Badge>
        </div>
        <p style={{ color: 'rgba(226, 232, 240, 0.6)' }}>
          Your AI-powered workflow automation. Connect to 500+ apps and automate tasks with plain English commands.
        </p>
      </div>

      {/* Main Chat Card */}
      <div 
        className="p-6 rounded-2xl space-y-6"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Info Banner */}
        <div 
          className="p-4 rounded-xl"
          style={{
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.2)'
          }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#38BDF8' }} />
            <div className="text-sm">
              <p className="font-semibold mb-1" style={{ color: '#38BDF8' }}>How Rube Works</p>
              <p className="text-xs" style={{ color: 'rgba(56, 189, 248, 0.8)' }}>
                Rube (powered by Composio) connects your dashboard to 500+ business apps. Ask it to send emails, create calendar events, post to Slack, manage Airtable databases, and more—all in plain English.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div 
            className="space-y-4 max-h-80 overflow-y-auto p-4 rounded-xl"
            style={{ background: 'rgba(255, 255, 255, 0.02)' }}
          >
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-xs px-4 py-3 rounded-xl"
                  style={{
                    background: msg.role === 'user' 
                      ? 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: msg.role === 'user' 
                      ? 'none' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div 
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <div className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#4ADE80' }} />
                    <div className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#4ADE80', animationDelay: '0.2s' }} />
                    <div className="h-2 w-2 rounded-full animate-bounce" style={{ background: '#4ADE80', animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggested Actions */}
        {messages.length === 0 && !isExpanded && (
          <div>
            <p className="text-sm font-medium text-white mb-3">Quick Actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTED_ACTIONS.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestedAction(action)}
                  className="text-left p-4 rounded-xl transition-colors"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ 
                        background: 'rgba(74, 222, 128, 0.15)',
                        color: '#4ADE80'
                      }}
                    >
                      {action.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">{action.label}</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>{action.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div 
          className="space-y-3 pt-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(message);
                }
              }}
              placeholder="Ask Rube to automate something..."
              className="rounded-xl border-0 text-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white'
              }}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleSendMessage(message)}
                disabled={!message.trim() || isLoading}
                className="rounded-xl"
                size="icon"
                style={{
                  background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                  color: 'white'
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          <p className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
            💡 Tip: Use natural language like "Send welcome email to TechCorp" or "Add booking to calendar"
          </p>
        </div>
      </div>

      {/* Connected Apps Status */}
      <div 
        className="p-6 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h3 className="font-semibold text-white mb-4">Connected Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { name: 'Gmail', icon: Mail, connected: false },
            { name: 'Google Calendar', icon: Calendar, connected: false },
            { name: 'Slack', icon: MessageSquare, connected: false },
            { name: 'Airtable', icon: Database, connected: false },
          ].map((app) => (
            <motion.div
              key={app.name}
              whileHover={{ y: -2 }}
              className="p-4 rounded-xl transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <app.icon 
                  className="h-5 w-5" 
                  style={{ color: app.connected ? '#4ADE80' : 'rgba(226, 232, 240, 0.5)' }} 
                />
                <span className="text-sm font-medium text-white">{app.name}</span>
              </div>
              <Badge
                className="text-xs border-0"
                style={{
                  background: app.connected ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: app.connected ? '#4ADE80' : 'rgba(226, 232, 240, 0.5)'
                }}
              >
                {app.connected ? 'Connected' : 'Awaiting Setup'}
              </Badge>
            </motion.div>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
          🔐 All connections are secure and encrypted. Your credentials are managed by Composio (SOC 2 compliant).
        </p>
      </div>

      {/* Help Section */}
      <div 
        className="p-6 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" style={{ color: '#4ADE80' }} />
          Example Commands
        </h3>
        <div className="space-y-2 text-sm" style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
          <p>✓ "Send welcome email to all new clients"</p>
          <p>✓ "Add my bookings to Google Calendar"</p>
          <p>✓ "Post project updates to Slack"</p>
          <p>✓ "Create Airtable record for TechCorp"</p>
          <p>✓ "Generate invoice for completed project"</p>
        </div>
      </div>
    </motion.div>
  );
}
