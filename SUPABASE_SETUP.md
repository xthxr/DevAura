# 🚀 Supabase Setup Guide for DevAura

Complete guide to setting up Supabase as your database for DevAura.

## Why Supabase?

- ✅ **Free Tier:** 500MB database, 2GB bandwidth/month
- ✅ **PostgreSQL:** Full-featured PostgreSQL database
- ✅ **No Cold Starts:** Always-on database
- ✅ **Built-in Features:** Auth, Storage, Real-time subscriptions
- ✅ **Excellent Dashboard:** Easy database management
- ✅ **Auto APIs:** REST and GraphQL APIs auto-generated

## Step-by-Step Setup

### 1. Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **Start your project**
3. Sign up with GitHub, Google, or Email

### 2. Create New Project

1. Click **New Project**
2. Fill in details:
   - **Name:** `DevAura` (or your preferred name)
   - **Database Password:** Create a strong password
     - ⚠️ **IMPORTANT:** Save this password! You'll need it for the connection string
     - Generate one: https://passwordsgenerator.net/
   - **Region:** Choose closest to your users
     - US East (recommended for North America)
     - EU West (recommended for Europe)
     - AP Southeast (recommended for Asia)
   - **Pricing Plan:** Free

3. Click **Create new project**
4. Wait ~2 minutes for project setup

### 3. Get Connection String

1. Once project is created, go to **Settings** (gear icon in sidebar)
2. Click **Database** in the left menu
3. Scroll down to **Connection String**
4. You'll see several formats - we need **URI**

#### Connection String Format

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

**Important parts:**
- `postgres` - Default username (don't change)
- `[YOUR-PASSWORD]` - Replace with the password you created in Step 2
- `db.xxxxxxxxxxxxx.supabase.co` - Your unique Supabase host
- `5432` - PostgreSQL port
- `postgres` - Database name

#### Example

If your password is `MySecurePass123!` and your project ref is `abcdefghijklmnop`, your connection string would be:

```
postgresql://postgres:MySecurePass123!@db.abcdefghijklmnop.supabase.co:5432/postgres
```

### 4. Enable Connection Pooling (Optional but Recommended)

For better performance in serverless environments like Vercel:

1. In Supabase Dashboard, go to **Database** > **Connection Pooling**
2. Copy the **Transaction** mode connection string
3. This uses port `6543` instead of `5432`
4. Use this for production deployments

**Pooled Connection String Format:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:6543/postgres?pgbouncer=true
```

### 5. Add to Your .env File

1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Open `.env` and update `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR-ACTUAL-PASSWORD@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
   ```

3. Replace:
   - `YOUR-ACTUAL-PASSWORD` with your database password
   - `xxxxxxxxxxxxx` with your project reference

### 6. Initialize Database

Run Prisma migrations to create all tables:

```powershell
npm run setup:db
```

This will:
- Create all tables (User, DeveloperScore, Account, Session, etc.)
- Set up indexes
- Configure relationships

### 7. Verify Setup

#### Option 1: Using Supabase Dashboard

1. Go to **Table Editor** in Supabase Dashboard
2. You should see all your tables:
   - `User`
   - `DeveloperScore`
   - `Account`
   - `Session`
   - `VerificationToken`
   - `RefreshLog`

#### Option 2: Using Prisma Studio

```powershell
npx prisma studio
```

This opens a web interface at http://localhost:5555 to browse your database.

## 🔒 Security Best Practices

### 1. Secure Your Password

- ✅ Use a strong, unique password (20+ characters)
- ✅ Never commit `.env` to git
- ✅ Use different passwords for development and production
- ❌ Don't share your connection string publicly

### 2. Enable Row Level Security (RLS)

While DevAura uses Prisma for access control, you can add an extra layer:

1. Go to **Authentication** > **Policies** in Supabase
2. Enable RLS on sensitive tables
3. Create policies for your access patterns

### 3. API Keys

Supabase provides API keys in **Settings** > **API**:
- **anon key** - Safe to use in client-side code
- **service_role key** - Keep secret, use only in server-side code

For DevAura, you only need the `DATABASE_URL` since we're using Prisma.

## 🎯 Production Setup

When deploying to Vercel:

1. Use the **Connection Pooling** URL (port 6543)
2. Add `?pgbouncer=true` parameter
3. Set in Vercel environment variables

**Production DATABASE_URL:**
```
postgresql://postgres:YOUR-PASSWORD@db.xxxxxxxxxxxxx.supabase.co:6543/postgres?pgbouncer=true
```

## 📊 Monitoring & Usage

### Check Database Size

1. Go to **Settings** > **Database**
2. See **Database size** under Usage

Free tier includes 500MB - plenty for thousands of users!

### View Logs

1. Go to **Logs** in sidebar
2. See:
   - Database queries
   - API requests
   - Errors and warnings

### Backup

Supabase automatically backs up your database daily on paid plans. For free tier:

1. Go to **Database** > **Backups**
2. Manually trigger backup before major changes
3. Or use Prisma to export data:
   ```powershell
   npx prisma db pull
   ```

## 🆘 Troubleshooting

### Connection Refused

**Problem:** `Error: connect ECONNREFUSED`

**Solutions:**
1. Check your `DATABASE_URL` format
2. Verify project is not paused (happens after 1 week of inactivity on free tier)
3. Check Supabase status: https://status.supabase.com

### Password Authentication Failed

**Problem:** `password authentication failed for user "postgres"`

**Solutions:**
1. Double-check your password in `.env`
2. Make sure password is URL-encoded if it has special characters
3. Reset password in Supabase Dashboard > Settings > Database

### Too Many Connections

**Problem:** `too many connections for role "postgres"`

**Solutions:**
1. Use connection pooling (port 6543)
2. Close unused connections
3. Check for connection leaks in your code

### Project Paused

**Problem:** Project becomes inactive after 1 week

**Solutions:**
1. Make a query to wake it up
2. Upgrade to paid plan for always-on
3. Set up a cron job to keep it active (ping database weekly)

## 🚀 Next Steps

After Supabase is configured:

1. ✅ Configure GitHub OAuth (see `SETUP.md`)
2. ✅ Set up Redis (Vercel KV)
3. ✅ Run `npm run dev` to start development
4. ✅ Deploy to Vercel

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma + Supabase Guide](https://supabase.com/docs/guides/integrations/prisma)
- [Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooling)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## 💡 Pro Tips

1. **Local Development:** Use Supabase CLI to run database locally
   ```powershell
   npx supabase init
   npx supabase start
   ```

2. **Database Branching:** Create preview databases for PR previews
   - Use Supabase branching feature
   - Or create separate projects for dev/staging/prod

3. **Performance:** Enable connection pooling for 5x better performance
4. **Monitoring:** Set up alerts in Supabase for usage limits
5. **Backups:** Export schema regularly with `npx prisma db pull`

---

**Ready?** Copy your connection string, update `.env`, and run `npm run setup:db`! 🎉
