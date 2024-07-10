import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
          params: {
              scope: "openid email profile",
          },
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account?.accessToken) {
          token.accessToken = account.accessToken;
      }
      return token;
    },
  async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      return session;
  },
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }