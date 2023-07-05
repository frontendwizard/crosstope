import NextAuth from 'next-auth'
import type { AppProviders } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || []

let useMockProvider = process.env.NODE_ENV === 'test'
const { GITHUB_CLIENT_ID, GITHUB_SECRET, NODE_ENV, APP_ENV } = process.env
if (
  (NODE_ENV !== 'production' || APP_ENV === 'test') &&
  (!GITHUB_CLIENT_ID || !GITHUB_SECRET)
) {
  console.log('⚠️ Using mocked GitHub auth correct credentials were not added')
  useMockProvider = true
}
const providers: AppProviders = []
if (useMockProvider) {
  providers.push(
    CredentialsProvider({
      id: 'github',
      name: 'Mocked GitHub',
      async authorize(credentials) {
        if (credentials) {
          const user = {
            id: credentials.name,
            name: credentials.name,
            email: credentials.name,
          }
          return user
        }
        return null
      },
      credentials: {
        name: { type: 'test' },
      },
    }),
  )
} else {
  if (!GITHUB_CLIENT_ID || !GITHUB_SECRET) {
    throw new Error('GITHUB_CLIENT_ID and GITHUB_SECRET must be set')
  }
  providers.push(
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: ADMIN_EMAILS.includes(profile.email) ? 'admin' : 'user',
        } as any
      },
    }),
  )
}
export default NextAuth({
  secret: process.env.SECRET,
  // Configure one or more authentication providers
  providers,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.accessToken
      }
      if (user) {
        // @ts-expect-error
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // @ts-expect-error
      session.accessToken = token.accessToken
      // @ts-expect-error
      session.user.role = token.role
      return session
    },
  },
})
