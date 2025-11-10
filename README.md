# DevAura - Global Developer Ranking Platform

<div align="center">

![DevAura Logo](https://img.shields.io/badge/DevAura-Developer_Ranking-blueviolet?style=for-the-badge)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

A scalable, fast, and cost-efficient platform that calculates a unified **Developer Aura Index (DAI)** using public coding and social data.

[🚀 Quick Start](#quick-start) • [📖 Documentation](#documentation) • [🎯 Features](#features) • [🏗️ Architecture](#architecture) • [🤝 Contributing](#contributing)

</div>

---

## 🌟 What is DevAura?

DevAura analyzes your coding activity across multiple platforms and generates a comprehensive **Developer Aura Index (DAI)** score that represents your:

- 💻 **Technical Skills** (45%) - GitHub repos, commits, stars, LeetCode performance
- 🎨 **Creativity** (35%) - Project originality, code quality, innovation
- 👥 **Social Impact** (20%) - Followers, contributions, Stack Overflow reputation
- ⚡ **Multipliers** - Consistency, innovation, and excellence bonuses

## ✨ Features

### Core Functionality
- 🔐 **GitHub OAuth Authentication** - Secure, one-click login
- 📊 **Advanced DAI Calculation** - Multi-factor scoring algorithm
- 🏆 **Global Leaderboard** - Compete with developers worldwide
- 📈 **Interactive Dashboard** - Beautiful charts and visualizations
- 🔄 **Auto-refresh** - Scores update daily automatically (Vercel Hobby plan compatible)
- ⚡ **Lightning Fast** - Redis caching + Edge deployment

### Technical Excellence
- ✅ Built with **Next.js 15** + **TypeScript**
- ✅ **Prisma ORM** for type-safe database queries
- ✅ **Vercel KV (Redis)** for intelligent caching
- ✅ **Framer Motion** for smooth animations
- ✅ **Tailwind CSS** for responsive design
- ✅ **Edge Runtime** for global low latency
- ✅ **Fully typed** - End-to-end type safety

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- GitHub account
- PostgreSQL database (Supabase recommended)

### Installation

```powershell
# 1. Clone the repository
git clone https://github.com/yourusername/devaura.git
cd devaura

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your credentials

# 4. Initialize database
npm run setup:db

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### One-Line Setup (Automated)

```powershell
npm run setup
```

See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](./SETUP.md)** - Detailed setup guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
- **[API.md](./API.md)** - API documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete overview

## 🏗️ Architecture

- **Frontend & Backend**: Next.js 15 (App Router) + TypeScript
- **Authentication**: NextAuth.js with GitHub OAuth
- **Database**: PostgreSQL (Supabase) + Prisma ORM
- **Caching**: Vercel KV (Redis)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Deployment**: Vercel (Mumbai/Singapore edge)

## Setup Instructions

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment variables**:
   - Copy `.env.example` to `.env`
   - Fill in your credentials:
     - GitHub OAuth App credentials
     - Database URL (Supabase)
     - Vercel KV credentials
     - GitHub Personal Access Token

3. **Setup database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel**:
   ```bash
   vercel
   ```

## DAI Formula

```typescript
DAI = (T × 0.45) + (C × 0.35) + (S × 0.20) + M

Where:
├─ T (Technical): 0-100 points
│  ├─ GitHub commits (0-50)
│  ├─ Public repositories (0-15)
│  ├─ Stars received (0-25)
│  └─ LeetCode problems (0-30)
│
├─ C (Creativity): 0-100 points
│  ├─ Language diversity (0-20)
│  ├─ Project originality (0-25)
│  ├─ Innovation score (0-20)
│  ├─ Code quality (0-15)
│  └─ Repository quality (0-20)
│
├─ S (Social): 0-100 points
│  ├─ GitHub followers (0-30)
│  ├─ Contributions (0-20)
│  ├─ SO reputation (0-35)
│  └─ SO answers (0-15)
│
└─ M (Multipliers): +0 to +30 bonus
   ├─ Consistency (+10)
   ├─ Innovation (+10)
   └─ Excellence (+10)
```

### Grade Tiers

| Tier | Score Range | Grade | Description |
|------|-------------|-------|-------------|
| 🏆 Legendary | 90-100 | S+ | Elite worldwide developers |
| 🌟 Master | 80-89 | S | Exceptional experts |
| 💎 Expert | 70-79 | A | Highly proficient |
| 🎯 Advanced | 60-69 | B | Strong technical skills |
| 📚 Intermediate | 50-59 | C | Good foundation |
| 🌱 Developing | 40-49 | D | On the right path |
| 🔰 Beginner | 0-39 | E | Getting started |

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=DevAura+Dashboard)

### Leaderboard
![Leaderboard](https://via.placeholder.com/800x400?text=Global+Leaderboard)

## 🛠️ Development

### Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/             # API routes
│   ├── dashboard/       # User dashboard
│   ├── leaderboard/     # Global rankings
│   └── login/           # Login page
├── components/          # React components
├── lib/                 # Core utilities
│   ├── dai-calculator.ts   # Scoring engine
│   ├── cache.ts           # Redis helpers
│   └── prisma.ts          # Database client
├── services/            # External integrations
│   ├── github.ts          # GitHub API (real)
│   ├── leetcode.ts        # LeetCode (mock)
│   └── stackoverflow.ts   # Stack Overflow (mock)
└── types/               # TypeScript types
```

### Available Scripts

```powershell
npm run dev           # Start dev server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
npm run setup:db      # Initialize database
npm run setup         # Automated setup (Windows)
```

### Environment Variables

```env
# Required
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[generate random secret]"
GITHUB_ID="your_github_oauth_client_id"
GITHUB_SECRET="your_github_oauth_client_secret"
GITHUB_TOKEN="your_github_personal_token"

# Vercel KV (Redis)
KV_URL="..."
KV_REST_API_URL="..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."

# Optional
CRON_SECRET="random_secret_for_cron"
```

## 🚀 Deployment

### Deploy to Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel
```

Or connect your GitHub repo in the [Vercel Dashboard](https://vercel.com/new).

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

### Post-Deployment Checklist

- [ ] Configure environment variables in Vercel
- [ ] Update GitHub OAuth callback URL
- [ ] Setup Vercel KV (Redis)
- [ ] Test authentication flow
- [ ] Verify DAI calculation
- [ ] Check leaderboard updates

## 💰 Cost Estimate

### Free Tier (Up to 10K MAU)
- Vercel: Free
- PlanetScale: Free (5GB)
- Vercel KV: Free (256MB)
- **Total: $0/month**

### Paid Tier (10K+ MAU)
- Vercel Pro: $20/month
- PlanetScale Scaler: $29/month
- Vercel KV Pro: $10/month
- **Total: $59/month**

## 🔒 Security

- ✅ GitHub OAuth authentication
- ✅ NextAuth.js session management
- ✅ CSRF protection
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React)
- ✅ Environment variable encryption
- ✅ Secure cron endpoints

## 📈 Performance

### Targets
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s
- API Response (cached): <100ms
- API Response (uncached): <500ms

### Optimizations
- ✅ Code splitting (dynamic imports)
- ✅ Redis caching (3-hour TTL)
- ✅ Edge deployment (Vercel)
- ✅ Image optimization
- ✅ CSS optimization (Tailwind JIT)

## 🗺️ Roadmap

### Current Version (1.0.0) ✅
- [x] GitHub OAuth
- [x] DAI calculation
- [x] Dashboard
- [x] Leaderboard
- [x] Auto-refresh

### Next Release (1.1.0)
- [ ] Real LeetCode API
- [ ] Real Stack Exchange API
- [ ] Google Gemini code analysis
- [ ] User profiles
- [ ] Achievement badges

### Future
- [ ] Mobile app
- [ ] Team rankings
- [ ] Social sharing
- [ ] Email notifications
- [ ] Public API

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Built with amazing open-source technologies:
- [Next.js](https://nextjs.org/) by Vercel
- [React](https://react.dev/) by Meta
- [Prisma](https://www.prisma.io/) by Prisma Labs
- [Tailwind CSS](https://tailwindcss.com/) by Tailwind Labs
- [Framer Motion](https://www.framer.com/motion/) by Framer
- [Recharts](https://recharts.org/) by Recharts
- And many more...

## 📞 Support

- 📖 **Documentation:** Check docs in this repository
- 🐛 **Bug Reports:** [Open an issue](https://github.com/yourusername/devaura/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/yourusername/devaura/discussions)
- 📧 **Email:** your@email.com

## ⭐ Star Us!

If you find DevAura useful, please consider giving it a star on GitHub!

---

<div align="center">

**Built with ❤️ for the developer community**

[Website](https://devaura.vercel.app) • [Documentation](./QUICKSTART.md) • [API Docs](./API.md)

</div>
