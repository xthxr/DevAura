import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import type { Adapter } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        
        // Fetch GitHub username from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { githubUsername: true },
        })
        
        if (dbUser?.githubUsername) {
          session.user.githubUsername = dbUser.githubUsername
        }
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github' && profile) {
        try {
          // Use upsert to handle both new and existing users
          await prisma.user.upsert({
            where: { id: user.id },
            update: {
              githubUsername: (profile as any).login,
            },
            create: {
              id: user.id,
              email: user.email!,
              name: user.name,
              image: user.image,
              githubUsername: (profile as any).login,
            },
          })
        } catch (error) {
          console.error('Error updating GitHub username:', error)
          // Still allow sign-in even if update fails
        }
      }
      return true
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'database',
  },
}
