import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { fetchGitHubStats } from '@/services/github'
import { fetchLeetCodeStats } from '@/services/leetcode'
import { fetchStackOverflowStats } from '@/services/stackoverflow'
import { evaluateProjectQuality } from '@/services/ai-evaluation'
import { calculateDAI } from '@/lib/dai-calculator'
import { cacheUserScore, getCachedUserScore, invalidateUserCache } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const refresh = searchParams.get('refresh') === 'true'
    const userId = session.user.id

    // Check cache first (unless refresh is requested)
    if (!refresh) {
      const cached = await getCachedUserScore(userId)
      if (cached) {
        return NextResponse.json(cached)
      }
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { developerScore: true },
    })

    if (!user?.githubUsername) {
      return NextResponse.json(
        { error: 'GitHub username not found' },
        { status: 400 }
      )
    }

    // Fetch data from all sources
    const [githubStats, leetcodeStats, stackoverflowStats] = await Promise.all([
      fetchGitHubStats(user.githubUsername),
      fetchLeetCodeStats(user.githubUsername),
      fetchStackOverflowStats(user.githubUsername),
    ])

    // AI evaluation
    const aiEvaluation = await evaluateProjectQuality(githubStats)

    // Calculate DAI score
    const daiScore = calculateDAI(
      githubStats,
      leetcodeStats,
      stackoverflowStats,
      aiEvaluation
    )

    // Update or create developer score in database
    const scoreData = {
      daiScore: daiScore.total,
      technicalScore: daiScore.components.technical,
      creativityScore: daiScore.components.creativity,
      socialScore: daiScore.components.social,
      multiplier: daiScore.components.multiplier,
      githubStars: githubStats.totalStars,
      githubRepos: githubStats.publicRepos,
      githubCommits: githubStats.totalCommits,
      githubFollowers: githubStats.followers,
      githubContributions: githubStats.contributions,
      leetcodeSolved: leetcodeStats.totalSolved,
      leetcodeRating: leetcodeStats.rating,
      stackOverflowReputation: stackoverflowStats.reputation,
      stackOverflowAnswers: stackoverflowStats.answers,
      projectOriginality: aiEvaluation.projectOriginality,
      documentationQuality: aiEvaluation.documentationQuality,
      lastCalculated: new Date(),
    }

    await prisma.developerScore.upsert({
      where: { userId },
      create: { 
        userId, 
        ...scoreData,
        calculationCount: 1,
      },
      update: {
        ...scoreData,
        calculationCount: { increment: 1 },
      },
    })

    // Update rankings (simple approach - in production, use a more efficient method)
    await updateRankings()

    // Prepare response
    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        githubUsername: user.githubUsername,
      },
      daiScore,
      lastUpdated: new Date(),
    }

    // Cache the result
    await cacheUserScore(userId, response)

    // Invalidate leaderboard cache
    await invalidateUserCache(userId)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Update rankings for all users
 * This is a simplified version - in production, use a background job
 */
async function updateRankings() {
  try {
    const scores = await prisma.developerScore.findMany({
      orderBy: { daiScore: 'desc' },
      select: { id: true },
    })

    // Update ranks in batch
    const updates = scores.map((score: { id: string }, index: number) =>
      prisma.developerScore.update({
        where: { id: score.id },
        data: { rank: index + 1 },
      })
    )

    await Promise.all(updates)
  } catch (error) {
    console.error('Error updating rankings:', error)
  }
}
