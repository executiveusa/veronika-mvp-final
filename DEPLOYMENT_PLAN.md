# VERONIKA MVP - COMPLETE DEPLOYMENT PLAN

## Self-Hosted with Coolify + Hostinger Domain

**Status:** 🔴 IN PLANNING - Ready for Implementation  
**Last Updated:** December 27, 2025  
**Target Deployment:** January 2026

---

## 📋 DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│           (executiveusa/veronika-mvp-final)                 │
│                                                              │
│  - Source code (React/TypeScript)                           │
│  - Automatic deployment triggers                            │
│  - CI/CD pipeline via Coolify                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Coolify (Self-Hosted)                     │
│              VPS with Coolify Container Manager              │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Docker Container: veronika-mvp-frontend             │   │
│  │ - Node.js 18+ Runtime                               │   │
│  │ - Vite production build                             │   │
│  │ - Port 3000 → Nginx reverse proxy                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Docker Container: PostgreSQL Database               │   │
│  │ - Persistent volume for data                        │   │
│  │ - Automatic backups                                 │   │
│  │ - Port 5432 (internal only)                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Docker Container: Redis Cache (Optional)            │   │
│  │ - Session management                                │   │
│  │ - Real-time subscriptions                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Nginx Reverse Proxy                                 │   │
│  │ - SSL/TLS (Let's Encrypt)                           │   │
│  │ - Domain: veronikadmitova.com                       │   │
│  │ - HTTP → HTTPS redirect                            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               Hostinger DNS Management                       │
│                                                              │
│  - Domain: veronikadmitova.com                              │
│  - A Record: points to Coolify VPS IP                       │
│  - MX Records: email setup (optional)                       │
│  - CAA Records: SSL certificate authority                   │
│  - TTL: 3600 seconds                                        │
└─────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    End Users                                 │
│                                                              │
│  - Visit: https://veronikadmitova.com                       │
│  - Public site (Index.tsx)                                  │
│  - Book demo page (BookDemo.tsx)                            │
│  - Dashboard (authenticated users only)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 REQUIRED TOOLS & SETUP

### 1. **Coolify CLI**

```bash
# Installation
npm install -g @coolify/cli

# Or use directly
npx @coolify/cli

# Verify installation
coolify --version

# Login to Coolify
coolify login

# Get API token from: https://app.coolify.io/account/api-tokens
```

**What it does:**

- Manages your VPS and containers
- Deploys applications from GitHub
- Manages SSL certificates automatically
- Monitors application health
- Manages environment variables

### 2. **Hostinger CLI**

```bash
# Installation (via Hostinger dashboard or npm)
npm install -g hostinger-cli

# Or visit: https://www.hostinger.com/dns-management

# Verify domain ownership
hostinger dns add veronikadmitova.com

# Verify DNS propagation
hostinger dns check veronikadmitova.com
```

**What it does:**

- Manages your domain (veronikadmitova.com)
- Updates DNS records
- Configures A/CNAME records
- Manages SSL certificates

### 3. **Supabase CLI** (if using managed Supabase)

```bash
npm install -g supabase

# Or use self-hosted PostgreSQL on Coolify
```

---

## 📦 TECH STACK CONFIGURATION

| Component           | Technology          | Hosting         | Notes                        |
| ------------------- | ------------------- | --------------- | ---------------------------- |
| **Frontend**        | React 18 + Vite     | Coolify         | Built with `npm run build`   |
| **Server Runtime**  | Node.js 18+         | Coolify         | Via Docker container         |
| **Database**        | PostgreSQL 15+      | Coolify         | Self-hosted in Docker        |
| **Cache**           | Redis (optional)    | Coolify         | For sessions + subscriptions |
| **Auth**            | Supabase Auth       | Coolify/Managed | JWT-based                    |
| **Domain**          | veronikadmitova.com | Hostinger       | DNS + SSL                    |
| **SSL Certificate** | Let's Encrypt       | Coolify         | Auto-renew                   |
| **Monitoring**      | Built-in Coolify    | Coolify         | Logs + alerts                |

---

## 🗄️ DATABASE SCHEMA

### PostgreSQL Tables (to be created in migrations)

```sql
-- Users table (Supabase Auth handles this)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Clients table
CREATE TABLE public.clients (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  location TEXT,
  status TEXT CHECK (status IN ('active', 'inactive', 'prospect')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Projects table
CREATE TABLE public.projects (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  client_id INTEGER REFERENCES public.clients(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('planning', 'in-progress', 'review', 'completed')),
  progress INTEGER DEFAULT 0,
  budget DECIMAL(10, 2),
  spent DECIMAL(10, 2) DEFAULT 0,
  deadline DATE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Expenses table
CREATE TABLE public.expenses (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  client_id INTEGER REFERENCES public.clients(id),
  project_id INTEGER REFERENCES public.projects(id),
  status TEXT CHECK (status IN ('pending', 'approved', 'reimbursed')),
  receipt_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Bookings table
CREATE TABLE public.bookings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER DEFAULT 60,
  status TEXT CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  source TEXT CHECK (source IN ('website', 'referral', 'direct', 'social')),
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_clients_user_id ON public.clients(user_id);
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_expenses_user_id ON public.expenses(user_id);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
```

---

## 🔐 ENVIRONMENT VARIABLES

### `.env.local` (Local Development)

```env
VITE_APP_NAME=Veronika MVP
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Coolify Environment Variables (Production)

```env
# Frontend
VITE_APP_NAME=Veronika MVP
VITE_API_URL=https://veronikadmitova.com
VITE_SUPABASE_URL=https://db.veronikadmitova.com
VITE_SUPABASE_ANON_KEY=<prod-anon-key>

# Backend/Database
DATABASE_URL=postgresql://user:password@localhost:5432/veronika_db
REDIS_URL=redis://localhost:6379
NODE_ENV=production

# Auth
SUPABASE_JWT_SECRET=<your-jwt-secret>
SUPABASE_URL=https://db.veronikadmitova.com
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Monitoring
SENTRY_DSN=<sentry-dsn>
LOG_LEVEL=info
```

---

## 🚀 DEPLOYMENT STEPS

### Phase 1: Coolify Setup (Hours 1-2)

```bash
# 1. Install Coolify CLI
npm install -g @coolify/cli

# 2. Login to Coolify
coolify login
# Opens browser for authentication

# 3. Create new application in Coolify
coolify apps create \
  --name veronika-mvp \
  --git-url https://github.com/executiveusa/veronika-mvp-final.git \
  --build-command "npm install && npm run build" \
  --start-command "npm run preview" \
  --port 3000

# 4. Add environment variables
coolify apps env set \
  --app veronika-mvp \
  --env-file .env.production

# 5. Enable auto-deployment on GitHub push
coolify apps github-sync enable \
  --app veronika-mvp \
  --branch main
```

### Phase 2: Database Setup on Coolify (Hours 2-3)

```bash
# 1. Create PostgreSQL database container
coolify databases create \
  --name veronika-db \
  --type postgres \
  --version 15

# 2. Connect app to database
coolify apps env set \
  --app veronika-mvp \
  --key DATABASE_URL \
  --value postgresql://user:password@veronika-db:5432/veronika

# 3. Run migrations
coolify databases migrate \
  --database veronika-db \
  --migration-file schema.sql
```

### Phase 3: Domain Configuration (Hours 3-4)

```bash
# 1. Point domain to Coolify VPS
# In Hostinger DNS:
#   A Record: veronikadmitova.com → [COOLIFY_VPS_IP]
#   CNAME: www → veronikadmitova.com

# 2. Configure SSL in Coolify
coolify domains add \
  --app veronika-mvp \
  --domain veronikadmitova.com \
  --ssl-provider letsencrypt

# 3. Verify domain propagation
coolify domains check veronikadmitova.com
```

### Phase 4: Initial Deployment (Hours 4-5)

```bash
# 1. Deploy to production
coolify apps deploy \
  --app veronika-mvp \
  --branch main

# 2. Monitor deployment logs
coolify apps logs veronika-mvp --follow

# 3. Test deployment
curl https://veronikadmitova.com

# 4. Run health checks
coolify apps health veronika-mvp
```

---

## 🔐 SECURITY CHECKLIST

- [ ] SSL certificate configured and auto-renewing
- [ ] Database password changed from default
- [ ] API keys stored in Coolify secrets (not in code)
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Environment variables are secrets, not exposed
- [ ] Database backups automated
- [ ] Firewall rules configured
- [ ] DDoS protection enabled (if available)
- [ ] Regular security updates scheduled

---

## 📊 MONITORING & MAINTENANCE

### Logs

```bash
# View application logs
coolify apps logs veronika-mvp --follow

# View database logs
coolify databases logs veronika-db

# View system logs
coolify system logs
```

### Backups

```bash
# Automatic daily backups configured
# Manual backup
coolify databases backup veronika-db

# Restore from backup
coolify databases restore veronika-db --backup-id <id>
```

### Updates

```bash
# Check for updates
coolify system updates available

# Update Coolify
coolify system update

# Update container images
coolify apps update veronika-mvp
```

---

## 🧪 TESTING BEFORE LAUNCH

### Pre-Launch Checklist

- [ ] All pages load without errors
- [ ] Authentication works (login/logout)
- [ ] Dashboard CRUD operations functional
- [ ] Booking form submissions saved to database
- [ ] Email notifications sent
- [ ] Mobile responsive on all pages
- [ ] Performance acceptable (Lighthouse score 80+)
- [ ] No console errors
- [ ] All external links work
- [ ] LinkedIn profile link correct
- [ ] Rube MCP integrations working

### Performance Testing

```bash
# Run Lighthouse audit
npm run build
npx lighthouse https://veronikadmitova.com

# Load testing (optional)
npm install -g artillery
artillery quick --count 100 --num 10 https://veronikadmitova.com
```

---

## 📱 RUBE MCP INTEGRATION

### Setup Rube for Dashboard

```bash
# 1. Install Rube
npm install @composio/rube

# 2. Configure for Veronika's use cases
# - Gmail: Client communication automation
# - Slack: Team notifications
# - Airtable: Data management alternative
# - Google Calendar: Booking synchronization
# - Stripe/Paypal: Payment integrations
# - Linear: Project management
# - Notion: Documentation

# 3. Initialize Rube setup
npx @composio/rube setup

# 4. Test integrations in dashboard
```

---

## 🔄 CONTINUOUS DEPLOYMENT WORKFLOW

```
1. Developer pushes code to GitHub main branch
   ↓
2. Coolify webhook triggered
   ↓
3. Coolify pulls latest code
   ↓
4. Coolify runs: npm install && npm run build
   ↓
5. Build artifacts created (dist/)
   ↓
6. New Docker container spun up
   ↓
7. Health checks run
   ↓
8. Old container stopped (if healthy)
   ↓
9. DNS points to new container
   ↓
10. Zero-downtime deployment complete!
```

---

## 📞 SUPPORT & RESOURCES

### Documentation Links

- **Coolify Docs:** https://coolify.io/docs
- **Hostinger DNS:** https://www.hostinger.com/help/article/dns-management
- **Rube Docs:** https://rube.app/docs
- **Supabase Auth:** https://supabase.com/docs/guides/auth

### Contact

- **Coolify Support:** support@coolify.io
- **Hostinger Support:** support@hostinger.com
- **Composio (Rube):** support@composio.dev

---

## 📅 TIMELINE

| Phase       | Tasks                                    | Duration     | Status      |
| ----------- | ---------------------------------------- | ------------ | ----------- |
| **Phase 1** | Fix LinkedIn, GitHub sync, research CLIs | 2 hours      | Not Started |
| **Phase 2** | Coolify setup, database setup            | 3 hours      | Not Started |
| **Phase 3** | Domain configuration, SSL setup          | 2 hours      | Not Started |
| **Phase 4** | Initial deployment, testing              | 3 hours      | Not Started |
| **Phase 5** | Rube integration, backend completion     | 4 hours      | Not Started |
| **Phase 6** | Full testing, performance audit          | 3 hours      | Not Started |
| **Phase 7** | Launch, monitoring setup                 | 2 hours      | Not Started |
| **Total**   | Complete deployment                      | **19 hours** | In Planning |

---

## ✅ FINAL DEPLOYMENT CHECKLIST

### Before Going Live

- [ ] All code pushed to GitHub
- [ ] Environment variables configured in Coolify
- [ ] Database migrations run
- [ ] SSL certificate active
- [ ] Domain DNS propagated (wait 24-48 hours)
- [ ] All tests passing
- [ ] Monitoring configured
- [ ] Backups enabled
- [ ] Team trained on deployment process

### Launch Day

- [ ] Check application logs
- [ ] Verify homepage loads
- [ ] Test user registration/login
- [ ] Test booking submission
- [ ] Monitor error rate
- [ ] Check performance metrics
- [ ] Send launch announcement

### Day 1 Post-Launch

- [ ] Monitor logs for errors
- [ ] Check database backups working
- [ ] Verify email notifications
- [ ] Test Rube integrations
- [ ] Gather user feedback

---

**Document Status:** 🟡 PLANNING  
**Next Step:** Start Phase 1 implementation  
**Review:** Scheduled before launch
