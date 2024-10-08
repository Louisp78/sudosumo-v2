import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: "openid email profile",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // @ts-ignore cause it's in the official way to do it in the documentation
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          id_token: account.id_token,
        }
      } else if (Date.now() < token.expires_at * 1000) {
        return token
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token")
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!,
            }),
          })
          const tokensOrError = await response.json()
          if (!response.ok) throw tokensOrError
          // eslint-disable-next-line no-console
          console.info("Token has been refreshed !")
          const newTokens = tokensOrError as {
            access_token: string;
            id_token: string;
            expires_in: number;
            refresh_token?: string;
          }

          token.access_token = newTokens.access_token
          token.id_token = newTokens.id_token
          token.expires_at = Math.floor(
            Date.now() / 1000 + newTokens.expires_in
          )
          // Some providers only issue refresh tokens once, so preserve if we did not get a new one
          if (newTokens.refresh_token)
            token.refresh_token = newTokens.refresh_token
          return token
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Error refreshing access_token", error)
          token.error = "RefreshTokenError"
          return token
        }
      }
    },
    session: async ({ session, token }) => {
      session.error = token.error
      session.id_token = token.id_token
      return session
    },
    signIn: async () => {
      //Implement whitelist here
      return true
    },
  },
})

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    error?: "RefreshTokenError";
    id_token?: string;
  }
}

declare module "@auth/core/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    id_token?: string;
    error?: "RefreshTokenError";
  }
}
