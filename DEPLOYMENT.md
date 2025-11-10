# DevAura - Deployment Checklist

## Pre-Deployment

- [ ] All environment variables configured
- [ ] Database schema pushed to production database
- [ ] GitHub OAuth app configured with production URLs
- [ ] Vercel KV (Redis) set up and connected

## Vercel Configuration

### Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
GITHUB_ID
GITHUB_SECRET
GITHUB_TOKEN
KV_URL
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
CRON_SECRET
```

### Build Settings

- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 18.x

### Cron Jobs

The cron job is configured in `vercel.json` to run daily at midnight UTC (compatible with Vercel Hobby/free plan).

**Note:** Vercel's Hobby plan only supports daily cron jobs. To run more frequently (e.g., every 3 hours):
- Upgrade to Vercel Pro plan ($20/month)
- Or use GitHub Actions (see `.github/workflows/refresh-scores.yml`)
- Or use an external cron service like [cron-job.org](https://cron-job.org)

To secure it, add CRON_SECRET to environment variables.

## Post-Deployment

### Update GitHub OAuth

1. Go to GitHub OAuth App settings
2. Update Homepage URL: `https://your-app.vercel.app`
3. Update Callback URL: `https://your-app.vercel.app/api/auth/callback/github`

### Test the Deployment

1. [ ] Login with GitHub works
2. [ ] Dashboard loads and displays DAI score
3. [ ] Leaderboard displays correctly
4. [ ] Refresh score functionality works
5. [ ] All charts render properly

## Edge Optimization

### Mumbai/Singapore Edge Configuration

Vercel automatically serves from the closest edge location. For optimization in India:

1. Most requests will be served from Mumbai or Singapore edge
2. Database should be hosted in a nearby region (e.g., AWS ap-south-1 for Mumbai)
3. Response times should be <200ms for edge-cached data

### Monitoring

Check Vercel Analytics for:
- Response times
- Error rates
- Geographic distribution
- Core Web Vitals

## Performance Targets

- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s
- Largest Contentful Paint: <2.5s
- API Response Time: <500ms (uncached), <100ms (cached)

## Rollback Plan

If issues occur:

1. Revert to previous deployment in Vercel dashboard
2. Check logs in Vercel → Deployments → [deployment] → Runtime Logs
3. Verify database connections
4. Check environment variables

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org/)
