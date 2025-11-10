# 🤖 Google Gemini API Setup Guide

This guide will help you set up Google Gemini API for AI-powered code evaluation in DevAura.

## Why Google Gemini?

- ✅ **Free Tier:** 60 requests per minute (RPM) free
- ✅ **Powerful:** Advanced code understanding and analysis
- ✅ **Easy Integration:** Simple REST API
- ✅ **Cost-Effective:** Much cheaper than alternatives
- ✅ **No Credit Card Required:** Get started immediately

## Step-by-Step Setup

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Click **"Create API key in new project"** (or select existing project)
5. Copy the API key (starts with `AIza...`)

**Important:** Save this key securely! You won't be able to see it again.

### 2. Add to Your `.env` File

Open your `.env` file and add:

```env
GEMINI_API_KEY="AIzaSy..."
```

Replace `AIzaSy...` with your actual API key.

### 3. Test the Integration (Optional)

You can test if Gemini is working with this quick script:

```powershell
# Create a test file
@"
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: 'Say hello!' }]
    }]
  })
})
.then(r => r.json())
.then(d => console.log(d.candidates[0].content.parts[0].text))
.catch(e => console.error(e))
"@ | Set-Content test-gemini.js

node test-gemini.js
```

If it works, you'll see "Hello!" in the response.

## How DevAura Uses Gemini

DevAura uses Gemini to analyze:

1. **Project Originality** (0-100)
   - Uniqueness of projects
   - Innovation in approach
   - Creativity in solutions

2. **Documentation Quality** (0-100)
   - README completeness
   - Code comments
   - API documentation

3. **Code Quality** (0-100)
   - Code structure and organization
   - Best practices adherence
   - Design patterns usage

4. **Innovation Score** (0-100)
   - Technical creativity
   - Problem-solving approach
   - Use of modern technologies

## Enabling AI Evaluation

Currently, AI evaluation is **commented out** in the code. To enable it:

### Option 1: Use the Mock (Current Default)

The app currently uses a mock AI evaluation that works without any API key. This is fine for development!

### Option 2: Enable Real Gemini API

1. Open `src/services/ai-evaluation.ts`
2. Find the commented section starting with `/*`
3. Uncomment the `evaluateProjectQualityWithGemini` function
4. Replace the main `evaluateProjectQuality` function to call Gemini
5. Add error handling for rate limits

Example integration:

```typescript
export async function evaluateProjectQuality(
  githubStats: GitHubStats
): Promise<AIEvaluation> {
  // Try Gemini first, fall back to mock
  if (process.env.GEMINI_API_KEY) {
    try {
      return await evaluateProjectQualityWithGemini(
        githubStats.username,
        githubStats.repos
      )
    } catch (error) {
      console.warn('Gemini API failed, using mock:', error)
    }
  }
  
  // Fallback to mock evaluation
  return getMockEvaluation(githubStats)
}
```

## API Limits & Pricing

### Free Tier
- **60 requests per minute (RPM)**
- **1,500 requests per day (RPD)**
- Perfect for development and small-scale testing

### Paid Tier (Pay-as-you-go)
- $0.00025 per 1K characters input
- $0.0005 per 1K characters output
- ~$0.01 per 1,000 evaluations
- Much cheaper than OpenAI

**For 1,000 users per day:**
- Free tier: $0
- Paid tier: ~$10/month

## Rate Limiting Best Practices

To avoid hitting rate limits:

1. **Cache Results**
   - DevAura already caches DAI scores for 3 hours
   - AI evaluations are also cached

2. **Batch Requests**
   - Don't evaluate every user immediately
   - Use background jobs for bulk updates

3. **Implement Retry Logic**
   ```typescript
   async function retryWithBackoff(fn, retries = 3) {
     for (let i = 0; i < retries; i++) {
       try {
         return await fn()
       } catch (error) {
         if (i === retries - 1) throw error
         await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)))
       }
     }
   }
   ```

## Monitoring Usage

Check your API usage:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click on your API key
3. View usage statistics and quotas

## Troubleshooting

### "API key not valid"

**Problem:** `400 API_KEY_INVALID`

**Solutions:**
1. Double-check your API key in `.env`
2. Make sure there are no extra spaces
3. Regenerate the API key if needed

### "Resource exhausted"

**Problem:** `429 RESOURCE_EXHAUSTED`

**Solutions:**
1. You've hit the rate limit
2. Wait 1 minute and try again
3. Implement request queuing
4. Upgrade to paid tier

### "Safety settings blocked"

**Problem:** Content blocked by safety filters

**Solutions:**
1. Adjust safety settings in the API call
2. Rephrase the prompt to be less triggering
3. This shouldn't happen with code analysis

## Example Prompt

Here's what DevAura sends to Gemini:

```
Analyze this developer's GitHub profile and rate the following (0-100):
1. Project Originality: How unique and innovative are their projects?
2. Documentation Quality: How well-documented are their repositories?
3. Code Quality: Based on repo structure, naming, and organization
4. Innovation Score: Overall technical innovation and creativity

GitHub Username: username
Repos: [repo data...]

Respond in JSON format: { "projectOriginality": 85, "documentationQuality": 90, ... }
```

## Advanced Configuration

### Custom Temperature

Adjust creativity vs consistency:

```typescript
generationConfig: {
  temperature: 0.4,  // Lower = more consistent (0.0 - 1.0)
  topK: 32,
  topP: 1,
  maxOutputTokens: 512,
}
```

### Safety Settings

For code analysis, you might want to disable some filters:

```typescript
safetySettings: [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_NONE"
  }
]
```

## Cost Comparison

| Service | Free Tier | Cost per 1K evaluations | Notes |
|---------|-----------|------------------------|-------|
| **Gemini** | 60 RPM, 1.5K RPD | ~$0.01 | ✅ Best value |
| OpenAI GPT-4 | None | ~$3.00 | Expensive |
| OpenAI GPT-3.5 | None | ~$0.20 | Moderate |
| Claude | Limited | ~$0.80 | Good quality |

## Next Steps

1. ✅ Get your Gemini API key
2. ✅ Add to `.env` file
3. ✅ Test with a simple request
4. ⏳ Uncomment Gemini integration in code (optional)
5. ⏳ Deploy to production

**Current Status:** DevAura works great with mock AI evaluation. Adding Gemini is optional but recommended for more accurate code quality scores!

---

**Resources:**
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Docs](https://ai.google.dev/tutorials/rest_quickstart)
- [Pricing](https://ai.google.dev/pricing)
