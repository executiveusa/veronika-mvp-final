#!/usr/bin/env pwsh
# ===========================================
# FULL CLIENT SETUP - ONE CLICK
# ===========================================
# Usage: ./scripts/setup-new-client.ps1 -ClientName "Client Name"
#
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

Write-Host "  Waiting for project to be ready..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# Get project reference
$projectsJson = supabase projects list --output json
$projects = $projectsJson | ConvertFrom-Json
$project = $projects | Where-Object { $_.name -eq $ProjectName }

if (-not $project) {
    Write-Host "  ❌ Could not find project. Please check Supabase dashboard." -ForegroundColor Red
    Write-Host "  Available projects:" -ForegroundColor Gray
    $projects | ForEach-Object { Write-Host "    - $($_.name)" -ForegroundColor Gray }
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

Write-Host "  Linking to project..." -ForegroundColor Gray
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

$apiKeysJson = supabase projects api-keys --project-ref $ProjectRef --output json
$apiKeys = $apiKeysJson | ConvertFrom-Json
$anonKey = ($apiKeys | Where-Object { $_.name -eq "anon" }).api_key
$serviceKey = ($apiKeys | Where-Object { $_.name -eq "service_role" }).api_key

if (-not $anonKey) {
    Write-Host "  ❌ Could not retrieve API keys" -ForegroundColor Red
    exit 1
}

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
$envContent | Out-File -FilePath $envFileName -Encoding UTF8 -NoNewline
Write-Host "  ✅ Created: $envFileName" -ForegroundColor Green

# Create .env.local for development
Copy-Item $envFileName ".env.local" -Force
Write-Host "  ✅ Created: .env.local (for development)" -ForegroundColor Green

# ============================================
# STEP 5: Build Docker Image (Optional)
# ============================================
Write-Host ""
Write-Host "┌─────────────────────────────────────────────────────────────┐" -ForegroundColor Yellow
Write-Host "│ STEP 5/5: Building Docker Image                            │" -ForegroundColor Yellow
Write-Host "└─────────────────────────────────────────────────────────────┘" -ForegroundColor Yellow

$imageName = $ProjectName

# Check if Docker is available
$dockerAvailable = $null -ne (Get-Command docker -ErrorAction SilentlyContinue)

if ($dockerAvailable) {
    Write-Host "  Building Docker image..." -ForegroundColor Gray
    
    docker build `
        --build-arg "VITE_SUPABASE_URL=https://$ProjectRef.supabase.co" `
        --build-arg "VITE_SUPABASE_PUBLISHABLE_KEY=$anonKey" `
        -t $imageName .

    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Docker image built: $imageName" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Docker build had issues" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠️ Docker not available, skipping image build" -ForegroundColor Yellow
    Write-Host "  Run manually: docker build -t $imageName ." -ForegroundColor Gray
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
Write-Host "        VITE_SUPABASE_PUBLISHABLE_KEY=$($anonKey.Substring(0, [Math]::Min(20, $anonKey.Length)))..." -ForegroundColor DarkGray
Write-Host ""

# Save summary to file
$summaryContent = @"
# Client Deployment Summary
# Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Client Name: $ClientName
Project Name: $ProjectName
Project ID: $ProjectRef
Region: $Region

## Environment Variables for Coolify

VITE_SUPABASE_URL=https://$ProjectRef.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=$anonKey

## Links

- Dashboard: https://supabase.com/dashboard/project/$ProjectRef
- API URL: https://$ProjectRef.supabase.co
- Auth URL: https://$ProjectRef.supabase.co/auth/v1
"@

$summaryContent | Out-File -FilePath "DEPLOYMENT_$ProjectName.md" -Encoding UTF8
Write-Host "  📝 Deployment summary saved to: DEPLOYMENT_$ProjectName.md" -ForegroundColor Cyan
Write-Host ""
