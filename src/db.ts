import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const createPool = () =>
  new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: JSON.parse(process.env.POSTGRES_SSL || "true"),
  });

export const createAuthPool = () =>
  new Promise<Pool>((resolve, reject) => {
    const authPool = createPool();
    console.log("    >   Creating auth pool");
    authPool.query("SET search_path TO auth;", (err) => {
      if (err) {
        console.error("    >   Setting search_path: Error", err);
        reject(err);
      } else {
        console.log("    >   Setting search_path: Success");
        resolve(authPool);
      }
    });
  });

const prismaPool = createPool();
const adapter = new PrismaPg(prismaPool);
export const prisma = new PrismaClient({ adapter });
