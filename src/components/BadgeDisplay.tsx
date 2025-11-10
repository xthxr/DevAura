'use client'

import { motion } from 'framer-motion'
import { Medal, Zap } from 'lucide-react'

interface BadgeDisplayProps {
  grade: {
    grade: string
    tier: string
    color: string
  }
  score: number
}

export function BadgeDisplay({ grade, score }: BadgeDisplayProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full flex flex-col items-center justify-center">
      <h3 className="text-xl font-semibold mb-6">Your Achievement</h3>
      
      {/* Animated Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="relative mb-6"
      >
        <div
          className="w-48 h-48 rounded-full flex flex-col items-center justify-center border-8 animate-glow relative overflow-hidden"
          style={{
            borderColor: grade.color,
            background: `radial-gradient(circle, ${grade.color}20 0%, transparent 70%)`,
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-50"
            style={{ background: grade.color }}
          />
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <Medal className="w-16 h-16 mx-auto mb-2" style={{ color: grade.color }} />
            <div className="text-5xl font-bold" style={{ color: grade.color }}>
              {grade.grade}
            </div>
            <div className="text-sm text-gray-300 mt-2">{grade.tier}</div>
          </div>
        </div>
        
        {/* Sparkle effects */}
        <Zap
          className="absolute -top-2 -left-2 w-8 h-8 animate-pulse"
          style={{ color: grade.color }}
        />
        <Zap
          className="absolute -bottom-2 -right-2 w-8 h-8 animate-pulse"
          style={{ color: grade.color, animationDelay: '0.5s' }}
        />
      </motion.div>

      {/* Tier Description */}
      <div className="text-center max-w-sm">
        <p className="text-gray-400 text-sm">
          {getTierDescription(grade.tier)}
        </p>
      </div>

      {/* Progress to next tier */}
      {score < 90 && (
        <div className="mt-6 w-full">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Next Tier</span>
            <span>{getNextTierScore(score) - score} points needed</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((score % 10) / 10) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full"
              style={{ background: grade.color }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function getTierDescription(tier: string): string {
  const descriptions: Record<string, string> = {
    Legendary: 'You are among the elite developers in the world! Outstanding achievements across all metrics.',
    Master: 'Exceptional skills and contributions. You are a true expert in your field.',
    Expert: 'Highly proficient with impressive achievements and consistent contributions.',
    Advanced: 'Strong technical skills with solid project portfolio and active engagement.',
    Intermediate: 'Growing developer with good foundation and regular contributions.',
    Developing: 'On the right path! Keep building and contributing to improve your aura.',
    Beginner: 'Just getting started. Focus on building projects and contributing to open source.',
  }
  return descriptions[tier] || ''
}

function getNextTierScore(currentScore: number): number {
  if (currentScore >= 90) return 100
  if (currentScore >= 80) return 90
  if (currentScore >= 70) return 80
  if (currentScore >= 60) return 70
  if (currentScore >= 50) return 60
  if (currentScore >= 40) return 50
  return 40
}
