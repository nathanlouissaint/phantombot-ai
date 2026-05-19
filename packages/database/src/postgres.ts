/**
 * postgres.ts
 *
 * Responsibility:
 * Establish PostgreSQL runtime connectivity.
 *
 * Owns:
 * - database connection management
 * - runtime database connectivity
 * - replay-safe persistence access
 *
 * Does NOT Own:
 * - business logic
 * - event orchestration
 * - projections
 * - worker execution
 *
 * Critical Rules:
 * - infrastructure owns persistence
 * - workers consume through infrastructure
 * - runtime connectivity must remain centralized
 */

import postgres from "postgres";

export const sql = postgres({
  host: process.env.POSTGRES_HOST || "localhost",

  port: Number(
    process.env.POSTGRES_PORT || 5433
  ),

  database:
    process.env.POSTGRES_DB || "phantom",

  username:
    process.env.POSTGRES_USER || "postgres",

  password:
    process.env.POSTGRES_PASSWORD || "postgres",
});