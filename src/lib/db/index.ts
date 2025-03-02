import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";
import { env } from "process";
import * as schema from "@/lib/db/schema";

const pool = new Pool({
  host: env.DATABASE_HOST,
  port: parseInt(env.DATABASE_PORT || "5432"),
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  // ssl: env.NODE_ENV === "development" ? false : true,
});
const db = drizzle({ client: pool, schema });

export { db };
