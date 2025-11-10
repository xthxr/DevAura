# API Documentation

## Authentication

All authenticated endpoints require a valid session token from NextAuth.

```typescript
// Client-side
import { useSession } from 'next-auth/react'

const { data: session } = useSession()
```

## Endpoints

### GET /api/user

Get or calculate the current user's DAI score.

**Authentication:** Required

**Query Parameters:**
- `refresh` (optional): Force recalculation if `true`

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://...",
    "githubUsername": "johndoe"
  },
  "daiScore": {
    "total": 75.5,
    "components": {
      "technical": 80.0,
      "creativity": 70.0,
      "social": 65.0,
      "multiplier": 15.0
    },
    "breakdown": {
      "github": { ... },
      "leetcode": { ... },
      "stackoverflow": { ... },
      "ai": { ... }
    }
  },
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

**Example:**
```typescript
const response = await fetch('/api/user?refresh=true')
const data = await response.json()
```

---

### GET /api/leaderboard

Get the global leaderboard rankings.

**Authentication:** Not required (public)

**Query Parameters:**
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 50, max: 100): Items per page
- `refresh` (optional): Bypass cache if `true`

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "user_id",
      "name": "Jane Smith",
      "image": "https://...",
      "githubUsername": "janesmith",
      "daiScore": 95.5,
      "technicalScore": 92.0,
      "creativityScore": 88.0,
      "socialScore": 85.0
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 50,
  "totalPages": 20
}
```

**Example:**
```typescript
const response = await fetch('/api/leaderboard?page=1&limit=50')
const data = await response.json()
```

---

### GET /api/cron/refresh

Trigger score refresh for stale users (internal use).

**Authentication:** Cron secret required

**Headers:**
```
Authorization: Bearer <CRON_SECRET>
```

**Response:**
```json
{
  "success": true,
  "refreshed": 100,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Example:**
```bash
curl -X GET \
  -H "Authorization: Bearer your_cron_secret" \
  https://your-app.vercel.app/api/cron/refresh
```

---

## Data Models

### User

```typescript
interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  githubUsername: string | null
  createdAt: Date
  updatedAt: Date
}
```

### DeveloperScore

```typescript
interface DeveloperScore {
  id: string
  userId: string
  daiScore: number
  technicalScore: number
  creativityScore: number
  socialScore: number
  multiplier: number
  githubStars: number
  githubRepos: number
  githubCommits: number
  githubFollowers: number
  githubContributions: number
  leetcodeSolved: number
  leetcodeRating: number
  stackOverflowReputation: number
  stackOverflowAnswers: number
  projectOriginality: number
  documentationQuality: number
  lastCalculated: Date
  calculationCount: number
  rank: number | null
  createdAt: Date
  updatedAt: Date
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 400 Bad Request
```json
{
  "error": "GitHub username not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

### GitHub API
- Authenticated: 5,000 requests/hour
- Unauthenticated: 60 requests/hour

### Vercel KV (Redis)
- Free tier: 256MB storage
- 10,000 commands/day

### Database
- PlanetScale free: 1 billion row reads/month
- Neon free: 100 hours compute/month

---

## Caching Strategy

### User Scores
- TTL: 3 hours
- Cache key: `user:score:{userId}`
- Invalidated on: Manual refresh, cron update

### Leaderboard
- TTL: 30 minutes
- Cache key: `leaderboard:global`
- Invalidated on: Any user score update

### GitHub Data
- TTL: 2 hours
- Cache key: `github:{username}`
- Invalidated on: Manual refresh

---

## Webhooks

Currently not implemented. Potential future integrations:

- GitHub webhooks for real-time updates
- Discord/Slack notifications
- Email alerts for rank changes

---

## SDK / Client Libraries

Currently, there's no official SDK. The API is simple REST and can be consumed directly:

```typescript
// Example client wrapper
class DevAuraClient {
  constructor(private baseUrl: string) {}

  async getUserScore(refresh = false) {
    const url = `${this.baseUrl}/api/user${refresh ? '?refresh=true' : ''}`
    const response = await fetch(url, {
      credentials: 'include' // Include cookies
    })
    return response.json()
  }

  async getLeaderboard(page = 1, limit = 50) {
    const url = `${this.baseUrl}/api/leaderboard?page=${page}&limit=${limit}`
    const response = await fetch(url)
    return response.json()
  }
}

// Usage
const client = new DevAuraClient('https://your-app.vercel.app')
const score = await client.getUserScore()
```

---

## Versioning

Current version: 1.0.0

The API is currently unversioned. Breaking changes will be communicated in release notes.

---

## Support

For API issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review error messages carefully
