import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import client from "./lib/mongodb";
import GitHub from "next-auth/providers/github";
// import { Adapter } from "next-auth/adapters";

if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
  throw new Error(
    "Missing environment variables for GitHub. Did you forget to add GITHUB_ID and GITHUB_SECRET to your .env file?"
  );
}

const authOptions: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        if (
          credentials.username === "Admin" &&
          credentials.password === "Admin"
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return { id: "1", name: credentials.username };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    updateAge: 24 * 60 * 60, // 24 hours
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
