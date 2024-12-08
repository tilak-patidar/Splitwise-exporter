import NextAuth from "next-auth"
import type {NextAuthOptions} from "next-auth"
import type {OAuthConfig} from "next-auth/providers"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "splitwise",
      name: "Splitwise",
      type: "oauth",
      clientId: process.env.SPLITWISE_CLIENT_ID!,
      clientSecret: process.env.SPLITWISE_CLIENT_SECRET!,
      authorization: {
        url: "https://secure.splitwise.com/oauth/authorize",
        params: {
          response_type: "code",
        },
      },
      token: {
        url: "https://secure.splitwise.com/oauth/token",
        async request({client, provider, params}) {
          // Constructing the token request
          const response = await fetch(provider.token.url!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: provider.clientId,
              client_secret: provider.clientSecret,
              grant_type: 'authorization_code',
              code: params.code,
              redirect_uri: provider.callbackUrl,
            }),
          })

          const tokens = await response.json()
          return {tokens}
        }
      },
      userinfo: {
        url: "https://secure.splitwise.com/api/v3.0/get_current_user",
        async request({tokens}) {
          const response = await fetch("https://secure.splitwise.com/api/v3.0/get_current_user", {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          })
          return response.json()
        }
      },
      profile(profile) {
        return {
          id: profile.user.id,
          name: `${profile.user.first_name} ${profile.user.last_name}`,
          email: profile.user.email,
          image: null,
        }
      },
    } as OAuthConfig<any>
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session({session, token}) {
      session.accessToken = token.accessToken
      return session
    },
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}