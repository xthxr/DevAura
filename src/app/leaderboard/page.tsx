'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Trophy, Medal, Award, Loader2, Search } from 'lucide-react'
import { LeaderboardEntry } from '@/types'
import { formatNumber } from '@/lib/utils'

export default function LeaderboardPage() {
  const { data: session } = useSession()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/leaderboard')
      if (res.ok) {
        const data = await res.json()
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLeaderboard = leaderboard.filter(entry =>
    entry.name.toLowerCase().includes(search.toLowerCase()) ||
    entry.githubUsername.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <Navbar user={session?.user} />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 glow-text">
            🏆 Global Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">
            Top developers ranked by Developer Aura Index
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search developers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
          </div>
        )}

        {/* Leaderboard */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Top 3 Podium */}
            {filteredLeaderboard.length >= 3 && !search && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* 2nd Place */}
                <PodiumCard entry={filteredLeaderboard[1]} place={2} />
                {/* 1st Place */}
                <PodiumCard entry={filteredLeaderboard[0]} place={1} />
                {/* 3rd Place */}
                <PodiumCard entry={filteredLeaderboard[2]} place={3} />
              </div>
            )}

            {/* Rest of Leaderboard */}
            <div className="space-y-3">
              {filteredLeaderboard
                .slice(search ? 0 : 3)
                .map((entry, index) => (
                  <LeaderboardRow
                    key={entry.userId}
                    entry={entry}
                    index={search ? index : index + 3}
                  />
                ))}
            </div>

            {filteredLeaderboard.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                No developers found
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}

function PodiumCard({ entry, place }: { entry: LeaderboardEntry; place: number }) {
  const medals = {
    1: { icon: <Trophy className="w-12 h-12" />, color: '#FFD700', bg: 'from-yellow-500/20 to-yellow-600/20' },
    2: { icon: <Medal className="w-10 h-10" />, color: '#C0C0C0', bg: 'from-gray-400/20 to-gray-500/20' },
    3: { icon: <Award className="w-10 h-10" />, color: '#CD7F32', bg: 'from-orange-700/20 to-orange-800/20' },
  }

  const medal = medals[place as 1 | 2 | 3]
  const height = place === 1 ? 'h-72' : 'h-60'

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: place * 0.1 }}
      className={`relative ${place !== 1 ? 'mt-12' : ''}`}
    >
      <div className={`bg-gradient-to-b ${medal.bg} bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 ${height} flex flex-col items-center justify-between card-glow`}>
        <div className="text-center">
          <div className="mb-4" style={{ color: medal.color }}>
            {medal.icon}
          </div>
          {entry.image && (
            <img
              src={entry.image}
              alt={entry.name}
              className="w-20 h-20 rounded-full border-4 mb-3 mx-auto"
              style={{ borderColor: medal.color }}
            />
          )}
          <h3 className="font-bold text-lg mb-1">{entry.name}</h3>
          <p className="text-sm text-gray-400">@{entry.githubUsername}</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-1" style={{ color: medal.color }}>
            {entry.daiScore.toFixed(1)}
          </div>
          <div className="text-xs text-gray-400">DAI Score</div>
        </div>
      </div>
    </motion.div>
  )
}

function LeaderboardRow({ entry, index }: { entry: LeaderboardEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.02 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Rank & User */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="text-2xl font-bold text-gray-600 w-12 text-center">
            #{entry.rank}
          </div>
          {entry.image && (
            <img
              src={entry.image}
              alt={entry.name}
              className="w-12 h-12 rounded-full border-2 border-purple-500"
            />
          )}
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold truncate">{entry.name}</h4>
            <p className="text-sm text-gray-400 truncate">@{entry.githubUsername}</p>
          </div>
        </div>

        {/* Scores */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="text-center">
            <div className="text-blue-400 font-semibold">{entry.technicalScore.toFixed(0)}</div>
            <div className="text-xs text-gray-500">Tech</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-semibold">{entry.creativityScore.toFixed(0)}</div>
            <div className="text-xs text-gray-500">Creative</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-semibold">{entry.socialScore.toFixed(0)}</div>
            <div className="text-xs text-gray-500">Social</div>
          </div>
        </div>

        {/* Total Score */}
        <div className="text-right">
          <div className="text-3xl font-bold glow-text">
            {entry.daiScore.toFixed(1)}
          </div>
          <div className="text-xs text-gray-400">DAI</div>
        </div>
      </div>
    </motion.div>
  )
}
