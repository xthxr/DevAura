import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { invalidateUserCache } from '@/lib/cache'

/**
 * Cron job endpoint to refresh scores every 3 hours
 * Configure in vercel.json or use Vercel Cron Jobs
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all users who need refresh (last updated > 3 hours ago)
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000)
    
    const usersToRefresh = await prisma.developerScore.findMany({
      where: {
        lastCalculated: {
          lt: threeHoursAgo,
        },
      },
      take: 100, // Process 100 users at a time
      include: {
        user: {
          select: {
            id: true,
            githubUsername: true,
          },
        },
      },
    })

    // Trigger refresh for each user by invalidating cache
    const refreshPromises = usersToRefresh.map(async (score: any) => {
      await invalidateUserCache(score.user.id)
      
      // Log the refresh
      await prisma.refreshLog.create({
        data: {
          userId: score.user.id,
          status: 'in-progress',
        },
      })
    })

    await Promise.all(refreshPromises)

    return NextResponse.json({
      success: true,
      refreshed: usersToRefresh.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in cron refresh:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
