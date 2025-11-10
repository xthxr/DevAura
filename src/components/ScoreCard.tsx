'use client'

import { motion } from 'framer-motion'
import { Trophy, Sparkles } from 'lucide-react'

interface ScoreCardProps {
  score: number
  grade: {
    grade: string
    tier: string
    color: string
  }
}

export function ScoreCard({ score, grade }: ScoreCardProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
      <div className="relative bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 card-glow">
        <div className="flex items-center justify-between flex-wrap gap-6">
          {/* Score Display */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-semibold text-gray-300">
                Developer Aura Index
              </h2>
            </div>
            <div className="flex items-baseline gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="text-7xl font-bold glow-text"
              >
                {score.toFixed(1)}
              </motion.div>
              <div className="text-2xl text-gray-400">/ 100</div>
            </div>
          </div>

          {/* Grade Badge */}
          <motion.div
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            className="relative"
          >
            <div
              className="w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 animate-glow"
              style={{ borderColor: grade.color, boxShadow: `0 0 20px ${grade.color}40` }}
            >
              <div
                className="text-4xl font-bold"
                style={{ color: grade.color }}
              >
                {grade.grade}
              </div>
              <div className="text-xs text-gray-400 mt-1">{grade.tier}</div>
            </div>
            <Sparkles
              className="absolute -top-2 -right-2 w-6 h-6 animate-pulse"
              style={{ color: grade.color }}
            />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
