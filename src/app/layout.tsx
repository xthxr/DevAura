import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevAura - Global Developer Ranking Platform',
  description: 'Calculate your Developer Aura Index (DAI) based on GitHub, LeetCode, and Stack Overflow activity',
  keywords: ['developer', 'ranking', 'github', 'leetcode', 'stackoverflow', 'coding', 'programming'],
  authors: [{ name: 'DevAura Team' }],
  openGraph: {
    title: 'DevAura - Global Developer Ranking Platform',
    description: 'Calculate your Developer Aura Index (DAI)',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
