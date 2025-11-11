# 🔐 Google OAuth Setup for DevAura

Quick guide to add Google Sign-In to your DevAura platform.

## Step 1: Create Google OAuth App (5 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing:
   - Click on project dropdown (top left)
   - Click "New Project"
   - Name: `DevAura`
   - Click "Create"

3. Enable Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - If prompted, configure OAuth consent screen first:
     - User Type: **External**
     - App name: `DevAura`
     - User support email: Your email
     - Developer contact: Your email
     - Save and continue through all steps

5. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: `DevAura`
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for local dev)
     - `https://dev-aura.vercel.app` (your production URL)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://dev-aura.vercel.app/api/auth/callback/google`
   - Click "Create"

6. Copy your credentials:
   - **Client ID**: Starts with something like `123456789-abc.apps.googleusercontent.com`
   - **Client Secret**: Random string

## Step 2: Add to Local .env

Open your `.env` file and add:

```env
# Google OAuth
GOOGLE_CLIENT_ID="YOUR_CLIENT_ID.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="YOUR_CLIENT_SECRET"
```

## Step 3: Add to Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **DevAura** project
3. Go to **Settings** → **Environment Variables**
4. Add two new variables:

**Variable 1:**
- Name: `GOOGLE_CLIENT_ID`
- Value: Your Client ID
- Environments: Production ✅, Preview ✅

**Variable 2:**
- Name: `GOOGLE_CLIENT_SECRET`
- Value: Your Client Secret
- Environments: Production ✅, Preview ✅

5. Click **Save**
6. **Redeploy** your site

## Step 4: Test It!

1. Go to your site
2. You'll see two sign-in buttons:
   - **Sign in with GitHub** (dark button)
   - **Sign in with Google** (white button with Google logo)
3. Click either one to sign in!

## What Users Can Do

Users can sign in with:
- ✅ GitHub (for developers with GitHub profiles)
- ✅ Google (for anyone with a Gmail account)

**Note:** If a user signs in with both GitHub and Google using the same email, NextAuth will link them to the same account automatically!

## Troubleshooting

### "redirect_uri_mismatch" error

**Problem:** The redirect URI doesn't match what's configured in Google Console.

**Solution:**
1. Check the error message - it shows the redirect URI that was sent
2. Copy that EXACT URL
3. Go to Google Cloud Console → Credentials → Edit your OAuth client
4. Add the exact URL to "Authorized redirect URIs"
5. Save and try again

### "Access blocked: This app's request is invalid"

**Problem:** OAuth consent screen not configured properly.

**Solution:**
1. Go to Google Cloud Console → "OAuth consent screen"
2. Add your email to "Test users" if app is in Testing mode
3. Or publish the app (move to Production)

### Users not seeing Google button

**Problem:** Environment variables not set.

**Solution:**
1. Check Vercel env vars are set
2. Redeploy after adding env vars
3. Check browser console for errors

## Security Notes

- Keep `GOOGLE_CLIENT_SECRET` private
- Never commit it to Git
- `.env` is already in `.gitignore`
- Only add production URL to authorized origins in production

## Cost

- ✅ **100% FREE**
- Google OAuth is free with no limits for standard use
- No credit card required

---

**That's it!** Your users can now sign in with both GitHub and Google! 🎉
