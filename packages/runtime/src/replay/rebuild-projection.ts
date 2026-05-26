/**
 * rebuild-projection.ts
 *
 * Responsibility:
 * Execute deterministic projection rebuilding.
 *
 * Owns:
 * - replay projection rebuilding
 * - namespace reconstruction
 * - deterministic replay execution
 * - projection reset orchestration
 * - sequential replay progression
 * - transactional replay boundaries
 *
 * Does NOT Own:
 * - projection mutation logic
 * - SQL ownership
 * - transaction lifecycle ownership
 * - worker leases
 * - business intelligence
 * - orchestration coordination
 *
 * Critical Rules:
 * - replay execution must remain deterministic
 * - replay ordering must remain sequential
 * - replay namespaces must remain isolated
 * - projection namespace ownership must remain explicit
 * - replay systems must not generate side effects
 * - replay systems must consume canonical runtime contracts
 * - projection mutation + checkpoint advancement must remain atomic
 */

import {
  behaviorSessionRepository,
} from "@phantombot/database";

import { ProjectionRuntime }
from "../projection-runtime";

import {
  SessionProjection,
  SessionProjectionPayload,
}
from "../projections/session/session.projection";

import {
  ProjectionNamespace,
} from "@phantombot/contracts";

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
   * Create namespace-aware projection.
   */
  const projection =
    new SessionProjection(
      namespace
    );

  /**
   * Create deterministic runtime.
   */
  const runtime =
    new ProjectionRuntime({
      projectionName:
        projection.constructor.name,

      namespace,
    });

  /**
   * Sequential replay progression.
   */
  let checkpoint = 0;

  while (true) {
    const events =
      await runtime.loadEvents<
        SessionProjectionPayload
      >(
        checkpoint,
        500
      );

    if (events.length === 0) {
      break;
    }

    /**
     * Deterministic sequential replay.
     */
    for (const event of events) {
      await runtime.runTransaction(
        async (transaction) => {
          const alreadyApplied =
            await runtime.hasEventBeenApplied({
              transaction,

              eventSequenceId:
                event.sequence,
            });

          if (alreadyApplied) {
            return;
          }

          await projection.apply({
            transaction,

            event,
          });

          await runtime.markEventApplied({
            transaction,

            eventSequenceId:
              event.sequence,
          });

          await runtime.updateCheckpoint({
            transaction,

            sequence:
              event.sequence,
          });
        }
      );

      checkpoint =
        event.sequence;
    }

    console.log(
      `[REPLAY PROGRESSED]
checkpoint=${checkpoint}`
    );
  }

  console.log(
    `[REBUILD COMPLETE]
namespace=${namespace}`
  );
}