# DevAura - Command Reference

## 📦 Installation & Setup

### Initial Setup
```powershell
# Clone repository
git clone https://github.com/yourusername/devaura.git
cd devaura

# Install dependencies
npm install

# Automated setup (Windows)
npm run setup

# Manual environment setup
cp .env.example .env
# Then edit .env with your credentials
```

### Database Setup
```powershell
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (CAUTION: Deletes all data)
npx prisma db push --force-reset

# Combined setup command
npm run setup:db
```

## 🏃 Development

### Start Development Server
```powershell
# Start Next.js dev server (http://localhost:3000)
npm run dev

# Start with specific port
npm run dev -- -p 3001

# Start with turbopack (experimental, faster)
npm run dev -- --turbo
```

### Build Commands
```powershell
# Create production build
npm run build

# Start production server
npm run start

# Build and start
npm run build && npm run start
```

### Code Quality
```powershell
# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint -- --fix

# Type check (without building)
npx tsc --noEmit
```

## 🗄️ Database Commands

### Prisma Commands
```powershell
# Open Prisma Studio
npx prisma studio

# Generate Prisma client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push

# Create a migration
npx prisma migrate dev --name your_migration_name

# Reset database (DANGER!)
npx prisma db push --force-reset

# Seed database (if seed file exists)
npx prisma db seed
```

### Database Inspection
```powershell
# View database connection status
npx prisma db pull

# Introspect database and update schema
npx prisma db pull --force
```

## 🚀 Deployment

### Vercel Deployment
```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview (development)
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs [deployment-url]

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]
```

### Environment Variables (Vercel)
```powershell
# Add environment variable
vercel env add [name]

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm [name]

# Pull environment variables to local
vercel env pull
```

## 🧹 Maintenance

### Clean Cache & Dependencies
```powershell
# Remove node_modules
Remove-Item -Recurse -Force node_modules

# Remove .next build cache
Remove-Item -Recurse -Force .next

# Clean install
Remove-Item -Recurse -Force node_modules
npm install

# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run dev
```

### Update Dependencies
```powershell
# Check for outdated packages
npm outdated

# Update all dependencies to latest
npm update

# Update specific package
npm update package-name

# Interactive update (requires npm-check-updates)
npx npm-check-updates -i
```

## 🔍 Debugging

### Development Debugging
```powershell
# Start with debug mode
$env:NODE_OPTIONS='--inspect'; npm run dev

# View detailed build output
npm run build -- --debug

# Check Next.js configuration
npx next info
```

### Database Debugging
```powershell
# Enable Prisma query logging
# Add to schema.prisma:
# generator client {
#   log = ["query", "info", "warn", "error"]
# }

# View database connection
npx prisma db pull --print
```

## 📊 Analytics & Monitoring

### Vercel Commands
```powershell
# View analytics
vercel analytics

# View deployment logs
vercel logs [deployment-url]

# Monitor deployment
vercel inspect [deployment-url]
```

## 🧪 Testing (When Implemented)

### Run Tests
```powershell
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test.ts
```

## 🔐 Security

### Generate Secrets
```powershell
# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate random string
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# Generate UUID
node -e "console.log(require('crypto').randomUUID())"
```

### Check Security
```powershell
# Audit dependencies for vulnerabilities
npm audit

# Fix security issues automatically
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

## 📝 Git Commands

### Common Git Workflows
```powershell
# Create feature branch
git checkout -b feature/my-feature

# Stage all changes
git add .

# Commit with message
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature

# Pull latest changes
git pull origin main

# Create and switch to branch
git checkout -b feature-name

# View status
git status

# View commit history
git log --oneline
```

## 🔄 Cron Jobs

### Manual Trigger
```powershell
# Trigger refresh locally
Invoke-WebRequest -Uri "http://localhost:3000/api/cron/refresh" -Headers @{"Authorization"="Bearer your_cron_secret"}

# Trigger on production
Invoke-WebRequest -Uri "https://your-app.vercel.app/api/cron/refresh" -Headers @{"Authorization"="Bearer your_cron_secret"}
```

## 🎨 UI Development

### Tailwind Commands
```powershell
# Generate Tailwind CSS
npx tailwindcss -i ./src/app/globals.css -o ./dist/output.css

# Watch for changes
npx tailwindcss -i ./src/app/globals.css -o ./dist/output.css --watch
```

## 📦 Package Management

### NPM Commands
```powershell
# Install package
npm install package-name

# Install dev dependency
npm install -D package-name

# Uninstall package
npm uninstall package-name

# List installed packages
npm list

# List global packages
npm list -g --depth=0

# View package info
npm info package-name

# Search for packages
npm search keyword
```

## 🛠️ Useful One-Liners

### Quick Fixes
```powershell
# Full reset and reinstall
Remove-Item -Recurse -Force node_modules,.next; npm install; npm run dev

# Quick rebuild
Remove-Item -Recurse -Force .next; npm run build

# Reset database and restart
npx prisma db push --force-reset; npx prisma generate; npm run dev

# Update and restart
npm update; Remove-Item -Recurse -Force .next; npm run dev
```

### Environment Management
```powershell
# Copy env example
cp .env.example .env

# Check if all env vars are set
Get-Content .env | Select-String -Pattern "^[^#].*=.*$"

# Validate .env file
node -e "require('dotenv').config(); console.log('✅ .env loaded successfully')"
```

## 📱 Development Tips

### Port Management
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object OwningProcess

# Kill process on port 3000
$process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($process) { Stop-Process -Id $process.OwningProcess -Force }

# Start on different port
npm run dev -- -p 3001
```

### File Watching Issues
```powershell
# Increase file watch limit (if needed on Linux/Mac)
# Add to ~/.bashrc or ~/.zshrc:
# echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## 🔗 Helpful Aliases (Add to PowerShell Profile)

```powershell
# Open PowerShell profile
notepad $PROFILE

# Add these aliases:
function dev { npm run dev }
function build { npm run build }
function start { npm run start }
function db { npx prisma studio }
function reset { Remove-Item -Recurse -Force .next,node_modules; npm install }
```

## 📚 Documentation Commands

### Generate Documentation
```powershell
# Generate TypeScript docs (if using TypeDoc)
npx typedoc --out docs src

# Generate API docs (if using tools)
npx swagger-jsdoc -d swaggerDef.js -o swagger.json
```

## 🎯 Quick Reference Card

```powershell
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production
npm run lint         # Lint code
npm run setup:db     # Setup database
npx prisma studio    # Open database GUI
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production
```

---

**💡 Pro Tip:** Create a `.ps1` script file with your most-used commands for quick access!

**📖 More Info:** See [QUICKSTART.md](./QUICKSTART.md) for complete setup guide.
