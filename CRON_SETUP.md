# ⏰ Cron Jobs Configuration for DevAura

## Overview

DevAura uses cron jobs to automatically refresh user DAI scores. This guide explains the different options based on your deployment plan.

## Vercel Hobby Plan (Free) - Default Configuration

### What's Configured

```json
{
  "crons": [{
    "path": "/api/cron/refresh",
    "schedule": "0 0 * * *"
  }]
}
```

**Schedule:** Daily at midnight UTC  
**Limitation:** Vercel Hobby plan only allows **once-per-day** cron jobs  
**Cost:** Free

### Why Daily is Enough

- User scores are cached for 3 hours in Redis
- Manual refresh button available on dashboard
- Most developers don't commit every hour
- Reduces GitHub API usage

## Upgrade Options for More Frequent Updates

### Option 1: Vercel Pro Plan

**Cost:** $20/month

**Benefits:**
- Run cron jobs **hourly** or more frequently
- Better performance and analytics
- Team collaboration features

**To Enable:**
1. Upgrade to Vercel Pro
2. Update `vercel.json`:
   ```json
   {
     "crons": [{
       "path": "/api/cron/refresh",
       "schedule": "0 */3 * * *"
     }]
   }
   ```
3. Redeploy

**Cron Expression Options:**
- `0 */1 * * *` - Every hour
- `0 */3 * * *` - Every 3 hours
- `0 */6 * * *` - Every 6 hours
- `*/30 * * * *` - Every 30 minutes (Pro only)

### Option 2: GitHub Actions (Free Alternative)

**Cost:** Free (included with GitHub)

**How it Works:**
- GitHub Actions calls your API endpoint on a schedule
- Runs independently of Vercel
- Works with any hosting plan

**Setup:**

1. The workflow is already configured in `.github/workflows/refresh-scores.yml`

2. Add secrets to your GitHub repository:
   - Go to Settings > Secrets and variables > Actions
   - Add `CRON_SECRET`: Generate with `openssl rand -base64 32`
   - Add `VERCEL_URL`: Your deployed Vercel URL (e.g., `https://devaura.vercel.app`)

3. Current schedule (you can modify):
   ```yaml
   schedule:
     - cron: '0 0 * * *'  # Daily at midnight UTC
   ```

4. Change frequency if desired:
   ```yaml
   schedule:
     - cron: '0 */3 * * *'  # Every 3 hours
   ```

**GitHub Actions Limits:**
- Free tier: 2,000 minutes/month (plenty for cron jobs)
- Runs up to every 5 minutes
- Can trigger manually via workflow_dispatch

### Option 3: External Cron Service

**Cost:** Free tier available

**Services:**
- [cron-job.org](https://cron-job.org) - Free, reliable
- [EasyCron](https://www.easycron.com) - Free tier: 100 executions/month
- [Cronitor](https://cronitor.io) - Free tier: 5 monitors

**Setup:**

1. Create account on chosen service
2. Add new cron job with URL: `https://your-app.vercel.app/api/cron/refresh`
3. Add header: `Authorization: Bearer YOUR_CRON_SECRET`
4. Set schedule (e.g., every 3 hours)

**Example with cron-job.org:**
1. Sign up at https://cron-job.org
2. Create new cron job
3. URL: `https://devaura.vercel.app/api/cron/refresh`
4. Schedule: Every 3 hours (`0 */3 * * *`)
5. Add request header: `Authorization: Bearer your-secret`
6. Save and enable

## Securing Your Cron Endpoint

### Add CRON_SECRET Environment Variable

1. Generate a secret:
   ```bash
   openssl rand -base64 32
   ```

2. Add to Vercel environment variables:
   - Go to Vercel Dashboard > Your Project > Settings > Environment Variables
   - Name: `CRON_SECRET`
   - Value: Your generated secret
   - Apply to: Production, Preview, Development

3. The API endpoint already checks this:
   ```typescript
   const authHeader = request.headers.get('authorization')
   const token = authHeader?.replace('Bearer ', '')
   
   if (token !== process.env.CRON_SECRET) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
   }
   ```

## Monitoring Cron Jobs

### Vercel Cron Logs

1. Go to Vercel Dashboard > Your Project > Logs
2. Filter by `/api/cron/refresh`
3. Check for errors or successful runs

### GitHub Actions Logs

1. Go to your GitHub repo > Actions tab
2. Click on "Refresh DAI Scores" workflow
3. View run history and logs

### Manual Testing

Test your cron endpoint manually:

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://your-app.vercel.app/api/cron/refresh
```

Expected response:
```json
{
  "success": true,
  "refreshed": 150,
  "timestamp": "2025-11-11T00:00:00.000Z"
}
```

## Recommended Configuration

### For Development (Free)
- **Vercel:** Daily cron (included)
- **GitHub Actions:** Daily cron (free)
- **Manual refresh:** Available on dashboard

### For Small Projects (<100 users)
- **Vercel:** Daily cron
- **Manual refresh:** When needed
- **Cost:** $0

### For Growing Projects (100-1000 users)
- **GitHub Actions:** Every 3 hours
- **Vercel:** Daily cron (backup)
- **Cost:** $0

### For Production (1000+ users)
- **Vercel Pro:** Every 1-3 hours
- **GitHub Actions:** Hourly (backup)
- **Cost:** $20/month

## Cron Expression Reference

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
│ │ │ │ │
* * * * *
```

**Common Patterns:**
- `0 0 * * *` - Daily at midnight
- `0 */3 * * *` - Every 3 hours
- `0 */6 * * *` - Every 6 hours
- `0 0,12 * * *` - Twice daily (midnight and noon)
- `0 2 * * *` - Daily at 2 AM
- `0 0 * * 0` - Weekly on Sunday

## Troubleshooting

### Cron job not running

1. **Check Vercel plan:** Hobby plan only supports daily crons
2. **Verify schedule syntax:** Use https://crontab.guru to validate
3. **Check logs:** Vercel Dashboard > Logs
4. **Verify deployment:** Ensure `vercel.json` is deployed

### Unauthorized errors

1. **Check CRON_SECRET:** Must match in all environments
2. **Verify headers:** Authorization header must include "Bearer "
3. **Test manually:** Use curl to test endpoint

### GitHub Actions not working

1. **Check secrets:** CRON_SECRET and VERCEL_URL must be set
2. **Verify permissions:** Workflow must have permission to run
3. **Check schedule:** GitHub Actions runs may be delayed by up to 15 minutes
4. **Manual trigger:** Use "Run workflow" button to test

## Performance Impact

### API Rate Limits

- **GitHub API:** 5,000 requests/hour with token
- **Users refreshed per run:** ~50-100 users
- **Safe frequency:** Every 1-3 hours

### Database Load

- **Cron duration:** 30-60 seconds for 100 users
- **Database queries:** ~5 per user
- **Recommended:** Add indexes, use connection pooling

### Cache Strategy

- **User scores:** 3-hour cache TTL
- **Leaderboard:** 30-minute cache TTL
- **Cron runs:** Update both caches

## Future Improvements

- [ ] Incremental refresh (only active users)
- [ ] Priority queue (refresh popular users more often)
- [ ] Webhook-based updates (on GitHub push events)
- [ ] Distributed cron jobs (shard by user ID)

---

**Current Setup:** Daily cron at midnight UTC (Vercel Hobby compatible)  
**Recommended Upgrade:** GitHub Actions for 3-hour refresh (free)  
**Future Scale:** Vercel Pro for hourly updates ($20/month)
