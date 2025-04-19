import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter"
import { createAuthPool } from "@/db";
import type { Pool } from "pg"

// const MockProvider = {
//   id: "mock",
//   name: "Mock",
//   type: "oauth",
//   authorization: "https://mock.dev/authorize",
//   token: "https://mock.dev/token",
//   userinfo: "https://mock.dev/userinfo",
//   profile() {
//     return {
//       id: "test-user",
//       name: "Test User",
//       email: "test@example.com",
//     };
//   },
//   clientId: "mock-client-id",
//   clientSecret: "mock-client-secret",
// };

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const pool = await createAuthPool();
  return createAuthConfig({ pool });
});

const createAuthConfig = ({ pool }: { pool: Pool }) => ({
  adapter: PostgresAdapter(pool),
  providers: [
    // MockProvider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  // callbacks: {
  //   async session({ session }) {
  //     console.log(">>> process.env.NODE_ENV", process.env.NODE_ENV);
  //     console.log(">>> session", { session });
  //     if (process.env.NODE_ENV !== "production") {
  //       session.user = {
  //         id: 1,
  //         name: "Dev User",
  //         email: "dev@example.com",
  //         image: null,
  //       };
  //     }
  //     return session;
  //   },
  // },
})