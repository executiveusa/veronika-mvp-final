# COOLIFY & HOSTINGER CLI QUICK START
## Deploy Veronika MVP with Coolify + Custom Domain

**Setup Time:** 30 minutes  
**Difficulty:** Intermediate  
**Prerequisites:** GitHub account, Hostinger domain access, VPS with Coolify

---

## 📦 QUICK INSTALL GUIDE

### Step 1: Install Coolify CLI

```bash
# Option A: npm (Recommended)
npm install -g @coolify/cli

# Option B: npx (No installation needed)
npx @coolify/cli

# Verify installation
coolify --version
```

### Step 2: Install Hostinger CLI

```bash
# Via npm
npm install -g hostinger-cli

# Or visit: https://www.hostinger.com/dns-management
# For direct CLI tool access

# Verify installation
hostinger --version
```

### Step 3: Authenticate with Coolify

```bash
# Login to Coolify
coolify login

# This will:
# 1. Open browser
# 2. Prompt you to login with your Coolify account
# 3. Generate API token
# 4. Display: "Successfully authenticated"

# Get API Token (save this!)
coolify config show
```

### Step 4: Authenticate with Hostinger

```bash
# Login to Hostinger
hostinger login

# Or use API token:
hostinger auth --token YOUR_HOSTINGER_API_TOKEN

# Verify your domain
hostinger domains list
```

---

## 🚀 DEPLOY VERONIKA MVP WITH COOLIFY

### Command-by-Command Deployment

```bash
# Step 1: Create new application in Coolify
coolify apps create \
  --name veronika-mvp \
  --git-url https://github.com/executiveusa/veronika-mvp-final.git \
  --git-branch main \
  --build-command "npm install && npm run build" \
  --start-command "npm run preview" \
  --port 3000 \
  --environment production

# Output: Application created: veronika-mvp
# AppID: <app-id>
```

```bash
# Step 2: Set environment variables
coolify apps env set \
  --app veronika-mvp \
  --key VITE_APP_NAME \
  --value "Veronika MVP"

coolify apps env set \
  --app veronika-mvp \
  --key VITE_SUPABASE_URL \
  --value "https://veronikadmitova.com/api"

coolify apps env set \
  --app veronika-mvp \
  --key NODE_ENV \
  --value production
```

```bash
# Step 3: Enable auto-deployment from GitHub
coolify apps github-sync enable \
  --app veronika-mvp \
  --github-token YOUR_GITHUB_TOKEN

# Or use SSH key:
coolify apps github-sync enable \
  --app veronika-mvp \
  --git-url git@github.com:executiveusa/veronika-mvp-final.git
```

```bash
# Step 4: Create PostgreSQL database
coolify databases create \
  --name veronika-db \
  --type postgres \
  --version 15 \
  --username veronika \
  --password YOUR_SECURE_PASSWORD

# Output: Database created
# Connection string: postgresql://...
```

```bash
# Step 5: Connect app to database
coolify apps env set \
  --app veronika-mvp \
  --key DATABASE_URL \
  --value "postgresql://veronika:PASSWORD@veronika-db:5432/veronika_db"
```

```bash
# Step 6: Add domain
coolify domains add \
  --app veronika-mvp \
  --domain veronikadmitova.com \
  --ssl-provider letsencrypt \
  --ssl-auto-renew true

# Output: Domain added
# SSL Certificate: Pending (auto-renewing)
```

```bash
# Step 7: Deploy to production
coolify apps deploy \
  --app veronika-mvp \
  --branch main

# Watch deployment progress:
coolify apps logs veronika-mvp --follow
```

```bash
# Step 8: Verify deployment
coolify apps status veronika-mvp

# Output:
# Status: Running ✅
# URL: https://veronikadmitova.com
# Health: OK
# CPU: 12%
# Memory: 245MB
```

---

## 🔗 CONFIGURE DOMAIN IN HOSTINGER

### Step 1: Update DNS Records

```bash
# Point main domain to Coolify VPS
hostinger dns add veronikadmitova.com \
  --type A \
  --value <COOLIFY_VPS_IP> \
  --ttl 3600

# Point www subdomain
hostinger dns add www.veronikadmitova.com \
  --type CNAME \
  --value veronikadmitova.com \
  --ttl 3600

# Verify records
hostinger dns list veronikadmitova.com
```

### Step 2: Verify DNS Propagation

```bash
# Check if DNS is propagated (can take 24-48 hours)
hostinger dns check veronikadmitova.com

# Expected output:
# ✅ A record: veronikadmitova.com → <IP>
# ✅ CNAME record: www → veronikadmitova.com
# ✅ Propagation: 100%
```

### Step 3: Configure SSL in Coolify

```bash
# Coolify automatically handles SSL via Let's Encrypt
# Just add domain and it will:
# 1. Create certificate request
# 2. Validate domain
# 3. Issue certificate
# 4. Auto-renew 30 days before expiry

# Verify SSL
coolify domains check veronikadmitova.com
# Output: SSL Valid ✅ | Expires: 2026-01-27
```

---

## 📊 COMMON COOLIFY COMMANDS

### Application Management
```bash
# List all apps
coolify apps list

# Get app details
coolify apps show veronika-mvp

# View logs (live)
coolify apps logs veronika-mvp --follow

# View logs (last 100 lines)
coolify apps logs veronika-mvp --tail 100

# Restart app
coolify apps restart veronika-mvp

# Stop app
coolify apps stop veronika-mvp

# Start app
coolify apps start veronika-mvp

# Delete app
coolify apps delete veronika-mvp --force
```

### Environment Variables
```bash
# List all env vars
coolify apps env list veronika-mvp

# Set single env var
coolify apps env set --app veronika-mvp --key KEY --value VALUE

# Set from file
coolify apps env load --app veronika-mvp --file .env.production

# Delete env var
coolify apps env delete --app veronika-mvp --key KEY

# Update var
coolify apps env update --app veronika-mvp --key KEY --value NEW_VALUE
```

### Database Management
```bash
# List databases
coolify databases list

# Get database details
coolify databases show veronika-db

# View database logs
coolify databases logs veronika-db

# Create backup
coolify databases backup veronika-db

# Restore from backup
coolify databases restore veronika-db --backup-id <id>

# Run SQL query
coolify databases query veronika-db --sql "SELECT * FROM clients;"
```

### Deployments
```bash
# Manual deployment
coolify apps deploy veronika-mvp --branch main

# Deploy with specific tag
coolify apps deploy veronika-mvp --tag v1.0.0

# View deployment history
coolify apps deployments veronika-mvp

# Rollback to previous version
coolify apps rollback veronika-mvp

# View deployment status
coolify apps deployment-status veronika-mvp --id <deployment-id>
```

### Monitoring
```bash
# System status
coolify system status

# Check system logs
coolify system logs --follow

# Resource usage
coolify system resources

# Database usage
coolify databases usage veronika-db

# Network stats
coolify network stats
```

---

## 📊 COMMON HOSTINGER COMMANDS

### Domain Management
```bash
# List all domains
hostinger domains list

# Get domain details
hostinger domains show veronikadmitova.com

# Add domain
hostinger domains add veronikadmitova.com

# Renew domain
hostinger domains renew veronikadmitova.com

# Transfer domain (if needed)
hostinger domains transfer veronikadmitova.com --auth-code ABC123
```

### DNS Management
```bash
# List DNS records
hostinger dns list veronikadmitova.com

# Add A record
hostinger dns add veronikadmitova.com --type A --value 192.168.1.1

# Add CNAME record
hostinger dns add www.veronikadmitova.com --type CNAME --value veronikadmitova.com

# Update DNS record
hostinger dns update veronikadmitova.com --type A --value 192.168.1.2

# Delete DNS record
hostinger dns delete veronikadmitova.com --type A --value 192.168.1.1

# Check DNS propagation
hostinger dns check veronikadmitova.com
```

### SSL Management
```bash
# List SSL certificates
hostinger ssl list veronikadmitova.com

# Add SSL certificate
hostinger ssl add veronikadmitova.com --provider letsencrypt

# Check certificate status
hostinger ssl status veronikadmitova.com

# Renew certificate
hostinger ssl renew veronikadmitova.com
```

---

## 🔧 TROUBLESHOOTING

### "DNS not propagating"
```bash
# Wait 24-48 hours
# Check progress:
hostinger dns check veronikadmitova.com --verbose

# Manual check with nslookup:
nslookup veronikadmitova.com
# Should show Coolify VPS IP
```

### "SSL certificate not issued"
```bash
# Check certificate logs:
coolify domains show veronikadmitova.com --verbose

# Check DNS is correctly pointing:
coolify domains check veronikadmitova.com

# Manually trigger renewal:
coolify domains ssl-renew veronikadmitova.com
```

### "App not deploying"
```bash
# Check logs:
coolify apps logs veronika-mvp --follow

# Common issues:
# - npm install failing: Check package.json
# - Build failing: Check build command
# - Port in use: Change port in config
# - GitHub token expired: Re-authenticate

# Re-authenticate GitHub:
coolify apps github-sync auth --app veronika-mvp
```

### "Database connection failing"
```bash
# Check database logs:
coolify databases logs veronika-db

# Test connection:
coolify databases query veronika-db --sql "SELECT 1;"

# Check connection string:
coolify apps env show --app veronika-mvp --key DATABASE_URL

# Restart database:
coolify databases restart veronika-db
```

### "Application slow or timing out"
```bash
# Check resource usage:
coolify apps stats veronika-mvp

# View slow queries (if database):
coolify databases logs veronika-db --level SLOW

# Increase resources:
coolify apps scale --app veronika-mvp --cpu 2 --memory 2gb

# Restart app:
coolify apps restart veronika-mvp
```

---

## ✅ POST-DEPLOYMENT CHECKLIST

After deploying, verify everything works:

```bash
# 1. Check app is running
curl https://veronikadmitova.com
# Should return HTML (not error)

# 2. Check SSL certificate
coolify domains check veronikadmitova.com
# Output: SSL Valid ✅

# 3. Check database connection
coolify databases query veronika-db --sql "SELECT 1;"
# Output: 1

# 4. Check logs for errors
coolify apps logs veronika-mvp --tail 50
# Should not show [ERROR]

# 5. Test homepage
# Open browser: https://veronikadmitova.com
# Should load without errors

# 6. Test booking page
# Visit: https://veronikadmitova.com/book
# Form should load

# 7. Monitor resource usage
coolify apps stats veronika-mvp
# CPU < 50%, Memory < 80%
```

---

## 🔄 CONTINUOUS DEPLOYMENT SETUP

Once deployed, every push to GitHub main branch will:

1. ✅ Trigger Coolify webhook
2. ✅ Pull latest code
3. ✅ Run `npm install && npm run build`
4. ✅ Create new Docker container
5. ✅ Run health checks
6. ✅ Swap old ↔ new containers (zero downtime)
7. ✅ Deploy complete!

Monitor deployment:
```bash
# View deployment history
coolify apps deployments veronika-mvp

# View current deployment logs
coolify apps logs veronika-mvp --follow
```

---

## 📱 TESTING AFTER DEPLOYMENT

```bash
# Test homepage loads
curl -I https://veronikadmitova.com
# Should return 200 OK

# Test API endpoints
curl https://veronikadmitova.com/api/health
# Should return { status: "ok" }

# Test with Chrome DevTools
# Open: https://veronikadmitova.com
# F12 → Console → Check for errors
# F12 → Network → Check response times

# Test mobile responsiveness
# Open on mobile: https://veronikadmitova.com
# Check all pages load

# Test booking form
# Go to: https://veronikadmitova.com/book
# Fill form and submit
# Should show success message
```

---

## 📚 ADDITIONAL RESOURCES

### Coolify
- **Docs:** https://coolify.io/docs
- **GitHub:** https://github.com/coollabsio/coolify
- **Community:** https://coolify.io/community
- **API Reference:** https://coolify.io/api

### Hostinger
- **DNS Help:** https://www.hostinger.com/help/article/dns-management
- **SSL Setup:** https://www.hostinger.com/help/article/ssl-certificate
- **Domain Management:** https://www.hostinger.com/help/article/how-to-manage-domains

### General
- **Docker Basics:** https://docs.docker.com/get-started
- **Let's Encrypt:** https://letsencrypt.org
- **Nginx:** https://nginx.org/en/docs/

---

## 🆘 SUPPORT CONTACTS

| Service | Support | Response Time |
|---------|---------|----------------|
| **Coolify** | support@coolify.io | 24 hours |
| **Hostinger** | support@hostinger.com | 24 hours |
| **Let's Encrypt** | https://community.letsencrypt.org | 48 hours |
| **GitHub** | help@github.com | 48 hours |

---

## 💡 TIPS & BEST PRACTICES

✅ **DO:**
- Check logs regularly
- Monitor resource usage
- Set up automated backups
- Keep environment variables secret
- Use meaningful app/database names
- Document your setup
- Test changes before production
- Keep systems updated

❌ **DON'T:**
- Run sensitive commands without review
- Share API tokens publicly
- Delete databases without backup
- Deploy without testing
- Use weak passwords
- Ignore error logs
- Skip SSL setup
- Forget to renew certificates

---

**Document Status:** ✅ READY  
**Last Updated:** December 27, 2025  
**Next Step:** Run the Coolify deployment commands
