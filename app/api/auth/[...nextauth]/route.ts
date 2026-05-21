import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Dummy authentication rules
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "password123"
        ) {
          // Dummy user payload returning a simulated token/profile
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            image: "mock-jwt-token-xyz789",
          };
        }
        // Authentication failed
        return null;
      },
    }),
  ],
  callbacks: {
    // 1. Triggered whenever a JWT token is created or updated
    async jwt({ token, user }) {
      if (user) {
        // Cast user payload properties straight over to the encrypted token object
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    // 2. Triggered whenever a session is checked on the client or server side
    async session({ session, token }) {
      if (session.user) {
        // Inject the secure token directly into the available user session container
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Points NextAuth to our custom UI route
  },
  session: {
    strategy: "jwt", // Automatically stores session token securely via cookies/session
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-local-dev-only",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
