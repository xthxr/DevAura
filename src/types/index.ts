export interface GitHubStats {
  username: string
  followers: number
  publicRepos: number
  totalStars: number
  totalCommits: number
  contributions: number
  topLanguages: Record<string, number>
  repoQualityScore: number
}

export interface LeetCodeStats {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  rating: number
  ranking: number
}

export interface StackOverflowStats {
  userId: string
  reputation: number
  badges: {
    gold: number
    silver: number
    bronze: number
  }
  answers: number
  questions: number
}

export interface AIEvaluation {
  projectOriginality: number
  documentationQuality: number
  codeQuality: number
  innovationScore: number
}

export interface DAIComponents {
  technical: number
  creativity: number
  social: number
  multiplier: number
}

export interface DAIScore {
  total: number
  components: DAIComponents
  breakdown: {
    github: GitHubStats
    leetcode: LeetCodeStats
    stackoverflow: StackOverflowStats
    ai: AIEvaluation
  }
  rank?: number
  percentile?: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  githubUsername: string
  daiScore: DAIScore
  lastUpdated: Date
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  image?: string
  githubUsername: string
  daiScore: number
  technicalScore: number
  creativityScore: number
  socialScore: number
}
