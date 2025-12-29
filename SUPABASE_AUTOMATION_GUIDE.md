# 🚀 Supabase Multi-Client Automation Guide

## Complete Setup for One-Click Client Deployments

**Goal:** One Supabase account → Multiple client projects → Fully automated from VS Code

---

## 📋 Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites Setup](#2-prerequisites-setup)
3. [Supabase Account Structure](#3-supabase-account-structure)
4. [Self-Hosting Options](#4-self-hosting-options)
5. [VS Code Integration](#5-vs-code-integration)
6. [One-Click Automation Scripts](#6-one-click-automation-scripts)
7. [Database Schema Templates](#7-database-schema-templates)
8. [Deployment Pipeline](#8-deployment-pipeline)
9. [Handoff Documentation](#9-handoff-documentation)

---

## 1. Architecture Overview

### Two Approaches

| Approach | Best For | Complexity |
|----------|----------|------------|
| **A) Supabase Cloud + Multiple Projects** | Quick setup, managed infrastructure | Easy |
| **B) Self-Hosted Supabase on Coolify** | Full control, one-time cost | Medium |

### Recommended: Hybrid Approach
- Use **Supabase Cloud** for the management/admin database
- Use **Self-Hosted Supabase** on your Hostinger VPS for client data
- OR use Supabase Cloud with separate projects per client (simpler)

### Multi-Tenant vs Multi-Project

```
┌─────────────────────────────────────────────────────────┐
│                  YOUR SUPABASE ACCOUNT                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Project 1  │  │  Project 2  │  │  Project 3  │     │
│  │  Client A   │  │  Client B   │  │  Client C   │     │
│  │  ─────────  │  │  ─────────  │  │  ─────────  │     │
│  │  - clients  │  │  - clients  │  │  - clients  │     │
│  │  - projects │  │  - projects │  │  - projects │     │
│  │  - expenses │  │  - expenses │  │  - expenses │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  Each project = Isolated database + auth + API keys    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Why Multiple Projects (not multi-tenant)?**
- Complete data isolation between clients
- Separate API keys per client
- Can transfer ownership if needed
- No complex RLS policies
- Easier backups per client

---

## 2. Prerequisites Setup

### Step 2.1: Install Required Tools

```powershell
# Run in PowerShell as Administrator

# 1. Install Node.js (if not installed)
winget install OpenJS.NodeJS.LTS

# 2. Install Supabase CLI
npm install -g supabase

# 3. Install Docker Desktop (for local testing)
winget install Docker.DockerDesktop

# 4. Verify installations
supabase --version
node --version
docker --version
```

### Step 2.2: VS Code Extensions

Install these extensions in VS Code:

```
1. Supabase (official) - supabase.supabase-vscode
2. PostgreSQL - ckolkman.vscode-postgres
3. REST Client - humao.rest-client
4. Thunder Client - rangav.vscode-thunder-client
```

### Step 2.3: Create Supabase Account

1. Go to https://supabase.com
2. Sign up with GitHub (recommended for CLI integration)
3. Create an organization (e.g., "Veronika Clients")

---

## 3. Supabase Account Structure

### Step 3.1: Generate Access Token

```
1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Name it: "VS Code Automation"
4. Copy the token (save it securely - shown only once!)
```

### Step 3.2: Login via CLI

```powershell
# Login to Supabase CLI
supabase login

# This opens browser - authorize the CLI
# Token is saved locally at ~/.supabase/access-token
```

### Step 3.3: List Your Projects

```powershell
# See all projects in your account
supabase projects list

# Output:
# ┌──────────────────────┬─────────────────┬────────────┐
# │ ID                   │ NAME            │ REGION     │
# ├──────────────────────┼─────────────────┼────────────┤
# │ abcdefghijklmnop     │ veronika-demo   │ us-east-1  │
# └──────────────────────┴─────────────────┴────────────┘
```

---

## 4. Self-Hosting Options

### Option A: Supabase Cloud (Recommended for Starting)

**Pros:** No infrastructure management, automatic updates, backups included
**Cons:** Per-project costs add up with many clients

**Pricing:** Free tier per project includes:
- 500MB database
- 1GB file storage
- 50,000 monthly active users
- Unlimited API requests

### Option B: Self-Hosted on Coolify (Your Hostinger VPS)

**Pros:** One-time cost, unlimited projects, full control
**Cons:** You manage updates, backups, security

#### Step 4.1: Deploy Supabase via Coolify

```yaml
# In Coolify, create a new service with this docker-compose:

version: "3.8"

services:
  supabase-studio:
    image: supabase/studio:latest
    ports:
      - "3000:3000"
    environment:
      STUDIO_PG_META_URL: http://supabase-meta:8080
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      DEFAULT_ORGANIZATION: "Veronika Clients"
      DEFAULT_PROJECT: "Main"
      SUPABASE_URL: ${SUPABASE_URL}
      SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY}
      SUPABASE_SERVICE_KEY: ${SUPABASE_SERVICE_KEY}

  supabase-kong:
    image: kong:2.8.1
    ports:
      - "8000:8000"
      - "8443:8443"
    environment:
      KONG_DATABASE: "off"
      KONG_DECLARATIVE_CONFIG: /var/lib/kong/kong.yml
    volumes:
      - ./kong.yml:/var/lib/kong/kong.yml

  supabase-auth:
    image: supabase/gotrue:v2.99.0
    environment:
      GOTRUE_API_HOST: 0.0.0.0
      GOTRUE_API_PORT: 9999
      API_EXTERNAL_URL: ${API_EXTERNAL_URL}
      GOTRUE_DB_DRIVER: postgres
      GOTRUE_DB_DATABASE_URL: postgres://supabase_auth_admin:${POSTGRES_PASSWORD}@supabase-db:5432/postgres
      GOTRUE_SITE_URL: ${SITE_URL}
      GOTRUE_JWT_SECRET: ${JWT_SECRET}

  supabase-db:
    image: supabase/postgres:15.1.0.117
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - supabase-db-data:/var/lib/postgresql/data

volumes:
  supabase-db-data:
```

#### Step 4.2: Coolify Environment Variables

```env
POSTGRES_PASSWORD=your-super-secure-password-here
JWT_SECRET=your-jwt-secret-min-32-chars-here
SUPABASE_URL=https://supabase.yourdomain.com
API_EXTERNAL_URL=https://supabase.yourdomain.com
SITE_URL=https://yourdomain.com
SUPABASE_ANON_KEY=generated-anon-key
SUPABASE_SERVICE_KEY=generated-service-key
```

---

## 5. VS Code Integration

### Step 5.1: Create VS Code Workspace Settings

Create `.vscode/settings.json` in your project:

```json
{
  "supabase.clientId": "${env:SUPABASE_ACCESS_TOKEN}",
  "rest-client.environmentVariables": {
    "local": {
      "supabaseUrl": "http://localhost:54321",
      "supabaseKey": "your-local-anon-key"
    },
    "production": {
      "supabaseUrl": "https://your-project.supabase.co",
      "supabaseKey": "your-prod-anon-key"
    }
  }
}
```

### Step 5.2: Create REST Client File for Testing

Create `supabase.http` in your project root:

```http
### Variables
@baseUrl = {{$dotenv VITE_SUPABASE_URL}}
@apiKey = {{$dotenv VITE_SUPABASE_PUBLISHABLE_KEY}}
@serviceKey = {{$dotenv SUPABASE_SERVICE_KEY}}

### Health Check
GET {{baseUrl}}/rest/v1/
apikey: {{apiKey}}

### List All Clients
GET {{baseUrl}}/rest/v1/clients?select=*
apikey: {{apiKey}}
Authorization: Bearer {{apiKey}}

### Create New Client
POST {{baseUrl}}/rest/v1/clients
apikey: {{apiKey}}
Authorization: Bearer {{serviceKey}}
Content-Type: application/json
Prefer: return=representation

{
  "name": "New Client Name",
  "email": "client@example.com",
  "company": "Client Company",
  "status": "active"
}

### Get Projects with Client Info
GET {{baseUrl}}/rest/v1/projects?select=*,clients(name,email)
apikey: {{apiKey}}
Authorization: Bearer {{apiKey}}
```

---

## 6. One-Click Automation Scripts

### Step 6.1: Create Project Setup Script

Create `scripts/setup-new-client.ps1`:

```powershell
#!/usr/bin/env pwsh
# ===========================================
# ONE-CLICK NEW CLIENT SETUP
# ===========================================
# Usage: ./scripts/setup-new-client.ps1 -ClientName "ClientName" -Region "us-east-1"

param(
    [Parameter(Mandatory=$true)]
    [string]$ClientName,
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1",
    
    [Parameter(Mandatory=$false)]
    [string]$OrgId = ""
)

$ErrorActionPreference = "Stop"

# Sanitize client name for project ID
$ProjectName = $ClientName.ToLower() -replace '[^a-z0-9]', '-'
$ProjectName = "veronika-$ProjectName"

Write-Host "🚀 Creating new Supabase project: $ProjectName" -ForegroundColor Cyan

# Step 1: Create the project
Write-Host "`n📦 Step 1: Creating Supabase project..." -ForegroundColor Yellow

$createResult = supabase projects create $ProjectName --region $Region --org-id $OrgId 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to create project: $createResult" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project created successfully!" -ForegroundColor Green

# Step 2: Get project details
Write-Host "`n🔑 Step 2: Retrieving project credentials..." -ForegroundColor Yellow

# Wait for project to be ready
Start-Sleep -Seconds 10

$projects = supabase projects list --output json | ConvertFrom-Json
$project = $projects | Where-Object { $_.name -eq $ProjectName }

if (-not $project) {
    Write-Host "❌ Could not find project details" -ForegroundColor Red
    exit 1
}

$ProjectId = $project.id
$ProjectRef = $project.id

Write-Host "  Project ID: $ProjectId" -ForegroundColor Gray

# Step 3: Link project locally
Write-Host "`n🔗 Step 3: Linking project..." -ForegroundColor Yellow

supabase link --project-ref $ProjectRef

# Step 4: Apply database schema
Write-Host "`n🗄️ Step 4: Applying database schema..." -ForegroundColor Yellow

supabase db push

Write-Host "✅ Schema applied!" -ForegroundColor Green

# Step 5: Get API keys
Write-Host "`n🔐 Step 5: Retrieving API keys..." -ForegroundColor Yellow

$apiKeys = supabase projects api-keys --project-ref $ProjectRef --output json | ConvertFrom-Json
$anonKey = ($apiKeys | Where-Object { $_.name -eq "anon" }).api_key
$serviceKey = ($apiKeys | Where-Object { $_.name -eq "service_role" }).api_key

# Step 6: Create client .env file
Write-Host "`n📝 Step 6: Creating environment file..." -ForegroundColor Yellow

$envContent = @"
# Supabase Configuration for: $ClientName
# Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

VITE_SUPABASE_URL=https://$ProjectRef.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=$anonKey

# Server-side only (DO NOT expose to frontend)
SUPABASE_SERVICE_KEY=$serviceKey
"@

$envPath = ".env.$ProjectName"
$envContent | Out-File -FilePath $envPath -Encoding UTF8

Write-Host "✅ Environment file created: $envPath" -ForegroundColor Green

# Step 7: Output summary
Write-Host "`n" + "="*50 -ForegroundColor Cyan
Write-Host "🎉 CLIENT SETUP COMPLETE!" -ForegroundColor Green
Write-Host "="*50 -ForegroundColor Cyan
Write-Host ""
Write-Host "Client Name:    $ClientName"
Write-Host "Project Name:   $ProjectName"
Write-Host "Project ID:     $ProjectRef"
Write-Host "Region:         $Region"
Write-Host "Dashboard:      https://supabase.com/dashboard/project/$ProjectRef"
Write-Host "API URL:        https://$ProjectRef.supabase.co"
Write-Host "Env File:       $envPath"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Copy $envPath to .env.local for development"
Write-Host "2. Set environment variables in Coolify for deployment"
Write-Host "3. Run: npm run dev"
Write-Host ""
```

### Step 6.2: Create Database Migration Script

Create `scripts/apply-schema.ps1`:

```powershell
#!/usr/bin/env pwsh
# ===========================================
# APPLY SCHEMA TO EXISTING PROJECT
# ===========================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectRef
)

Write-Host "🗄️ Applying schema to project: $ProjectRef" -ForegroundColor Cyan

# Link to project
supabase link --project-ref $ProjectRef

# Push migrations
supabase db push

Write-Host "✅ Schema applied successfully!" -ForegroundColor Green
```

### Step 6.3: Create VS Code Task

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🚀 Create New Client",
      "type": "shell",
      "command": "pwsh",
      "args": [
        "-ExecutionPolicy", "Bypass",
        "-File", "${workspaceFolder}/scripts/setup-new-client.ps1",
        "-ClientName", "${input:clientName}",
        "-Region", "${input:region}"
      ],
      "problemMatcher": [],
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": true,
        "panel": "new"
      }
    },
    {
      "label": "🗄️ Apply Schema to Project",
      "type": "shell",
      "command": "pwsh",
      "args": [
        "-ExecutionPolicy", "Bypass",
        "-File", "${workspaceFolder}/scripts/apply-schema.ps1",
        "-ProjectRef", "${input:projectRef}"
      ],
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "📋 List All Projects",
      "type": "shell",
      "command": "supabase projects list",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "shared"
      }
    },
    {
      "label": "🔄 Sync Database Schema",
      "type": "shell",
      "command": "supabase db push",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "shared"
      }
    },
    {
      "label": "🧪 Start Local Supabase",
      "type": "shell",
      "command": "supabase start",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      },
      "isBackground": true
    },
    {
      "label": "🛑 Stop Local Supabase",
      "type": "shell",
      "command": "supabase stop",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "clientName",
      "type": "promptString",
      "description": "Enter client name (e.g., 'Acme Corp')"
    },
    {
      "id": "region",
      "type": "pickString",
      "description": "Select Supabase region",
      "options": [
        "us-east-1",
        "us-west-1",
        "eu-west-1",
        "eu-west-2",
        "ap-southeast-1",
        "ap-northeast-1"
      ],
      "default": "us-east-1"
    },
    {
      "id": "projectRef",
      "type": "promptString",
      "description": "Enter Supabase project reference ID"
    }
  ]
}
```

---

## 7. Database Schema Templates

### Step 7.1: Initialize Supabase in Project

```powershell
# Initialize Supabase locally
supabase init

# This creates:
# - supabase/config.toml
# - supabase/migrations/
# - supabase/seed.sql
```

### Step 7.2: Create Base Schema Migration

Create `supabase/migrations/20241229000000_initial_schema.sql`:

```sql
-- ===========================================
-- VERONIKA MVP - BASE DATABASE SCHEMA
-- ===========================================
-- This schema is applied to every new client project

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- CLIENTS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'lead')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clients" ON clients
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own clients" ON clients
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clients" ON clients
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own clients" ON clients
    FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- PROJECTS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'review', 'completed', 'on-hold')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    start_date DATE,
    due_date DATE,
    budget DECIMAL(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" ON projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
    FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- EXPENSES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS expenses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    category TEXT NOT NULL CHECK (category IN ('software', 'marketing', 'travel', 'office', 'contractor', 'other')),
    description TEXT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    date DATE NOT NULL,
    receipt_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for expenses
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own expenses" ON expenses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own expenses" ON expenses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses" ON expenses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses" ON expenses
    FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- PAYMENTS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    due_date DATE,
    paid_date DATE,
    invoice_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own payments" ON payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments" ON payments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payments" ON payments
    FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- NOTES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT DEFAULT 'general' CHECK (category IN ('general', 'meeting', 'idea', 'task', 'follow-up')),
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for notes
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes" ON notes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notes" ON notes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON notes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON notes
    FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- BOOKINGS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    meeting_url TEXT,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON bookings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings" ON bookings
    FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- TASKS TABLE (for project tasks)
-- ===========================================
CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'review', 'done')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tasks" ON tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tasks" ON tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
    FOR DELETE USING (auth.uid() = user_id);

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_status ON clients(status);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);

CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_expenses_category ON expenses(category);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_due_date ON payments(due_date);

CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_category ON notes(category);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);

-- ===========================================
-- UPDATED_AT TRIGGER FUNCTION
-- ===========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- GRANT PERMISSIONS
-- ===========================================
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
```

### Step 7.3: Create Seed Data (Optional)

Create `supabase/seed.sql`:

```sql
-- ===========================================
-- SEED DATA (for testing/demo)
-- ===========================================
-- Note: This runs after migrations
-- user_id must be set by the application after user creation

-- This file is intentionally minimal
-- Real data should be created through the application
```

---

## 8. Deployment Pipeline

### Step 8.1: Deploy to Coolify Script

Create `scripts/deploy-to-coolify.ps1`:

```powershell
#!/usr/bin/env pwsh
# ===========================================
# DEPLOY TO COOLIFY
# ===========================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ClientName,
    
    [Parameter(Mandatory=$true)]
    [string]$EnvFile
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Deploying $ClientName to Coolify..." -ForegroundColor Cyan

# Load environment variables
if (-not (Test-Path $EnvFile)) {
    Write-Host "❌ Environment file not found: $EnvFile" -ForegroundColor Red
    exit 1
}

# Read env file
$envVars = Get-Content $EnvFile | Where-Object { $_ -match '=' -and $_ -notmatch '^#' }

Write-Host "`n📋 Environment variables to set:" -ForegroundColor Yellow
$envVars | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }

Write-Host "`n📦 Building Docker image..." -ForegroundColor Yellow

# Build with Docker
$buildArgs = $envVars | ForEach-Object {
    $key, $value = $_ -split '=', 2
    "--build-arg", "$key=$value"
}

docker build $buildArgs -t "veronika-$($ClientName.ToLower())" .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Docker image built successfully!" -ForegroundColor Green

Write-Host "`n📤 Push to registry or deploy via Coolify UI" -ForegroundColor Yellow
Write-Host "   Image: veronika-$($ClientName.ToLower())" -ForegroundColor Gray
```

### Step 8.2: Full Client Setup Script (All-in-One)

Create `scripts/full-client-setup.ps1`:

```powershell
#!/usr/bin/env pwsh
# ===========================================
# FULL CLIENT SETUP - ONE CLICK
# ===========================================
# This script does EVERYTHING:
# 1. Creates Supabase project
# 2. Applies schema
# 3. Generates env files
# 4. Builds Docker image
# 5. Outputs deployment instructions

param(
    [Parameter(Mandatory=$true)]
    [string]$ClientName,
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1",
    
    [Parameter(Mandatory=$false)]
    [string]$Domain = ""
)

$ErrorActionPreference = "Stop"
$StartTime = Get-Date

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        VERONIKA MVP - FULL CLIENT SETUP                    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$ProjectName = "veronika-" + ($ClientName.ToLower() -replace '[^a-z0-9]', '-')

# ============================================
# STEP 1: Create Supabase Project
# ============================================
Write-Host "┌─────────────────────────────────────────────────────────────┐" -ForegroundColor Yellow
Write-Host "│ STEP 1/5: Creating Supabase Project                        │" -ForegroundColor Yellow
Write-Host "└─────────────────────────────────────────────────────────────┘" -ForegroundColor Yellow

Write-Host "  Creating project: $ProjectName in $Region..." -ForegroundColor Gray

try {
    $result = supabase projects create $ProjectName --region $Region 2>&1
    Write-Host "  ✅ Project created" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️ Project may already exist, continuing..." -ForegroundColor Yellow
}

Start-Sleep -Seconds 5

# Get project reference
$projects = supabase projects list --output json | ConvertFrom-Json
$project = $projects | Where-Object { $_.name -eq $ProjectName }

if (-not $project) {
    Write-Host "  ❌ Could not find project. Please check Supabase dashboard." -ForegroundColor Red
    exit 1
}

$ProjectRef = $project.id
Write-Host "  Project ID: $ProjectRef" -ForegroundColor Gray

# ============================================
# STEP 2: Link and Apply Schema
# ============================================
Write-Host ""
Write-Host "┌─────────────────────────────────────────────────────────────┐" -ForegroundColor Yellow
Write-Host "│ STEP 2/5: Applying Database Schema                         │" -ForegroundColor Yellow
Write-Host "└─────────────────────────────────────────────────────────────┘" -ForegroundColor Yellow

supabase link --project-ref $ProjectRef

Write-Host "  Pushing migrations..." -ForegroundColor Gray
supabase db push

Write-Host "  ✅ Schema applied" -ForegroundColor Green

# ============================================
# STEP 3: Get API Keys
# ============================================
Write-Host ""
Write-Host "┌─────────────────────────────────────────────────────────────┐" -ForegroundColor Yellow
Write-Host "│ STEP 3/5: Retrieving API Credentials                       │" -ForegroundColor Yellow
Write-Host "└─────────────────────────────────────────────────────────────┘" -ForegroundColor Yellow

$apiKeys = supabase projects api-keys --project-ref $ProjectRef --output json | ConvertFrom-Json
$anonKey = ($apiKeys | Where-Object { $_.name -eq "anon" }).api_key
$serviceKey = ($apiKeys | Where-Object { $_.name -eq "service_role" }).api_key

Write-Host "  ✅ API keys retrieved" -ForegroundColor Green

# ============================================
# STEP 4: Generate Environment Files
# ============================================
Write-Host ""
Write-Host "┌─────────────────────────────────────────────────────────────┐" -ForegroundColor Yellow
Write-Host "│ STEP 4/5: Generating Configuration Files                   │" -ForegroundColor Yellow
Write-Host "└─────────────────────────────────────────────────────────────┘" -ForegroundColor Yellow

# Create client-specific env file
$envContent = @"
# ═══════════════════════════════════════════════════════════════
# VERONIKA MVP - Client Configuration
# Client: $ClientName
# Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# ═══════════════════════════════════════════════════════════════

# Supabase Configuration (PUBLIC - safe for frontend)
VITE_SUPABASE_URL=https://$ProjectRef.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=$anonKey

# Server-side only (NEVER expose to frontend)
SUPABASE_SERVICE_KEY=$serviceKey

# Application Settings
VITE_APP_NAME=Veronika - $ClientName
VITE_APP_URL=$(if ($Domain) { "https://$Domain" } else { "https://$ProjectName.yourdomain.com" })
"@

$envFileName = ".env.$ProjectName"
$envContent | Out-File -FilePath $envFileName -Encoding UTF8
Write-Host "  ✅ Created: $envFileName" -ForegroundColor Green

# Create .env.local for development
Copy-Item $envFileName ".env.local" -Force
Write-Host "  ✅ Created: .env.local (for development)" -ForegroundColor Green

# ============================================
# STEP 5: Build Docker Image
# ============================================
Write-Host ""
Write-Host "┌─────────────────────────────────────────────────────────────┐" -ForegroundColor Yellow
Write-Host "│ STEP 5/5: Building Docker Image                            │" -ForegroundColor Yellow
Write-Host "└─────────────────────────────────────────────────────────────┘" -ForegroundColor Yellow

$imageName = $ProjectName

docker build `
    --build-arg "VITE_SUPABASE_URL=https://$ProjectRef.supabase.co" `
    --build-arg "VITE_SUPABASE_PUBLISHABLE_KEY=$anonKey" `
    -t $imageName .

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Docker image built: $imageName" -ForegroundColor Green
} else {
    Write-Host "  ⚠️ Docker build had issues, but setup is complete" -ForegroundColor Yellow
}

# ============================================
# SUMMARY
# ============================================
$EndTime = Get-Date
$Duration = $EndTime - $StartTime

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                    SETUP COMPLETE! 🎉                      ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "  Client Name:     $ClientName" -ForegroundColor White
Write-Host "  Project Name:    $ProjectName" -ForegroundColor White
Write-Host "  Project ID:      $ProjectRef" -ForegroundColor White
Write-Host "  Region:          $Region" -ForegroundColor White
Write-Host "  Duration:        $($Duration.TotalSeconds.ToString('0.0')) seconds" -ForegroundColor White
Write-Host ""
Write-Host "  📁 Files Created:" -ForegroundColor Cyan
Write-Host "     • $envFileName" -ForegroundColor Gray
Write-Host "     • .env.local" -ForegroundColor Gray
Write-Host ""
Write-Host "  🔗 Links:" -ForegroundColor Cyan
Write-Host "     • Dashboard:  https://supabase.com/dashboard/project/$ProjectRef" -ForegroundColor Gray
Write-Host "     • API:        https://$ProjectRef.supabase.co" -ForegroundColor Gray
Write-Host "     • Auth:       https://$ProjectRef.supabase.co/auth/v1" -ForegroundColor Gray
Write-Host ""
Write-Host "  🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "     1. Test locally:  npm run dev" -ForegroundColor Gray
Write-Host "     2. Deploy to Coolify with these env vars:" -ForegroundColor Gray
Write-Host "        VITE_SUPABASE_URL=https://$ProjectRef.supabase.co" -ForegroundColor DarkGray
Write-Host "        VITE_SUPABASE_PUBLISHABLE_KEY=$($anonKey.Substring(0,20))..." -ForegroundColor DarkGray
Write-Host ""
```

---

## 9. Handoff Documentation

### For Non-Technical Team Members

Create `DEPLOYMENT_GUIDE_SIMPLE.md`:

```markdown
# 🚀 How to Deploy a New Client Site

## Prerequisites (One-Time Setup)
1. ✅ VS Code installed
2. ✅ Logged into Supabase CLI (ask admin if not)
3. ✅ Docker Desktop running

## Creating a New Client Site (5 Minutes)

### Step 1: Open VS Code
Open the Veronika MVP project folder

### Step 2: Run the Setup Task
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select "🚀 Create New Client"
4. Enter the client name when prompted (e.g., "Acme Corp")
5. Select the region (usually "us-east-1")

### Step 3: Wait for Completion
The script will:
- Create the database ✅
- Set up all tables ✅
- Generate configuration files ✅
- Build the application ✅

### Step 4: Deploy to Coolify
1. Go to Coolify dashboard
2. Create new application
3. Use the Docker image name shown in the output
4. Copy the environment variables from the `.env.{client-name}` file

### That's it! 🎉
```

---

## Quick Reference Commands

```powershell
# List all projects
supabase projects list

# Create new project
supabase projects create project-name --region us-east-1

# Link to existing project
supabase link --project-ref your-project-ref

# Push database changes
supabase db push

# Pull remote schema
supabase db pull

# Start local development
supabase start

# Stop local development
supabase stop

# View local dashboard
supabase status
# Then open: http://localhost:54323

# Generate TypeScript types from database
supabase gen types typescript --project-id your-project-ref > src/integrations/supabase/types.ts
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Not logged in" | Run `supabase login` |
| "Project not found" | Check project name/ID with `supabase projects list` |
| "Migration failed" | Check SQL syntax in migration files |
| "Docker build failed" | Ensure Docker Desktop is running |
| "API key invalid" | Re-run `supabase projects api-keys --project-ref xxx` |

---

## Support

For issues with this automation:
1. Check Supabase status: https://status.supabase.com
2. Check Supabase docs: https://supabase.com/docs
3. Check CLI docs: https://supabase.com/docs/guides/cli
