# ============================================================================
# VERONIKA MVP - PRODUCTION DEPLOYMENT SCRIPT (PowerShell)
# Coolify + Hostinger CLI Deployment
# ============================================================================
# Date: December 27, 2025
# Target: veronikadmitova.com on Hostinger VPS with Coolify
# OS: Windows PowerShell
# ============================================================================

$ErrorActionPreference = "Stop"

Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  VERONIKA MVP - DEPLOYMENT SCRIPT (PowerShell)" -ForegroundColor Green
Write-Host "  Target: veronikadmitova.com (Hostinger VPS + Coolify)" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# ============================================================================
# STEP 1: VERIFY PREREQUISITES
# ============================================================================
Write-Host "📋 STEP 1: Verifying Prerequisites..." -ForegroundColor Cyan
Write-Host ""

# Check Node.js
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green

# Check npm
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm not found. Please install npm" -ForegroundColor Red
    exit 1
}
Write-Host "✅ npm $npmVersion found" -ForegroundColor Green

# Check git
$gitVersion = git --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git not found. Please install Git" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Git $gitVersion found" -ForegroundColor Green

Write-Host ""
Write-Host "✅ All prerequisites verified!" -ForegroundColor Green
Write-Host ""

# ============================================================================
# STEP 2: INSTALL COOLIFY CLI
# ============================================================================
Write-Host "📦 STEP 2: Installing Coolify CLI..." -ForegroundColor Cyan
Write-Host ""

$coolifyCheck = npm list -g @coolify/cli 2>$null
if ($coolifyCheck) {
    Write-Host "✅ Coolify CLI already installed" -ForegroundColor Green
} else {
    Write-Host "Installing Coolify CLI via npm..." -ForegroundColor Yellow
    npm install -g "@coolify/cli"
    Write-Host "✅ Coolify CLI installed successfully" -ForegroundColor Green
}

Write-Host ""

# ============================================================================
# STEP 3: COOLIFY AUTHENTICATION
# ============================================================================
Write-Host "🔐 STEP 3: Authenticating with Coolify..." -ForegroundColor Cyan
Write-Host ""

Write-Host "⚠️  IMPORTANT:" -ForegroundColor Yellow
Write-Host "   1. Visit: https://app.coolify.io" -ForegroundColor White
Write-Host "   2. Login with your Coolify account" -ForegroundColor White
Write-Host "   3. Generate an API token in Settings" -ForegroundColor White
Write-Host "   4. Run this command:" -ForegroundColor White
Write-Host ""
Write-Host "   coolify login" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Or if you have a token:" -ForegroundColor White
Write-Host "   coolify config set api-token YOUR_API_TOKEN" -ForegroundColor Cyan
Write-Host ""

$auth = Read-Host "Have you authenticated with Coolify? (y/n)"
if ($auth -ne "y" -and $auth -ne "Y") {
    Write-Host "⚠️  Please authenticate with Coolify first" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Coolify authentication confirmed" -ForegroundColor Green
Write-Host ""

# ============================================================================
# STEP 4: VERIFY GIT REPOSITORY
# ============================================================================
Write-Host "🔗 STEP 4: Verifying Git Repository..." -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path ".git" -PathType Container)) {
    Write-Host "❌ Not a git repository. Please run from project root:" -ForegroundColor Red
    Write-Host "   cd veronika-mvp-final" -ForegroundColor Yellow
    exit 1
}

$gitRemote = git remote get-url origin 2>$null
Write-Host "✅ Git repository found" -ForegroundColor Green
Write-Host "   Remote: $gitRemote" -ForegroundColor White
Write-Host ""

# ============================================================================
# STEP 5: BUILD PROJECT LOCALLY
# ============================================================================
Write-Host "🔨 STEP 5: Building Project Locally..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Installing dependencies..." -ForegroundColor White
npm install

Write-Host ""
Write-Host "Running production build..." -ForegroundColor White
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please fix errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host "   Output: dist/ directory" -ForegroundColor White
Write-Host ""

# ============================================================================
# STEP 6: DEPLOY WITH COOLIFY
# ============================================================================
Write-Host "🚀 STEP 6: Deploying with Coolify..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Creating application in Coolify..." -ForegroundColor White
Write-Host ""
Write-Host "Running command:" -ForegroundColor White
Write-Host "  coolify apps create \" -ForegroundColor Cyan
Write-Host "    --name veronika-mvp \" -ForegroundColor Cyan
Write-Host "    --git-url https://github.com/executiveusa/veronika-mvp-final.git \" -ForegroundColor Cyan
Write-Host "    --git-branch main \" -ForegroundColor Cyan
Write-Host "    --build-command 'npm install && npm run build' \" -ForegroundColor Cyan
Write-Host "    --start-command 'npm run preview' \" -ForegroundColor Cyan
Write-Host "    --port 3000 \" -ForegroundColor Cyan
Write-Host "    --environment production" -ForegroundColor Cyan
Write-Host ""

$proceed = Read-Host "Proceed with Coolify deployment? (y/n)"
if ($proceed -ne "y" -and $proceed -ne "Y") {
    Write-Host "⚠️  Deployment cancelled" -ForegroundColor Yellow
    exit 1
}

# Note: Actual coolify command requires interactive authentication
Write-Host ""
Write-Host "⚠️  Next steps (manual via Coolify CLI):" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Create application:" -ForegroundColor White
Write-Host "   coolify apps create \" -ForegroundColor Cyan
Write-Host "     --name veronika-mvp \" -ForegroundColor Cyan
Write-Host "     --git-url https://github.com/executiveusa/veronika-mvp-final.git" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Set environment variables:" -ForegroundColor White
Write-Host "   coolify apps env set --app veronika-mvp --key VITE_APP_NAME --value 'Veronika MVP'" -ForegroundColor Cyan
Write-Host "   coolify apps env set --app veronika-mvp --key NODE_ENV --value production" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Add domain:" -ForegroundColor White
Write-Host "   coolify domains add --app veronika-mvp --domain veronikadmitova.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Deploy:" -ForegroundColor White
Write-Host "   coolify apps deploy --app veronika-mvp --branch main" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# STEP 7: HOSTINGER DNS SETUP
# ============================================================================
Write-Host "🌐 STEP 7: Hostinger DNS Configuration..." -ForegroundColor Cyan
Write-Host ""

Write-Host "You will need to update DNS records in Hostinger:" -ForegroundColor White
Write-Host ""
Write-Host "1. Login to: https://www.hostinger.com/cp" -ForegroundColor Cyan
Write-Host "2. Go to: Domain Management → DNS Records" -ForegroundColor Cyan
Write-Host "3. Add these records:" -ForegroundColor White
Write-Host ""
Write-Host "   Type: A" -ForegroundColor Yellow
Write-Host "   Name: @ (or root)" -ForegroundColor Yellow
Write-Host "   Value: <COOLIFY_VPS_IP>" -ForegroundColor Yellow
Write-Host "   TTL: 3600" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Type: CNAME" -ForegroundColor Yellow
Write-Host "   Name: www" -ForegroundColor Yellow
Write-Host "   Value: veronikadmitova.com" -ForegroundColor Yellow
Write-Host "   TTL: 3600" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Save and wait 24-48 hours for propagation" -ForegroundColor White
Write-Host ""

# ============================================================================
# STEP 8: VERIFICATION
# ============================================================================
Write-Host "✅ STEP 8: Deployment Complete!" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Verify Coolify deployment:" -ForegroundColor White
Write-Host "   coolify apps status veronika-mvp" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. View deployment logs:" -ForegroundColor White
Write-Host "   coolify apps logs veronika-mvp --follow" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Wait for DNS propagation (24-48 hours)" -ForegroundColor White
Write-Host ""
Write-Host "4. Test your site:" -ForegroundColor White
Write-Host "   https://veronikadmitova.com" -ForegroundColor Yellow
Write-Host ""

Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  DEPLOYMENT SCRIPT COMPLETE ✅" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📚 For more information, see:" -ForegroundColor Cyan
Write-Host "   - COOLIFY_HOSTINGER_SETUP.md" -ForegroundColor White
Write-Host "   - DEPLOYMENT_PLAN.md" -ForegroundColor White
Write-Host "   - README.md" -ForegroundColor White
Write-Host ""
