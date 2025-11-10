import { GitHubStats, LeetCodeStats, StackOverflowStats, AIEvaluation, DAIComponents, DAIScore } from '@/types'

/**
 * DAI Formula: DAI = (T × 0.45) + (C × 0.35) + (S × 0.20) + M
 * 
 * Where:
 * T = Technical Score (0-100) - Based on GitHub activity, LeetCode performance
 * C = Creativity Score (0-100) - Based on project quality, AI evaluation
 * S = Social Score (0-100) - Based on followers, Stack Overflow reputation
 * M = Multiplier (bonus points) - Consistency and innovation bonuses
 */

const WEIGHTS = {
  TECHNICAL: 0.45,
  CREATIVITY: 0.35,
  SOCIAL: 0.20,
}

/**
 * Calculate Technical Score (T)
 * Factors: GitHub commits, repos, stars, LeetCode problems solved
 */
export function calculateTechnicalScore(
  github: GitHubStats,
  leetcode: LeetCodeStats
): number {
  // GitHub technical metrics (0-70)
  const commitScore = Math.min(50, github.totalCommits / 100) // Max 50 points for 5000+ commits
  const repoScore = Math.min(15, github.publicRepos / 2) // Max 15 points for 30+ repos
  const starScore = Math.min(25, github.totalStars / 20) // Max 25 points for 500+ stars
  const githubTotal = commitScore + repoScore + starScore

  // LeetCode contribution (0-30)
  const easyPoints = leetcode.easySolved * 0.1
  const mediumPoints = leetcode.mediumSolved * 0.3
  const hardPoints = leetcode.hardSolved * 0.6
  const leetcodeTotal = Math.min(30, easyPoints + mediumPoints + hardPoints)

  return Math.min(100, githubTotal + leetcodeTotal)
}

/**
 * Calculate Creativity Score (C)
 * Factors: Project originality, code quality, innovation, diversity
 */
export function calculateCreativityScore(
  github: GitHubStats,
  ai: AIEvaluation
): number {
  // Language diversity (0-20)
  const languageCount = Object.keys(github.topLanguages).length
  const diversityScore = Math.min(20, languageCount * 3)

  // AI evaluation metrics (0-60)
  const originalityScore = (ai.projectOriginality / 100) * 25
  const innovationScore = (ai.innovationScore / 100) * 20
  const codeQualityScore = (ai.codeQuality / 100) * 15

  // Repo quality (0-20)
  const qualityScore = Math.min(20, github.repoQualityScore / 5)

  return Math.min(
    100,
    diversityScore + originalityScore + innovationScore + codeQualityScore + qualityScore
  )
}

/**
 * Calculate Social Score (S)
 * Factors: GitHub followers, Stack Overflow reputation, contributions
 */
export function calculateSocialScore(
  github: GitHubStats,
  stackoverflow: StackOverflowStats
): number {
  // GitHub social metrics (0-50)
  const followerScore = Math.min(30, github.followers / 10) // Max 30 for 300+ followers
  const contributionScore = Math.min(20, github.contributions / 200) // Max 20 for 4000+ contributions

  // Stack Overflow metrics (0-50)
  const reputationScore = Math.min(35, stackoverflow.reputation / 1000) // Max 35 for 35k+ rep
  const answerScore = Math.min(15, stackoverflow.answers * 0.3) // Max 15 for 50+ answers

  return Math.min(100, followerScore + contributionScore + reputationScore + answerScore)
}

/**
 * Calculate Multipliers (M)
 * Bonus points for consistency and exceptional performance
 */
export function calculateMultipliers(
  github: GitHubStats,
  leetcode: LeetCodeStats,
  stackoverflow: StackOverflowStats,
  ai: AIEvaluation
): number {
  let multiplier = 0

  // Consistency bonus (up to +10)
  const hasRegularCommits = github.totalCommits > 500
  const hasMultipleProjects = github.publicRepos > 10
  const activeOnMultiplePlatforms = 
    github.totalStars > 0 && leetcode.totalSolved > 0 && stackoverflow.reputation > 100
  
  if (hasRegularCommits) multiplier += 3
  if (hasMultipleProjects) multiplier += 3
  if (activeOnMultiplePlatforms) multiplier += 4

  // Innovation bonus (up to +10)
  const highInnovation = ai.innovationScore > 70
  const highOriginality = ai.projectOriginality > 70
  const diverseSkills = Object.keys(github.topLanguages).length > 5
  
  if (highInnovation) multiplier += 4
  if (highOriginality) multiplier += 3
  if (diverseSkills) multiplier += 3

  // Excellence bonus (up to +10)
  const highStars = github.totalStars > 100
  const highReputation = stackoverflow.reputation > 5000
  const leetcodeExpert = leetcode.totalSolved > 200
  
  if (highStars) multiplier += 4
  if (highReputation) multiplier += 3
  if (leetcodeExpert) multiplier += 3

  return Math.min(30, multiplier) // Cap at 30 bonus points
}

/**
 * Calculate complete DAI score
 */
export function calculateDAI(
  github: GitHubStats,
  leetcode: LeetCodeStats,
  stackoverflow: StackOverflowStats,
  ai: AIEvaluation
): DAIScore {
  const technical = calculateTechnicalScore(github, leetcode)
  const creativity = calculateCreativityScore(github, ai)
  const social = calculateSocialScore(github, stackoverflow)
  const multiplier = calculateMultipliers(github, leetcode, stackoverflow, ai)

  // Apply weights and add multiplier
  const total = (technical * WEIGHTS.TECHNICAL) + 
                (creativity * WEIGHTS.CREATIVITY) + 
                (social * WEIGHTS.SOCIAL) + 
                multiplier

  const components: DAIComponents = {
    technical,
    creativity,
    social,
    multiplier,
  }

  return {
    total: Math.round(total * 10) / 10, // Round to 1 decimal
    components,
    breakdown: {
      github,
      leetcode,
      stackoverflow,
      ai,
    },
  }
}

/**
 * Get grade/tier based on DAI score
 */
export function getDAIGrade(score: number): {
  grade: string
  tier: string
  color: string
} {
  if (score >= 90) return { grade: 'S+', tier: 'Legendary', color: '#FFD700' }
  if (score >= 80) return { grade: 'S', tier: 'Master', color: '#FF6B6B' }
  if (score >= 70) return { grade: 'A', tier: 'Expert', color: '#A855F7' }
  if (score >= 60) return { grade: 'B', tier: 'Advanced', color: '#3B82F6' }
  if (score >= 50) return { grade: 'C', tier: 'Intermediate', color: '#10B981' }
  if (score >= 40) return { grade: 'D', tier: 'Developing', color: '#F59E0B' }
  return { grade: 'E', tier: 'Beginner', color: '#6B7280' }
}
