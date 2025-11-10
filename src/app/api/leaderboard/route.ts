import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cacheLeaderboard, getCachedLeaderboard } from '@/lib/cache'
import { LeaderboardEntry } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const refresh = searchParams.get('refresh') === 'true'

    // Validate pagination
    const validatedPage = Math.max(1, page)
    const validatedLimit = Math.min(100, Math.max(10, limit))
    const skip = (validatedPage - 1) * validatedLimit

    // Check cache first (unless refresh is requested)
    if (!refresh && validatedPage === 1) {
      const cached = await getCachedLeaderboard()
      if (cached) {
        return NextResponse.json({
          leaderboard: cached.slice(skip, skip + validatedLimit),
          total: cached.length,
          page: validatedPage,
          limit: validatedLimit,
          totalPages: Math.ceil(cached.length / validatedLimit),
        })
      }
    }

    // Fetch from database
    const [scores, total] = await Promise.all([
      prisma.developerScore.findMany({
        take: validatedLimit,
        skip,
        orderBy: { daiScore: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              githubUsername: true,
            },
          },
        },
      }),
      prisma.developerScore.count(),
    ])

    // Transform to leaderboard entries
    const leaderboard: LeaderboardEntry[] = scores.map((score: any, index: number) => ({
      rank: skip + index + 1,
      userId: score.user.id,
      name: score.user.name || 'Anonymous',
      image: score.user.image || undefined,
      githubUsername: score.user.githubUsername || '',
      daiScore: score.daiScore,
      technicalScore: score.technicalScore,
      creativityScore: score.creativityScore,
      socialScore: score.socialScore,
    }))

    // Cache the first page
    if (validatedPage === 1) {
      await cacheLeaderboard(leaderboard)
    }

    return NextResponse.json({
      leaderboard,
      total,
      page: validatedPage,
      limit: validatedLimit,
      totalPages: Math.ceil(total / validatedLimit),
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
