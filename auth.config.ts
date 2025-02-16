import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter"
import { createAuthPool } from "./src/db";
import type { Pool } from "pg"

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const pool = await createAuthPool();
  return createAuthConfig({ pool });
});

const createAuthConfig = ({ pool }: { pool: Pool }) => ({
  adapter: PostgresAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
})