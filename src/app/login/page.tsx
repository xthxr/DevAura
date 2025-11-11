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

          {/* Sign In Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-gray-500/50 border border-gray-700"
            >
              <Github className="w-6 h-6" />
              Sign in with GitHub
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </motion.button>
          </div>

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
