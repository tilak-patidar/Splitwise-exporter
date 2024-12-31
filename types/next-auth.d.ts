import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user?: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}