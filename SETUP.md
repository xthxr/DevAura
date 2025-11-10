# DevAura Setup Guide

## Quick Start

Follow these steps to get DevAura running locally and deployed to Vercel.

## Prerequisites

- Node.js 18+ installed
- A GitHub account
- A Vercel account (free tier works fine)
- PostgreSQL database (Supabase recommended)

## Step 1: Install Dependencies

```powershell
npm install
```

## Step 2: Setup GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: DevAura
   - Homepage URL: `http://localhost:3000` (for local dev)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Note your **Client ID** and generate a **Client Secret**

## Step 3: Setup Database (Supabase)

### Supabase PostgreSQL (Recommended)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **New Project**
3. Fill in:
   - Name: `DevAura`
   - Database Password: Create a strong password (save it!)
   - Region: Choose closest to you
4. Wait ~2 minutes for project creation
5. Go to **Settings** > **Database**
6. Copy the **Connection String (URI)**
7. Replace `[YOUR-PASSWORD]` with your database password

**Why Supabase?**
- Free tier: 500MB database, 2GB bandwidth/month
- No cold starts
- Built-in auth, storage, and real-time features
- Excellent dashboard and tooling

**Alternative Options:**
- PlanetScale (MySQL) - [planetscale.com](https://planetscale.com/)
- Neon (PostgreSQL) - [neon.tech](https://neon.tech/)

## Step 4: Setup Vercel KV (Redis)

1. Go to your Vercel dashboard
2. Create a new project or select existing
3. Go to Storage → Create Database → KV
4. Copy all KV environment variables

## Step 5: Setup Environment Variables

Copy `.env.example` to `.env`:

```powershell
cp .env.example .env
```

Edit `.env` and fill in all values:

```env
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\""

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# GitHub Token (for API access - create at github.com/settings/tokens)
GITHUB_TOKEN="your-github-personal-access-token"

# Vercel KV (copy from Vercel dashboard)
KV_URL="your-kv-url"
KV_REST_API_URL="your-kv-rest-api-url"
KV_REST_API_TOKEN="your-kv-rest-api-token"
KV_REST_API_READ_ONLY_TOKEN="your-kv-read-only-token"

# Optional: Cron secret for securing the refresh endpoint
CRON_SECRET="your-random-secret-string"
```

## Step 6: Setup Database Schema

```powershell
npx prisma generate
npx prisma db push
```

## Step 7: Run Development Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Deploy to Vercel

### Via Vercel CLI

```powershell
npm install -g vercel
vercel login
vercel
```

### Via Vercel Dashboard

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables from your `.env` file
4. Deploy!

## Step 9: Configure Production URLs

After deployment:

1. Update GitHub OAuth App:
   - Homepage URL: `https://your-app.vercel.app`
   - Callback URL: `https://your-app.vercel.app/api/auth/callback/github`

2. Update `.env` on Vercel:
   - NEXTAUTH_URL: `https://your-app.vercel.app`

## Troubleshooting

### Database Connection Issues

- Ensure your DATABASE_URL is correct
- For Supabase, verify the password is correct and URL-encoded if it has special characters
- Check project is not paused (happens after 1 week of inactivity on free tier)
- For connection pooling in production, use port 6543 instead of 5432

### GitHub OAuth Not Working

- Verify callback URLs match exactly
- Check that GITHUB_ID and GITHUB_SECRET are correct
- Ensure NEXTAUTH_URL matches your current environment

### Caching Issues

- Verify all KV_* environment variables are set
- Check Vercel KV dashboard for connection status

### Rate Limiting

- Add GITHUB_TOKEN to increase GitHub API rate limits
- GitHub provides 5,000 requests/hour with authentication vs 60 without

## Performance Optimizations

The app is already optimized for:

- ✅ Edge runtime on Vercel
- ✅ Redis caching (3-hour TTL for user scores)
- ✅ Lazy-loaded chart components
- ✅ Optimized images with Next.js Image
- ✅ Code splitting and tree shaking

## Scaling Considerations

For production with many users:

1. **Database**: Upgrade to paid tier with connection pooling
2. **Caching**: Increase KV storage if needed
3. **API Rate Limits**: Use multiple GitHub tokens with rotation
4. **Background Jobs**: Move score refresh to a dedicated service

## Cost Estimate

For 10,000 monthly active users:

- Vercel: $0 (free tier sufficient for start)
- Database (Supabase): $0 - $25/month
- KV (Redis): $0 - $10/month
- **Total: $0 - $35/month**

## Next Steps

- [ ] Add Google Gemini API for real AI evaluation
- [ ] Integrate real LeetCode API
- [ ] Integrate Stack Exchange API
- [ ] Add user profile customization
- [ ] Implement team/organization rankings
- [ ] Add achievement badges system

## Support

For issues or questions, check the README.md or create an issue on GitHub.
