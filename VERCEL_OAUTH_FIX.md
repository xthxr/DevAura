# 🔧 Quick Fix: GitHub OAuth on Vercel

## The Problem
You're getting stuck in a sign-in loop on your Vercel deployment because:
1. ✅ **FIXED**: Database tables are now synced
2. ✅ **FIXED**: Auth callback now handles new users properly (just pushed to GitHub)
3. ⚠️ **TODO**: GitHub OAuth App needs your production URL
4. ⚠️ **TODO**: Vercel needs NEXTAUTH_URL environment variable

## What You Need to Do Now

### Step 1: Update GitHub OAuth App (2 minutes)

1. Go to: https://github.com/settings/developers
2. Click on your OAuth App (the one with Client ID: `Ov23liHowS8zghjRxMlR`)
3. Click **"Edit"**
4. Find **"Authorization callback URL"** field
5. Add this URL (replace `YOUR-SITE` with your actual Vercel URL):
   ```
   https://YOUR-SITE.vercel.app/api/auth/callback/github
   ```
   
   **Examples:**
   - If your site is `dev-aura.vercel.app`, use: `https://dev-aura.vercel.app/api/auth/callback/github`
   - If your site is `devaura.vercel.app`, use: `https://devaura.vercel.app/api/auth/callback/github`
   
6. **Keep the localhost URL** if you want local development to work:
   ```
   http://localhost:3000/api/auth/callback/github
   ```
   
7. Click **"Update application"**

### Step 2: Add NEXTAUTH_URL to Vercel (2 minutes)

1. Go to: https://vercel.com/dashboard
2. Select your **DevAura** project
3. Click **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Fill in:
   - **Name:** `NEXTAUTH_URL`
   - **Value:** `https://YOUR-SITE.vercel.app` (same URL from Step 1)
   - **Apply to:** Production ✅, Preview ✅, Development ❌
6. Click **"Save"**

### Step 3: Redeploy (30 seconds)

1. In Vercel Dashboard, go to **Deployments**
2. Click the **⋯** (three dots) on your latest deployment
3. Click **"Redeploy"**
4. Wait for the deployment to complete (~2 minutes)

### Step 4: Test Sign-In

1. Go to your Vercel site
2. Click "Sign in with GitHub"
3. You should now be redirected to your dashboard! 🎉

## How to Find Your Vercel URL

**Option 1:** Check your browser
- Look at the URL bar when you visit your site
- It should be something like: `https://dev-aura-abc123.vercel.app`

**Option 2:** Check Vercel Dashboard
- Go to https://vercel.com/dashboard
- Click on DevAura project
- The URL is shown at the top of the page

**Option 3:** Check your latest deployment
- Vercel Dashboard → Deployments
- Click on the latest deployment
- Copy the "Domains" URL

## Troubleshooting

### Still getting "redirect_uri not associated" error?
- Double-check the callback URL in GitHub OAuth App
- Make sure there's no trailing slash: ✅ `/github` ❌ `/github/`
- Make sure protocol is correct: ✅ `https://` ❌ `http://`

### Still looping on login page?
- Clear your browser cookies or use Incognito mode
- Check Vercel logs: Dashboard → Your Project → Logs
- Look for any Prisma or database errors

### Database errors?
The database is already synced, but if you see Prisma errors:
```bash
npx prisma db push
```

## What Was Fixed in the Code

I fixed the authentication callback to properly handle new users:

**Before (causing the loop):**
```typescript
await prisma.user.update({  // ❌ Fails if user doesn't exist
  where: { id: user.id },
  data: { githubUsername: (profile as any).login }
})
```

**After (working):**
```typescript
await prisma.user.upsert({  // ✅ Creates or updates
  where: { id: user.id },
  update: { githubUsername: (profile as any).login },
  create: {
    id: user.id,
    email: user.email!,
    name: user.name,
    image: user.image,
    githubUsername: (profile as any).login,
  },
})
```

## Quick Checklist

- [x] Database tables created (`npx prisma db push` - done!)
- [x] Auth callback fixed (pushed to GitHub - done!)
- [ ] GitHub OAuth App updated with production callback URL
- [ ] Vercel NEXTAUTH_URL environment variable added
- [ ] Site redeployed
- [ ] Sign-in tested

---

**After completing Steps 1-3, your sign-in should work perfectly!** 🚀

If you still have issues, share the error message from Vercel logs and I'll help debug further.
