import { LeetCodeStats } from '@/types'

/**
 * Mock LeetCode data generator
 * In production, this would integrate with LeetCode's API or scraping
 */
export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  // Generate consistent mock data based on username hash
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const seed = hash % 1000

  const easySolved = Math.floor((seed % 100) * 3)
  const mediumSolved = Math.floor((seed % 80) * 2)
  const hardSolved = Math.floor(seed % 50)
  const totalSolved = easySolved + mediumSolved + hardSolved

  return {
    username,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    rating: 1200 + (seed % 800), // Random rating between 1200-2000
    ranking: 10000 + (seed % 90000), // Random rank
  }
}
