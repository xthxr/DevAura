# Installation Script for DevAura
# Run this in PowerShell

Write-Host "🚀 Setting up DevAura..." -ForegroundColor Cyan

# Check Node.js version
Write-Host "`n📦 Checking Node.js version..." -ForegroundColor Yellow
node --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies." -ForegroundColor Red
    exit 1
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "`n⚙️  Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please edit it with your credentials." -ForegroundColor Green
    
    Write-Host "`n⚠️  IMPORTANT: You need to configure the following:" -ForegroundColor Red
    Write-Host "   1. DATABASE_URL - Get from PlanetScale or Neon" -ForegroundColor White
    Write-Host "   2. GITHUB_ID and GITHUB_SECRET - Create OAuth App on GitHub" -ForegroundColor White
    Write-Host "   3. GITHUB_TOKEN - Create Personal Access Token on GitHub" -ForegroundColor White
    Write-Host "   4. KV_* variables - Get from Vercel KV dashboard" -ForegroundColor White
    Write-Host "   5. NEXTAUTH_SECRET - Generate random string" -ForegroundColor White
    
    Write-Host "`nGenerate NEXTAUTH_SECRET with:" -ForegroundColor Cyan
    Write-Host 'node -e "console.log(require(' + "'" + 'crypto' + "'" + ').randomBytes(32).toString(' + "'" + 'base64' + "'" + '))"' -ForegroundColor Gray
    
    Write-Host "`n📝 After editing .env, run: npm run setup:db" -ForegroundColor Yellow
} else {
    Write-Host "`n✅ .env file already exists" -ForegroundColor Green
}

Write-Host "`n✨ Installation complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  1. Edit .env file with your credentials" -ForegroundColor White
Write-Host "  2. Run: npm run setup:db" -ForegroundColor White
Write-Host "  3. Run: npm run dev" -ForegroundColor White
Write-Host "`nSee SETUP.md for detailed instructions." -ForegroundColor Gray
