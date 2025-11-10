import { kv } from '@vercel/kv'

// Check if KV is available
const isKVAvailable = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

// In-memory cache fallback for development
class MemoryCache {
  private cache = new Map<string, { value: any; expires: number }>()

  async get(key: string): Promise<any> {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }
    return item.value
  }

  async set(key: string, value: any, expiresInSeconds: number): Promise<void> {
    this.cache.set(key, {
      value,
      expires: Date.now() + expiresInSeconds * 1000,
    })
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key)
  }

  async mget(...keys: string[]): Promise<any[]> {
    return keys.map(key => {
      const item = this.cache.get(key)
      if (!item || Date.now() > item.expires) return null
      return item.value
    })
  }
}

const memoryCache = new MemoryCache()

const CACHE_TTL = {
  USER_SCORE: 60 * 60 * 3, // 3 hours
  LEADERBOARD: 60 * 30, // 30 minutes
  GITHUB_DATA: 60 * 60 * 2, // 2 hours
}

export interface CacheOptions {
  ttl?: number
  refresh?: boolean
}

/**
 * Cache user DAI score
 */
export async function cacheUserScore(
  userId: string,
  data: any,
  options: CacheOptions = {}
): Promise<void> {
  const key = `user:score:${userId}`
  const ttl = options.ttl || CACHE_TTL.USER_SCORE
  
  try {
    if (isKVAvailable) {
      await kv.set(key, data, { ex: ttl })
    } else {
      await memoryCache.set(key, data, ttl)
    }
  } catch (error) {
    console.warn('Cache set failed, using memory fallback:', error)
    await memoryCache.set(key, data, ttl)
  }
}

/**
 * Get cached user DAI score
 */
export async function getCachedUserScore(userId: string): Promise<any | null> {
  const key = `user:score:${userId}`
  
  try {
    if (isKVAvailable) {
      return await kv.get(key)
    } else {
      return await memoryCache.get(key)
    }
  } catch (error) {
    console.warn('Cache get failed, using memory fallback:', error)
    return await memoryCache.get(key)
  }
}

/**
 * Cache leaderboard data
 */
export async function cacheLeaderboard(
  data: any[],
  options: CacheOptions = {}
): Promise<void> {
  const key = 'leaderboard:global'
  const ttl = options.ttl || CACHE_TTL.LEADERBOARD
  
  try {
    if (isKVAvailable) {
      await kv.set(key, data, { ex: ttl })
    } else {
      await memoryCache.set(key, data, ttl)
    }
  } catch (error) {
    console.warn('Cache leaderboard failed:', error)
    await memoryCache.set(key, data, ttl)
  }
}

/**
 * Get cached leaderboard
 */
export async function getCachedLeaderboard(): Promise<any[] | null> {
  const key = 'leaderboard:global'
  
  try {
    if (isKVAvailable) {
      return await kv.get(key)
    } else {
      return await memoryCache.get(key)
    }
  } catch (error) {
    console.warn('Get cached leaderboard failed:', error)
    return await memoryCache.get(key)
  }
}

/**
 * Invalidate user cache
 */
export async function invalidateUserCache(userId: string): Promise<void> {
  const keys = [
    `user:score:${userId}`,
    'leaderboard:global',
  ]
  
  try {
    if (isKVAvailable) {
      await Promise.all(keys.map(key => kv.del(key)))
    } else {
      await Promise.all(keys.map(key => memoryCache.del(key)))
    }
  } catch (error) {
    console.warn('Invalidate cache failed:', error)
  }
}

/**
 * Cache GitHub data separately for faster access
 */
export async function cacheGitHubData(
  username: string,
  data: any
): Promise<void> {
  const key = `github:${username}`
  
  try {
    if (isKVAvailable) {
      await kv.set(key, data, { ex: CACHE_TTL.GITHUB_DATA })
    } else {
      await memoryCache.set(key, data, CACHE_TTL.GITHUB_DATA)
    }
  } catch (error) {
    console.warn('Cache GitHub data failed:', error)
    await memoryCache.set(key, data, CACHE_TTL.GITHUB_DATA)
  }
}

/**
 * Get cached GitHub data
 */
export async function getCachedGitHubData(username: string): Promise<any | null> {
  const key = `github:${username}`
  
  try {
    if (isKVAvailable) {
      return await kv.get(key)
    } else {
      return await memoryCache.get(key)
    }
  } catch (error) {
    console.warn('Get cached GitHub data failed:', error)
    return await memoryCache.get(key)
  }
}

/**
 * Batch get cached scores for multiple users
 */
export async function getBatchCachedScores(userIds: string[]): Promise<Record<string, any>> {
  const results: Record<string, any> = {}
  
  try {
    const keys = userIds.map(id => `user:score:${id}`)
    let values: any[]
    
    if (isKVAvailable) {
      values = await kv.mget(...keys)
    } else {
      values = await memoryCache.mget(...keys)
    }
    
    userIds.forEach((id, index) => {
      if (values[index]) {
        results[id] = values[index]
      }
    })
  } catch (error) {
    console.warn('Batch get cached scores failed:', error)
  }
  
  return results
}
