/**
 * Responsibility:
 * Owns deterministic PostgreSQL client creation.
 *
 * Architectural rule:
 * Runtime systems consume database infrastructure only through
 * the @phantombot/database workspace boundary.
 */

import "dotenv/config";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required to initialize PostgreSQL client."
  );
}

export const sql = postgres(databaseUrl, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10
});

export type DatabaseClient = typeof sql;
