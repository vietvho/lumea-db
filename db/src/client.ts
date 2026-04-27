import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const env = typeof process !== "undefined" ? process.env : {};
const connectionString = env["DATABASE_URL"];

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Disable prefetch as it's not supported for "Transaction" pool mode on Supabase
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });

export type Database = typeof db;
