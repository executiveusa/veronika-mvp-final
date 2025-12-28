# RUBE MCP INTEGRATION GUIDE
## For Veronika MVP Dashboard

**Status:** 🟡 Ready for Implementation  
**Version:** 1.0  
**Last Updated:** December 27, 2025

---

## 📋 WHAT IS RUBE?

**Rube** is a Model Context Protocol (MCP) server that bridges your AI assistant with 500+ business applications:
- Gmail, Outlook, Google Calendar
- Slack, Microsoft Teams
- GitHub, Linear, Jira, Asana
- Airtable, Notion, Google Sheets
- Stripe, PayPal
- HubSpot, Salesforce
- Zapier, Make
- ...and 400+ more

**Benefits for Veronika:**
- Automate client communications (Gmail)
- Post team updates (Slack)
- Sync bookings to calendar
- Manage projects across multiple tools
- Handle invoicing/payments automatically
- Manage CRM without leaving dashboard

---

## 🎯 USE CASES FOR VERONIKA MVP

### 1. **Client Communication Automation**
```
User says: "Send welcome email to all new clients"
Rube connects to: Gmail
Action: Fetches new clients from dashboard, sends personalized emails
```

### 2. **Booking Synchronization**
```
User says: "Add my next booking to Google Calendar"
Rube connects to: Google Calendar + Gmail
Action: Creates calendar event, sends invite to client
```

### 3. **Project Status Updates**
```
User says: "Post project updates to Slack"
Rube connects to: Slack + Dashboard Database
Action: Fetches project data, creates formatted Slack message
```

### 4. **Invoice Generation**
```
User says: "Create invoice for TechCorp and send it"
Rube connects to: Gmail + Stripe/PayPal
Action: Generates invoice, sends payment link
```

### 5. **Lead Management**
```
User says: "Add new booking contact to Airtable"
Rube connects to: Airtable + Database
Action: Syncs booking data to Airtable base
```

---

## 🔧 INSTALLATION STEPS

### Step 1: Install Rube Package

```bash
cd veronika-mvp-final

# Install Rube globally
npm install -g @composio/rube

# Or install locally in project
npm install @composio/rube

# Verify installation
npx @composio/rube --version
```

### Step 2: Initialize Rube Setup

```bash
# Run setup wizard
npx @composio/rube setup

# This will:
# 1. Ask which AI client you use (Claude, Cursor, VS Code, etc)
# 2. Generate Rube configuration
# 3. Display Rube URL and API key
# 4. Guide you through authenticating with Composio
```

### Step 3: Create Rube Configuration File

```json
{
  "rube": {
    "url": "https://rube.app/mcp",
    "agent": "custom",
    "composioApiKey": "YOUR_COMPOSIO_API_KEY",
    "defaultApps": [
      "gmail",
      "google-calendar",
      "slack",
      "airtable",
      "github",
      "stripe"
    ]
  }
}
```

### Step 4: Create Rube Component in Dashboard

Create file: `src/components/dashboard/rube-integrations.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, MessageSquare, TrendingUp, Database, DollarSign } from 'lucide-react';

const RUBE_INTEGRATIONS = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Send emails, manage inbox',
    icon: Mail,
    color: 'text-red-500',
    connected: false
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync bookings and meetings',
    icon: Calendar,
    color: 'text-blue-500',
    connected: false
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Post team updates',
    icon: MessageSquare,
    color: 'text-purple-500',
    connected: false
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Manage and sync data',
    icon: Database,
    color: 'text-teal-500',
    connected: false
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments',
    icon: DollarSign,
    color: 'text-cyan-500',
    connected: false
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Manage projects',
    icon: TrendingUp,
    color: 'text-gray-700',
    connected: false
  }
];

export function RubeIntegrations() {
  const [integrations, setIntegrations] = useState(RUBE_INTEGRATIONS);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const handleConnect = async (appId: string) => {
    setIsConnecting(appId);
    try {
      // TODO: Call Rube API to authenticate app
      // const response = await fetch('/api/rube/connect', {
      //   method: 'POST',
      //   body: JSON.stringify({ app: appId })
      // });
      
      // Simulate connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIntegrations(prev =>
        prev.map(int =>
          int.id === appId ? { ...int, connected: true } : int
        )
      );
    } catch (error) {
      console.error(`Failed to connect ${appId}:`, error);
    } finally {
      setIsConnecting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">
          Rube Integrations
        </h2>
        <p className="text-muted-foreground">
          Connect 500+ apps to automate your workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const IconComponent = integration.icon;
          return (
            <Card key={integration.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-8 w-8 ${integration.color}`} />
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={integration.connected ? 'default' : 'secondary'}
                >
                  {integration.connected ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>

              <Button
                onClick={() => handleConnect(integration.id)}
                disabled={isConnecting === integration.id || integration.connected}
                className="w-full"
              >
                {isConnecting === integration.id
                  ? 'Connecting...'
                  : integration.connected
                  ? 'Disconnect'
                  : 'Connect'}
              </Button>
            </Card>
          );
        })}
      </div>

      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">How to Use Rube</h4>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Connect your apps above</li>
          <li>2. Go to your AI assistant (Claude, Cursor, etc)</li>
          <li>3. Ask: "Send a welcome email to my latest client"</li>
          <li>4. Rube will handle it for you!</li>
        </ol>
      </div>
    </div>
  );
}
```

---

## 🔐 AUTHENTICATION SETUP

### For Each Integration, Follow This Pattern:

#### Gmail Setup
```bash
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials (Desktop application)
3. Download credentials.json
4. In Rube setup: Authenticate with Google
5. Grant scope: email, calendar, send emails
```

#### Slack Setup
```bash
1. Go to Slack API dashboard
2. Create new app
3. Request bot token scopes:
   - chat:write
   - channels:read
   - users:read
4. Copy bot token
5. In Rube setup: Paste bot token
```

#### Calendar Sync
```bash
1. Connect Google Calendar (same OAuth as Gmail)
2. Grant scope: calendar:write
3. Rube can now create events from bookings
```

---

## 📝 BACKEND API ENDPOINTS (To Implement)

### Connect Integration
```typescript
// POST /api/rube/connect
interface RubeConnectRequest {
  app: string; // 'gmail', 'slack', etc
  redirectUrl?: string;
}

interface RubeConnectResponse {
  authUrl: string; // Send user to this URL
  appId: string;
}
```

### Disconnect Integration
```typescript
// DELETE /api/rube/integrations/:appId
// Response: { success: boolean }
```

### Trigger Rube Action
```typescript
// POST /api/rube/actions
interface RubeActionRequest {
  action: string; // e.g., 'send-email', 'create-calendar-event'
  data: Record<string, any>;
}

interface RubeActionResponse {
  success: boolean;
  result?: any;
  error?: string;
}
```

---

## 🧠 EXAMPLE RUBE PROMPTS FOR VERONIKA

Once connected, users can ask their AI:

**Email Automation**
- "Send a welcome email to all new clients from the last 7 days"
- "Reply to all unread emails from TechCorp"
- "Create email template for project invoices"

**Calendar Integration**
- "Add all my bookings to Google Calendar"
- "Send calendar invites to clients for their scheduled sessions"
- "Show my availability for this week"

**Slack Integration**
- "Post project status to #business-updates"
- "Send me a daily summary of new bookings"
- "Create reminder for upcoming client calls"

**Airtable Integration**
- "Create a new client record in Airtable"
- "Sync all expenses to my Airtable base"
- "Export project list to Airtable"

**Payments**
- "Create invoice and send payment link via Stripe"
- "Generate monthly revenue report"
- "Process refund for project X"

---

## 🚀 INTEGRATION CHECKLIST

- [ ] Rube npm package installed
- [ ] Rube setup completed (`npx @composio/rube setup`)
- [ ] Composio account created (free tier)
- [ ] Gmail connected and tested
- [ ] Google Calendar connected and tested
- [ ] Slack connected and tested
- [ ] Airtable connected and tested (if using)
- [ ] Stripe connected and tested (if using)
- [ ] RubeIntegrations component added to dashboard
- [ ] Backend API endpoints created
- [ ] Users can authenticate with apps
- [ ] Test prompt works in AI assistant
- [ ] Error handling implemented
- [ ] Logging and monitoring set up

---

## 🔄 DATA FLOW DIAGRAM

```
┌─────────────────────────────────────┐
│     Veronika Dashboard              │
│  (React Component)                  │
└──────────────┬──────────────────────┘
               │
               ├─→ RubeIntegrations   ← User clicks "Connect Gmail"
               │   Component
               │
               ▼
         User Auth Flow
         (OAuth 2.0 or API Key)
               │
               ▼
       ┌──────────────────┐
       │   Composio       │
       │   (Rube Server)  │
       │   500+ Connectors│
       └────────┬─────────┘
                │
    ┌───────────┼───────────┬──────────────┬──────────────┐
    │           │           │              │              │
    ▼           ▼           ▼              ▼              ▼
  Gmail      Slack      Google      Airtable         Stripe
           Calendar
    
    │           │           │              │              │
    └───────────┼───────────┴──────────────┴──────────────┘
                │
                ▼
        ┌──────────────────┐
        │   AI Assistant   │
        │  (Claude, etc)   │
        │ Sees all 500+    │
        │ app functions    │
        │ as available     │
        │ tools            │
        └──────────────────┘
                │
        User says: "Send welcome
        email to TechCorp contact"
                │
                ▼
        Claude → Rube → Gmail
        (AI makes API calls)
```

---

## 🧪 TESTING RUBE INTEGRATION

### Manual Test
```bash
1. Open Claude, Cursor, or AI assistant
2. Enable Rube MCP connector
3. Type: "Connect my Gmail account"
4. Wait for Rube to list available tools
5. Type: "What emails do I have from veronika@..."
6. Rube should fetch and display emails
```

### Automated Test (Jest)
```typescript
describe('Rube Integration', () => {
  it('should connect to Gmail', async () => {
    const response = await fetch('/api/rube/connect', {
      method: 'POST',
      body: JSON.stringify({ app: 'gmail' })
    });
    expect(response.status).toBe(200);
    expect(response.data.authUrl).toBeDefined();
  });

  it('should send email via Rube', async () => {
    const response = await fetch('/api/rube/actions', {
      method: 'POST',
      body: JSON.stringify({
        action: 'send-email',
        data: {
          to: 'client@example.com',
          subject: 'Hello',
          body: 'Welcome to Veronika'
        }
      })
    });
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  });
});
```

---

## 📚 DOCUMENTATION & RESOURCES

### Official Docs
- **Rube Docs:** https://rube.app/docs
- **Composio Docs:** https://docs.composio.dev
- **Rube GitHub:** https://github.com/ComposioHQ/Rube
- **Composio Apps List:** https://www.composio.dev/apps

### Helpful Tutorials
- Setting up Rube with Claude Desktop
- OAuth 2.0 Flow Explained
- Building AI Agents with Rube
- Integrating Rube with Next.js

### API References
- Rube API Endpoints: https://docs.rube.app/api
- Composio API: https://docs.composio.dev/api-reference
- MCP Protocol: https://modelcontextprotocol.io

---

## ❓ TROUBLESHOOTING

### "Rube not connecting to Gmail"
- Verify Google OAuth credentials
- Check scopes include `email` and `calendar`
- Ensure Composio account is verified
- Check browser console for errors

### "Rube integration not visible in dashboard"
- Verify component is imported in Dashboard.tsx
- Check that RubeIntegrations component is rendered
- Verify Rube setup completed
- Check browser network tab

### "AI assistant can't see Rube tools"
- Verify Rube MCP server is running
- Check AI client has MCP enabled
- Restart AI client after setup
- Check Rube configuration matches client

### "Integration losing connection"
- Tokens may have expired
- OAuth refresh token may be invalid
- Reauthorize the integration
- Check Composio dashboard for errors

---

## 🔒 SECURITY BEST PRACTICES

✅ **DO:**
- Store API keys in environment variables
- Use OAuth 2.1 (most secure)
- Rotate API keys regularly
- Log integration activity
- Encrypt sensitive data at rest
- Validate all API responses

❌ **DON'T:**
- Store credentials in code
- Share API keys via email/chat
- Use API keys in client-side code
- Skip token refresh
- Log sensitive data
- Trust unverified integrations

---

## 💡 ADVANCED FEATURES

### 1. **Custom Actions**
Create custom Rube actions for Veronika-specific workflows:
```typescript
// Send welcome email when new client added
rube.on('client.created', async (client) => {
  await rube.gmail.send({
    to: client.email,
    subject: `Welcome to Veronika's coaching!`,
    template: 'welcome_email'
  });
});
```

### 2. **Multi-Step Workflows**
```typescript
// When booking confirmed:
// 1. Send email to client
// 2. Add to calendar
// 3. Post to Slack
// 4. Create Airtable record

await rube.chain([
  { app: 'gmail', action: 'send', data: {...} },
  { app: 'google-calendar', action: 'create-event', data: {...} },
  { app: 'slack', action: 'post-message', data: {...} },
  { app: 'airtable', action: 'create-record', data: {...} }
]);
```

### 3. **Real-Time Subscriptions**
```typescript
// Listen for changes in Gmail and sync to dashboard
rube.gmail.subscribe('new-email', async (email) => {
  // Store in dashboard database
  await db.emails.create(email);
});
```

---

## 📊 RUBE INTEGRATION ROADMAP

| Phase | Feature | Status | ETA |
|-------|---------|--------|-----|
| 1 | Basic app connection (Gmail, Slack) | 🔴 TODO | Week 1 |
| 2 | Calendar syncing | 🔴 TODO | Week 2 |
| 3 | Automated email templates | 🔴 TODO | Week 3 |
| 4 | Multi-step workflows | 🔴 TODO | Week 4 |
| 5 | Real-time subscriptions | 🔴 TODO | Week 5 |
| 6 | Custom actions | 🔴 TODO | Week 6 |
| 7 | AI agent training | 🔴 TODO | Week 7 |

---

**Document Status:** 🟡 READY FOR IMPLEMENTATION  
**Next Step:** Install Rube and authenticate first integration  
**Support:** Check https://docs.composio.dev for detailed guides
