import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter"
// import { Pool } from "@neondatabase/serverless"
import { Pool } from "pg"

// const pool = new Pool({ connectionString: process.env.POSTGRES_URL })
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: true
})


export const authConfig = {
  adapter: PostgresAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);