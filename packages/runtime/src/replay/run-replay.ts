/**
 * run-replay.ts
 *
 * Responsibility:
 * Execute deterministic replay rebuilding.
 *
 * Owns:
 * - replay orchestration
 * - namespace rebuilding
 * - replay execution lifecycle
 * - deterministic replay progression
 *
 * Does NOT Own:
 * - projection mutation logic
 * - checkpoint ownership
 * - runtime leases
 * - behavioral intelligence
 */

import "dotenv/config";

import { rebuildProjection }
from "./rebuild-projection";

async function runReplay() {
  const namespace =
    process.argv[2] ?? "replay";

  console.log(
    "[REPLAY START]"
  );

  await rebuildProjection({
    namespace,
  });

  console.log(
    "[REPLAY COMPLETE]"
  );

  process.exit(0);
}

runReplay();