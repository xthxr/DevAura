'use client'

import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

interface RefreshButtonProps {
  onClick: () => void
  loading: boolean
}

export function RefreshButton({ onClick, loading }: RefreshButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all"
    >
      <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
      <span>{loading ? 'Refreshing...' : 'Refresh Score'}</span>
    </motion.button>
  )
}
