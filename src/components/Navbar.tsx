'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Sparkles, Trophy, LogOut, User } from 'lucide-react'

interface NavbarProps {
  user?: {
    name?: string | null
    image?: string | null
  }
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold glow-text">DevAura</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span className="hidden sm:inline">Leaderboard</span>
            </Link>

            {/* User Menu */}
            {user && (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="w-8 h-8 rounded-full border-2 border-purple-500"
                    />
                  )}
                  <span className="text-sm text-gray-300">{user.name}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
