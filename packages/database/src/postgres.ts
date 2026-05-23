/**
 * postgres.ts
 *
 * Responsibility:
 * Provide canonical PostgreSQL infrastructure ownership.
 *
 * Owns:
 * - database connection management
 * - infrastructure configuration
 * - runtime database connectivity
 * - fail-fast environment validation
 *
 * Does NOT Own:
 * - projection mutations
 * - runtime orchestration
 * - replay coordination
 * - business logic
 *
 * Critical Rules:
 * - infrastructure must fail loudly
 * - no implicit defaults
 * - no environment ambiguity
 */

import postgres from "postgres";

function required(
  value: string | undefined,
  name: string
): string {
  if (!value) {
    throw new Error(
      `[MISSING ENV] ${name}`
    );
  }

  return value;
}

const POSTGRES_HOST =
  required(
    process.env.POSTGRES_HOST,
    "POSTGRES_HOST"
  );

const POSTGRES_PORT =
  required(
    process.env.POSTGRES_PORT,
    "POSTGRES_PORT"
  );

const POSTGRES_USER =
  required(
    process.env.POSTGRES_USER,
    "POSTGRES_USER"
  );

const POSTGRES_PASSWORD =
  required(
    process.env.POSTGRES_PASSWORD,
    "POSTGRES_PASSWORD"
  );

const POSTGRES_DB =
  required(
    process.env.POSTGRES_DB,
    "POSTGRES_DB"
  );

export const sql = postgres({
  host: POSTGRES_HOST,

  port: Number(
    POSTGRES_PORT
  ),

  username:
    POSTGRES_USER,

  password:
    POSTGRES_PASSWORD,

  database:
    POSTGRES_DB,

  max: 20,

  idle_timeout: 20,

  connect_timeout: 10,
});