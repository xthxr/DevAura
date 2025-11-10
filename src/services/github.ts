import { Octokit } from 'octokit'
import { GitHubStats } from '@/types'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  try {
    // Fetch user data
    const { data: user } = await octokit.rest.users.getByUsername({
      username,
    })

    // Fetch repositories
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      per_page: 100,
      sort: 'updated',
    })

    // Calculate total stars
    const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)

    // Calculate language distribution
    const topLanguages: Record<string, number> = {}
    repos.forEach((repo: any) => {
      if (repo.language) {
        topLanguages[repo.language] = (topLanguages[repo.language] || 0) + 1
      }
    })

    // Estimate total commits (approximate from recent activity)
    let totalCommits = 0
    try {
      const commitsPromises = repos.slice(0, 10).map(async (repo: any) => {
        try {
          const { data: commits } = await octokit.rest.repos.listCommits({
            owner: username,
            repo: repo.name,
            author: username,
            per_page: 1,
          })
          return commits.length
        } catch {
          return 0
        }
      })
      const commitCounts = await Promise.all(commitsPromises)
      totalCommits = commitCounts.reduce((sum: number, count: number) => sum + count, 0) * 10 // Rough estimate
    } catch {
      totalCommits = repos.length * 5 // Fallback estimate
    }

    // Calculate repo quality score based on stars, forks, and activity
    const repoQualityScore = repos.reduce((score: number, repo: any) => {
      const stars = repo.stargazers_count || 0
      const forks = repo.forks_count || 0
      const hasReadme = repo.has_wiki || repo.has_pages
      const recentlyUpdated = new Date(repo.updated_at).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
      
      return score + (stars * 2) + (forks * 3) + (hasReadme ? 5 : 0) + (recentlyUpdated ? 10 : 0)
    }, 0) / Math.max(repos.length, 1)

    // Get contribution activity
    let contributions = 0
    try {
      // This is an approximation - actual contribution graph requires scraping or GraphQL
      contributions = totalCommits + (repos.length * 10)
    } catch {
      contributions = repos.length * 15
    }

    return {
      username,
      followers: user.followers || 0,
      publicRepos: user.public_repos || 0,
      totalStars,
      totalCommits,
      contributions,
      topLanguages,
      repoQualityScore: Math.round(repoQualityScore),
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    // Return default stats on error
    return {
      username,
      followers: 0,
      publicRepos: 0,
      totalStars: 0,
      totalCommits: 0,
      contributions: 0,
      topLanguages: {},
      repoQualityScore: 0,
    }
  }
}

export async function getGitHubRateLimit() {
  try {
    const { data } = await octokit.rest.rateLimit.get()
    return data.rate
  } catch (error) {
    console.error('Error fetching rate limit:', error)
    return null
  }
}
