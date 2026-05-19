/**
 * replay-controller/index.ts
 *
 * Responsibility:
 * Deterministically rebuild projection state.
 *
 * Owns:
 * - projection resets
 * - checkpoint resets
 * - replay execution
 * - deterministic reconstruction
 *
 * Does NOT Own:
 * - business intelligence
 * - orchestration logic
 * - AI systems
 *
 * Critical Rules:
 * - replay must be deterministic
 * - replay rebuilds from immutable truth
 * - projections are disposable
 */

import "dotenv/config";

import { sql } from "../../../packages/database/src/postgres";

async function resetSessionProjection() {
  console.log(
    "[ReplayController] Resetting session projections..."
  );

  await sql`
    DELETE FROM behavior_sessions
  `;

  await sql`
    UPDATE projection_checkpoints
    SET last_processed_sequence = 0
    WHERE projection_name = 'session_projection'
  `;

  console.log(
    "[ReplayController] Session projection reset complete."
  );
}

async function main() {
  try {
    await resetSessionProjection();

    console.log(
      "[ReplayController] Replay reset complete."
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "[ReplayController] Replay failure:",
      error
    );

    process.exit(1);
  }
}

main();