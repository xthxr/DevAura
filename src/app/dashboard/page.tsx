'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DAIScore } from '@/types'
import { getDAIGrade } from '@/lib/dai-calculator'
import { formatNumber, getRelativeTime } from '@/lib/utils'
import { Navbar } from '@/components/Navbar'
import { ScoreCard } from '@/components/ScoreCard'
import { RadarChart } from '@/components/RadarChart'
import { StatsGrid } from '@/components/StatsGrid'
import { BadgeDisplay } from '@/components/BadgeDisplay'
import { RefreshButton } from '@/components/RefreshButton'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchUserData()
    }
  }, [status])

  const fetchUserData = async (refresh = false) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/user${refresh ? '?refresh=true' : ''}`)
      if (res.ok) {
        const data = await res.json()
        setUserData(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchUserData(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Data Available</h2>
          <button
            onClick={() => fetchUserData(true)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
          >
            Calculate DAI Score
          </button>
        </div>
      </div>
    )
  }

  const { user, daiScore, lastUpdated } = userData
  const grade = getDAIGrade(daiScore.total)

  return (
    <div className="min-h-screen">
      <Navbar user={session?.user} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-400">
                Last updated: {getRelativeTime(lastUpdated)}
              </p>
            </div>
            <RefreshButton onClick={handleRefresh} loading={refreshing} />
          </div>
        </motion.div>

        {/* Main DAI Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ScoreCard score={daiScore.total} grade={grade} />
        </motion.div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ComponentCard
            title="Technical"
            score={daiScore.components.technical}
            color="from-blue-500 to-cyan-500"
            delay={0.2}
          />
          <ComponentCard
            title="Creativity"
            score={daiScore.components.creativity}
            color="from-purple-500 to-pink-500"
            delay={0.3}
          />
          <ComponentCard
            title="Social"
            score={daiScore.components.social}
            color="from-green-500 to-emerald-500"
            delay={0.4}
          />
        </div>

        {/* Radar Chart and Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <RadarChart data={daiScore.components} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <BadgeDisplay grade={grade} score={daiScore.total} />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <StatsGrid breakdown={daiScore.breakdown} />
        </motion.div>
      </main>
    </div>
  )
}

function ComponentCard({
  title,
  score,
  color,
  delay,
}: {
  title: string
  score: number
  color: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-300">{title}</h3>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-4xl font-bold mb-2">{score.toFixed(1)}</div>
          <div className="text-sm text-gray-400">/ 100</div>
        </div>
        <div className="w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-700"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${(score / 100) * 251.2} 251.2`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`${color.split(' ')[0].replace('from-', 'text-')}`} stopColor="currentColor" />
                <stop offset="100%" className={`${color.split(' ')[2].replace('to-', 'text-')}`} stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
