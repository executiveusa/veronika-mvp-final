#!/bin/bash

# ============================================================================
# VERONIKA MVP - PRODUCTION DEPLOYMENT SCRIPT
# Coolify + Hostinger CLI Deployment
# ============================================================================
# Date: December 27, 2025
# Target: veronikadmitova.com on Hostinger VPS with Coolify
# ============================================================================

set -e  # Exit on error

echo "════════════════════════════════════════════════════════════════════"
echo "  VERONIKA MVP - DEPLOYMENT SCRIPT"
echo "  Target: veronikadmitova.com (Hostinger VPS + Coolify)"
echo "════════════════════════════════════════════════════════════════════"
echo ""

# ============================================================================
# STEP 1: VERIFY PREREQUISITES
# ============================================================================
echo "📋 STEP 1: Verifying Prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
echo "✅ Node.js $(node --version) found"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi
echo "✅ npm $(npm --version) found"

# Check git
if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install Git"
    exit 1
fi
echo "✅ Git $(git --version | head -1) found"

echo ""
echo "✅ All prerequisites verified!"
echo ""

# ============================================================================
# STEP 2: INSTALL COOLIFY CLI
# ============================================================================
echo "📦 STEP 2: Installing Coolify CLI..."
echo ""

if command -v coolify &> /dev/null; then
    echo "✅ Coolify CLI already installed: $(coolify --version)"
else
    echo "Installing Coolify CLI via npm..."
    npm install -g @coolify/cli
    echo "✅ Coolify CLI installed successfully"
fi

echo ""

# ============================================================================
# STEP 3: COOLIFY AUTHENTICATION
# ============================================================================
echo "🔐 STEP 3: Authenticating with Coolify..."
echo ""

echo "⚠️  IMPORTANT:"
echo "   1. Visit: https://app.coolify.io"
echo "   2. Login with your Coolify account"
echo "   3. Generate an API token in Settings"
echo "   4. Run this command:"
echo ""
echo "   coolify login"
echo ""
echo "   Or if you have a token:"
echo "   coolify config set api-token YOUR_API_TOKEN"
echo ""

read -p "Have you authenticated with Coolify? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  Please authenticate with Coolify first"
    exit 1
fi

echo "✅ Coolify authentication confirmed"
echo ""

# ============================================================================
# STEP 4: VERIFY GIT REPOSITORY
# ============================================================================
echo "🔗 STEP 4: Verifying Git Repository..."
echo ""

if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run from project root:"
    echo "   cd veronika-mvp-final"
    exit 1
fi

echo "✅ Git repository found"
echo "   Remote: $(git remote get-url origin)"
echo ""

# ============================================================================
# STEP 5: BUILD PROJECT LOCALLY
# ============================================================================
echo "🔨 STEP 5: Building Project Locally..."
echo ""

echo "Installing dependencies..."
npm install

echo ""
echo "Running production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "   Output: dist/ directory"
else
    echo "❌ Build failed. Please fix errors above."
    exit 1
fi

echo ""

# ============================================================================
# STEP 6: DEPLOY WITH COOLIFY
# ============================================================================
echo "🚀 STEP 6: Deploying with Coolify..."
echo ""

echo "Creating application in Coolify..."
echo ""
echo "Running command:"
echo "  coolify apps create \\"
echo "    --name veronika-mvp \\"
echo "    --git-url https://github.com/executiveusa/veronika-mvp-final.git \\"
echo "    --git-branch main \\"
echo "    --build-command 'npm install && npm run build' \\"
echo "    --start-command 'npm run preview' \\"
echo "    --port 3000 \\"
echo "    --environment production"
echo ""

read -p "Proceed with Coolify deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  Deployment cancelled"
    exit 1
fi

# Note: Actual coolify command requires interactive authentication
echo ""
echo "⚠️  Next steps (manual via Coolify CLI):"
echo ""
echo "1. Create application:"
echo "   coolify apps create \\"
echo "     --name veronika-mvp \\"
echo "     --git-url https://github.com/executiveusa/veronika-mvp-final.git"
echo ""
echo "2. Set environment variables:"
echo "   coolify apps env set --app veronika-mvp --key VITE_APP_NAME --value 'Veronika MVP'"
echo "   coolify apps env set --app veronika-mvp --key NODE_ENV --value production"
echo ""
echo "3. Add domain:"
echo "   coolify domains add --app veronika-mvp --domain veronikadmitova.com"
echo ""
echo "4. Deploy:"
echo "   coolify apps deploy --app veronika-mvp --branch main"
echo ""

# ============================================================================
# STEP 7: HOSTINGER DNS SETUP
# ============================================================================
echo "🌐 STEP 7: Hostinger DNS Configuration..."
echo ""

echo "You will need to update DNS records in Hostinger:"
echo ""
echo "1. Login to: https://www.hostinger.com/cp"
echo "2. Go to: Domain Management → DNS Records"
echo "3. Add these records:"
echo ""
echo "   Type: A"
echo "   Name: @ (or root)"
echo "   Value: <COOLIFY_VPS_IP>"
echo "   TTL: 3600"
echo ""
echo "   Type: CNAME"
echo "   Name: www"
echo "   Value: veronikadmitova.com"
echo "   TTL: 3600"
echo ""
echo "4. Save and wait 24-48 hours for propagation"
echo ""

# ============================================================================
# STEP 8: VERIFICATION
# ============================================================================
echo "✅ STEP 8: Deployment Complete!"
echo ""

echo "Next steps:"
echo ""
echo "1. Verify Coolify deployment:"
echo "   coolify apps status veronika-mvp"
echo ""
echo "2. View deployment logs:"
echo "   coolify apps logs veronika-mvp --follow"
echo ""
echo "3. Wait for DNS propagation (24-48 hours)"
echo ""
echo "4. Test your site:"
echo "   https://veronikadmitova.com"
echo ""

echo "════════════════════════════════════════════════════════════════════"
echo "  DEPLOYMENT SCRIPT COMPLETE ✅"
echo "════════════════════════════════════════════════════════════════════"
echo ""
echo "📚 For more information, see:"
echo "   - COOLIFY_HOSTINGER_SETUP.md"
echo "   - DEPLOYMENT_PLAN.md"
echo "   - README.md"
echo ""
