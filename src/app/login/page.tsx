'use client'

import { signIn, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Github, Sparkles, Trophy, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't show login page if already authenticated
  if (status === 'authenticated') {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-10 left-10 animate-float" />
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700 card-glow">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center animate-glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold mb-2 glow-text">DevAura</h1>
            <p className="text-gray-300">
              Global Developer Ranking Platform
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <FeatureItem
              icon={<Trophy className="w-5 h-5" />}
              text="Calculate your Developer Aura Index"
              delay={0.3}
            />
            <FeatureItem
              icon={<TrendingUp className="w-5 h-5" />}
              text="Compete on global leaderboard"
              delay={0.4}
            />
            <FeatureItem
              icon={<Sparkles className="w-5 h-5" />}
              text="Track your coding journey"
              delay={0.5}
            />
          </div>

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-purple-500/50"
          >
            <Github className="w-6 h-6" />
            Sign in with GitHub
          </motion.button>

          <p className="text-center text-sm text-gray-400 mt-6">
            By signing in, you agree to sync your public GitHub data
          </p>
        </div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <StatCard label="Developers" value="10K+" />
          <StatCard label="Countries" value="150+" />
          <StatCard label="Rankings" value="Daily" />
        </motion.div>
      </motion.div>
    </div>
  )
}

function FeatureItem({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 text-gray-300"
    >
      <div className="text-purple-400">{icon}</div>
      <span>{text}</span>
    </motion.div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-3">
      <div className="text-2xl font-bold text-purple-400">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  )
}
