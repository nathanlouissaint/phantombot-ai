/**
 * run-verification.ts
 *
 * Responsibility:
 * Execute deterministic replay verification.
 *
 * Owns:
 * - replay verification execution
 * - projection hash comparison
 * - replay correctness validation
 * - deterministic audit reporting
 *
 * Does NOT Own:
 * - replay mutation
 * - runtime orchestration
 * - projection persistence
 * - checkpoint progression
 */
import "dotenv/config";
import { projectionVerifier }
from "./projection-verifier";

async function runVerification() {
  console.log(
    "[REPLAY VERIFICATION START]"
  );

  const deterministic =
    await projectionVerifier
      .verifyReplayDeterminism();

  if (!deterministic) {
    console.error(
      "[REPLAY DRIFT DETECTED]"
    );

    process.exit(1);
  }

  console.log(
    "[REPLAY VERIFIED]"
  );

  process.exit(0);
}

runVerification();