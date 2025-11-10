# 🚀 DevAura - Quick Start Guide

## What is DevAura?

DevAura is a global developer ranking platform that calculates a unified **Developer Aura Index (DAI)** score based on your:
- GitHub activity (repos, commits, stars, followers)
- LeetCode problem-solving (mocked for now)
- Stack Overflow reputation (mocked for now)
- AI-evaluated code quality (mocked for now)

## Architecture Overview

```
Frontend: Next.js 15 + React + TypeScript
Backend: Next.js API Routes (serverless)
Database: PostgreSQL (Supabase)
Cache: Vercel KV (Redis)
Auth: NextAuth.js + GitHub OAuth
Styling: Tailwind CSS
Animations: Framer Motion
Charts: Recharts
Deployment: Vercel
```

## File Structure

```
DevAura/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth routes
│   │   │   ├── user/          # User DAI calculation
│   │   │   ├── leaderboard/   # Global rankings
│   │   │   └── cron/          # Auto-refresh job
│   │   ├── dashboard/         # User dashboard page
│   │   ├── leaderboard/       # Leaderboard page
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (redirects)
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Navbar.tsx
│   │   ├── ScoreCard.tsx
│   │   ├── RadarChart.tsx
│   │   ├── BadgeDisplay.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── RefreshButton.tsx
│   │   └── Providers.tsx
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config
│   │   ├── prisma.ts          # Prisma client
│   │   ├── cache.ts           # Redis cache helpers
│   │   ├── dai-calculator.ts  # DAI formula
│   │   └── utils.ts           # Utility functions
│   ├── services/
│   │   ├── github.ts          # Real GitHub API
│   │   ├── leetcode.ts        # Mock LeetCode data
│   │   ├── stackoverflow.ts   # Mock SO data
│   │   └── ai-evaluation.ts   # Mock AI evaluation
│   ├── types/
│   │   ├── index.ts           # TypeScript types
│   │   └── next-auth.d.ts     # NextAuth types
│   └── middleware.ts          # Auth middleware
├── .env.example               # Environment template
├── package.json               # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── next.config.js            # Next.js config
├── vercel.json               # Vercel cron config
├── README.md                 # Project overview
├── SETUP.md                  # Detailed setup guide
├── DEPLOYMENT.md             # Deployment checklist
└── install.ps1               # Installation script
```

## Installation (Windows PowerShell)

### Option 1: Automated Setup

```powershell
# Run the installation script
npm run setup

# Edit .env file with your credentials
notepad .env

# Setup database
npm run setup:db

# Start development server
npm run dev
```

### Option 2: Manual Setup

```powershell
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env

# 3. Edit .env with your credentials
# (See SETUP.md for detailed instructions)

# 4. Setup database
npx prisma generate
npx prisma db push

# 5. Run development server
npm run dev
```

## Required Services

### 1. GitHub OAuth App

Create at: https://github.com/settings/developers

- Callback URL: `http://localhost:3000/api/auth/callback/github`
- Get Client ID and Secret

### 2. GitHub Personal Access Token

Create at: https://github.com/settings/tokens

- Scope: `read:user`, `user:email`
- Increases API rate limit from 60 to 5000/hour

### 3. Database

**Supabase (Recommended):**
- Free tier: 500MB database, 2GB bandwidth/month
- Visit: https://supabase.com
- Go to Settings > Database > Copy Connection String (URI)
- Replace `[YOUR-PASSWORD]` with your database password

**Alternative Options:**
- PlanetScale (MySQL): https://planetscale.com
- Neon (PostgreSQL): https://neon.tech

### 4. Vercel KV (Redis)

- Free tier: 256MB storage
- Setup in Vercel dashboard after deploying

## Environment Variables

Create `.env` file:

```env
# Database (from Supabase)
DATABASE_URL="postgresql://postgres:your-password@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[generate with: openssl rand -base64 32]"

# GitHub OAuth
GITHUB_ID="your_client_id"
GITHUB_SECRET="your_client_secret"
GITHUB_TOKEN="your_personal_access_token"

# Vercel KV (add after first deploy)
KV_URL="..."
KV_REST_API_URL="..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."

# Optional
CRON_SECRET="random_secret_for_cron_endpoint"
```

## DAI Calculation Formula

```typescript
DAI = (Technical × 0.45) + (Creativity × 0.35) + (Social × 0.20) + Multipliers

Technical (0-100):
  - GitHub commits (0-50)
  - Public repos (0-15)
  - Stars received (0-25)
  - LeetCode problems (0-30)

Creativity (0-100):
  - Language diversity (0-20)
  - Project originality (0-25)
  - Innovation score (0-20)
  - Code quality (0-15)
  - Repo quality (0-20)

Social (0-100):
  - GitHub followers (0-30)
  - Contributions (0-20)
  - SO reputation (0-35)
  - SO answers (0-15)

Multipliers (+0 to +30):
  - Consistency bonus (+10)
  - Innovation bonus (+10)
  - Excellence bonus (+10)
```

## Grade Tiers

- **S+ (90-100)**: Legendary - Elite worldwide
- **S (80-89)**: Master - Exceptional expert
- **A (70-79)**: Expert - Highly proficient
- **B (60-69)**: Advanced - Strong skills
- **C (50-59)**: Intermediate - Good foundation
- **D (40-49)**: Developing - On the right path
- **E (0-39)**: Beginner - Getting started

## Development Commands

```powershell
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run setup:db     # Initialize database
```

## Deployment to Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Or push to GitHub and import in Vercel dashboard
```

See `DEPLOYMENT.md` for complete deployment guide.

## Key Features Implemented

✅ GitHub OAuth authentication  
✅ Real GitHub API integration  
✅ DAI score calculation engine  
✅ Redis caching (3-hour TTL)  
✅ Global leaderboard  
✅ Responsive radar charts  
✅ Animated badges & UI  
✅ Auto-refresh every 3 hours  
✅ Edge-optimized deployment  
✅ TypeScript throughout  
✅ Mobile responsive  

## Performance Optimizations

- ✅ Dynamic imports for charts (code splitting)
- ✅ Redis caching for API responses
- ✅ Optimized database queries with Prisma
- ✅ Edge runtime on Vercel
- ✅ Image optimization with Next.js
- ✅ CSS optimization with Tailwind JIT

## Future Enhancements

- [ ] Real LeetCode API integration
- [ ] Real Stack Exchange API integration
- [ ] OpenAI API for code quality analysis
- [ ] GitHub contribution calendar
- [ ] Activity timeline
- [ ] User profile customization
- [ ] Team/organization rankings
- [ ] Achievement badges system
- [ ] Social sharing features
- [ ] Export DAI certificate

## API Endpoints

```
GET  /api/auth/[...nextauth]    # NextAuth endpoints
GET  /api/user                  # Get/calculate user DAI
GET  /api/user?refresh=true     # Force recalculate
GET  /api/leaderboard           # Get global rankings
GET  /api/leaderboard?page=2    # Paginated rankings
GET  /api/cron/refresh          # Auto-refresh job (cron only)
```

## Troubleshooting

### "Cannot find module" errors
These are expected before `npm install`. Run installation first.

### Database connection fails
- Verify DATABASE_URL is correct
- Check database is accessible
- Ensure SSL parameters if required

### GitHub OAuth fails
- Verify callback URL matches exactly
- Check GITHUB_ID and GITHUB_SECRET
- Ensure NEXTAUTH_URL is set correctly

### Charts not rendering
- Ensure all dependencies installed
- Check browser console for errors
- Verify Recharts is imported dynamically

### Caching not working
- Verify Vercel KV is set up
- Check all KV_* environment variables
- Ensure Redis is accessible

## Cost Estimate (10K MAU)

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| Vercel | ✅ Sufficient | $20/month |
| Database | ✅ PlanetScale free | $29/month |
| Redis (KV) | ✅ 256MB free | $10/month |
| **Total** | **$0** | **$59/month** |

## Support & Resources

- 📖 [SETUP.md](./SETUP.md) - Detailed setup instructions
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment checklist
- 📝 [README.md](./README.md) - Project overview
- 💬 GitHub Issues - Report bugs/request features

## License

MIT License - Feel free to use for learning or production!

---

**Happy coding! May your DAI score be legendary! 🌟**
