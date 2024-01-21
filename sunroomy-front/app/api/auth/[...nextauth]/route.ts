import jwt from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/sign-in",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        if (res.status === 200) {
          const user = await res.json();
          const decodedToken = jwt.decode(user.token);

          if (
            decodedToken &&
            typeof decodedToken === "object" &&
            "email" in decodedToken
          ) {
            const email = decodedToken.email;
            user.email = email; // Add the email to the user object
            user.token = user.token;
          }

          return user;
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/auth/signin",
    error: "/admin/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  debug: true,
  jwt: {
    maxAge: 3600,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
