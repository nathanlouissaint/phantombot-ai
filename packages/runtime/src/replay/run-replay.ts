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

import {
  ProjectionNamespace,
}
from "../../../contracts/src/projection-namespace.types";

async function runReplay() {
  const namespaceArg =
    process.argv[2];

  if (!namespaceArg) {
    throw new Error(
      "Missing replay namespace argument."
    );
  }

  const namespace =
    namespaceArg as ProjectionNamespace;

  console.log(
    `[REPLAY START]
namespace=${namespace}`
  );

  await rebuildProjection({
    namespace,
  });

  console.log(
    `[REPLAY COMPLETE]
namespace=${namespace}`
  );

  process.exit(0);
}

runReplay().catch((error) => {
  console.error(
    "[REPLAY FAILURE]",
    error
  );

  process.exit(1);
});