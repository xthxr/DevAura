import { StackOverflowStats } from '@/types'

/**
 * Mock Stack Overflow data generator
 * In production, this would use Stack Exchange API
 */
export async function fetchStackOverflowStats(username: string): Promise<StackOverflowStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  // Generate consistent mock data based on username hash
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const seed = hash % 10000

  const reputation = seed * 10 + (hash % 5000)
  const goldBadges = Math.floor(reputation / 3000)
  const silverBadges = Math.floor(reputation / 1000)
  const bronzeBadges = Math.floor(reputation / 300)
  const answers = Math.floor((seed % 100) * 2)
  const questions = Math.floor(seed % 50)

  return {
    userId: `SO-${hash}`,
    reputation,
    badges: {
      gold: goldBadges,
      silver: silverBadges,
      bronze: bronzeBadges,
    },
    answers,
    questions,
  }
}
