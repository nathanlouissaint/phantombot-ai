/**
 * rebuild-projection.ts
 *
 * Responsibility:
 * Bootstrap deterministic replay rebuilding.
 *
 * Owns:
 * - namespace projection reset
 * - replay runtime bootstrap
 * - replay execution initialization
 *
 * Does NOT Own:
 * - replay execution loop
 * - replay interruption semantics
 * - checkpoint progression ownership
 * - lifecycle coordination
 * - lease coordination
 *
 * Critical Rules:
 * - replay execution lifetime must remain runtime-owned
 * - replay progression must remain deterministic
 * - replay execution must remain sequential
 * - replay orchestration must remain infrastructure-isolated
 */

import {
  behaviorSessionRepository,
} from "@phantombot/database";

import {
  ProjectionNamespace,
} from "@phantombot/contracts";

import {
  ReplayExecutionRuntime,
} from "../workers/runtime/replay-execution-runtime";

export async function rebuildProjection({
  namespace,
}: {
  namespace: ProjectionNamespace;
}) {
  console.log(
    `[REBUILD START]
namespace=${namespace}`
  );

  /**
   * Reset namespace-owned projection state.
   */
  await behaviorSessionRepository
    .resetNamespaceProjectionState(
      namespace
    );

  console.log(
    `[NAMESPACE RESET]
namespace=${namespace}`
  );

  /**
   * Create canonical replay runtime.
   */
  const replayRuntime =
    new ReplayExecutionRuntime();

  /**
   * Start deterministic replay execution.
   */
  await replayRuntime.start({
    namespace,
  });

  console.log(
    `[REBUILD COMPLETE]
namespace=${namespace}`
  );
}
