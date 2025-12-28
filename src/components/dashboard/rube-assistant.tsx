import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Zap, 
  Mail, 
  Calendar, 
  Users,
  Slack,
  Database,
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';

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

    // Add user message
    const userMessage = text;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    setIsLoading(true);

    // Simulate Rube processing
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
          <Zap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">Rube AI Assistant</h2>
          <Badge className="bg-primary/20 text-primary">Internal Only</Badge>
        </div>
        <p className="text-muted-foreground">
          Your AI-powered workflow automation. Connect to 500+ apps and automate tasks with plain English commands.
        </p>
      </div>

      {/* Main Chat Card */}
      <GlassCard variant="strong" className="p-6 space-y-6">
        {/* Info Banner */}
        <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900 dark:text-blue-200">
              <p className="font-semibold mb-1">How Rube Works</p>
              <p className="text-xs opacity-90">
                Rube (powered by Composio) connects your dashboard to 500+ business apps. Ask it to send emails, create calendar events, post to Slack, manage Airtable databases, and more—all in plain English.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="space-y-4 max-h-80 overflow-y-auto p-4 rounded-lg bg-muted/30">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-card-foreground border border-border'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-card-foreground border border-border px-4 py-2 rounded-lg">
                  <div className="flex gap-2 items-center">
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggested Actions */}
        {messages.length === 0 && !isExpanded && (
          <div>
            <p className="text-sm font-medium text-card-foreground mb-3">Quick Actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTED_ACTIONS.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestedAction(action)}
                  className="text-left p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {action.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-card-foreground">{action.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="space-y-3 pt-4 border-t border-border">
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
              placeholder="Ask Rube to automate something... (e.g., 'Send email to new clients')"
              className="glass border-glass-border text-sm"
            />
            <Button
              onClick={() => handleSendMessage(message)}
              disabled={!message.trim() || isLoading}
              className="bg-primary hover:bg-primary/90"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
                💡 Tip: Use natural language like "Send welcome email to TechCorp" or "Add booking to calendar"
          </p>
        </div>
      </GlassCard>

      {/* Connected Apps Status */}
      <GlassCard variant="strong" className="p-6">
        <h3 className="font-semibold text-card-foreground mb-4">Connected Services</h3>
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
              className="p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <app.icon className={`h-5 w-5 ${app.connected ? 'text-green-500' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium text-card-foreground">{app.name}</span>
              </div>
              <Badge
                variant={app.connected ? 'default' : 'secondary'}
                className="text-xs"
              >
                {app.connected ? 'Connected' : 'Awaiting Setup'}
              </Badge>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          🔐 All connections are secure and encrypted. Your credentials are managed by Composio (SOC 2 compliant).
        </p>
      </GlassCard>

      {/* Help Section */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Example Commands
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>✓ "Send welcome email to all new clients"</p>
          <p>✓ "Add my bookings to Google Calendar"</p>
          <p>✓ "Post project updates to Slack"</p>
          <p>✓ "Create Airtable record for TechCorp"</p>
          <p>✓ "Generate invoice for completed project"</p>
        </div>
      </Card>
    </motion.div>
  );
}
