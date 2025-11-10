'use client'

import { motion } from 'framer-motion'
import { Github, Code, Users, Star, GitCommit, Award } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

interface StatsGridProps {
  breakdown: any
}

export function StatsGrid({ breakdown }: StatsGridProps) {
  const { github, leetcode, stackoverflow, ai } = breakdown

  const stats = [
    {
      icon: <Star className="w-6 h-6" />,
      label: 'GitHub Stars',
      value: formatNumber(github.totalStars),
      color: 'text-yellow-500',
    },
    {
      icon: <GitCommit className="w-6 h-6" />,
      label: 'Total Commits',
      value: formatNumber(github.totalCommits),
      color: 'text-green-500',
    },
    {
      icon: <Code className="w-6 h-6" />,
      label: 'Public Repos',
      value: formatNumber(github.publicRepos),
      color: 'text-blue-500',
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Followers',
      value: formatNumber(github.followers),
      color: 'text-purple-500',
    },
    {
      icon: <Code className="w-6 h-6" />,
      label: 'LeetCode Solved',
      value: formatNumber(leetcode.totalSolved),
      color: 'text-orange-500',
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'SO Reputation',
      value: formatNumber(stackoverflow.reputation),
      color: 'text-red-500',
    },
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-6">Detailed Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Language Distribution */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Top Languages</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(github.topLanguages)
            .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
            .slice(0, 10)
            .map(([lang, count]: [string, any]) => (
              <LanguageTag key={lang} language={lang} count={count} />
            ))}
        </div>
      </div>

      {/* AI Evaluation Scores */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">AI Quality Assessment</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QualityBar label="Project Originality" score={ai.projectOriginality} />
          <QualityBar label="Documentation Quality" score={ai.documentationQuality} />
          <QualityBar label="Code Quality" score={ai.codeQuality} />
          <QualityBar label="Innovation Score" score={ai.innovationScore} />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
  index,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gray-900/50 rounded-lg p-4 text-center"
    >
      <div className={`${color} mb-2 flex justify-center`}>{icon}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </motion.div>
  )
}

function LanguageTag({ language, count }: { language: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full text-sm">
      <span className="w-2 h-2 rounded-full bg-purple-500" />
      <span>{language}</span>
      <span className="text-gray-400">({count})</span>
    </span>
  )
}

function QualityBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-300">{label}</span>
        <span className="text-purple-400 font-semibold">{score}/100</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        />
      </div>
    </div>
  )
}
