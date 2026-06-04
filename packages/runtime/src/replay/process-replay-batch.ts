/**
 * process-replay-batch.ts
 *
 * Responsibility:
 * Execute a single deterministic replay batch.
 *
 * Owns:
 * - replay batch loading
 * - deterministic replay sequencing
 * - atomic replay progression
 * - replay continuation advancement
 *
 * Does NOT Own:
 * - replay runtime lifecycle
 * - interruption semantics
 * - worker coordination
 * - lease coordination
 *
 * Critical Rules:
 * - replay execution must remain sequential
 * - replay progression must remain deterministic
 * - checkpoint advancement must remain atomic
 * - replay execution must remain replay-safe
 */

import {
  ProjectionNamespace,
} from "@phantombot/contracts";

import {
  ProjectionRuntime,
} from "../projection-runtime";

import {
  SessionProjection,
  SessionProjectionPayload,
} from "../projections/session/session.projection";

export async function processReplayBatch({
  namespace,
  checkpoint,
}: {
  namespace: ProjectionNamespace;
  checkpoint: number;
}) {
  const projection =
    new SessionProjection(
      namespace
    );

  const runtime =
    new ProjectionRuntime({
      projectionName:
        projection.constructor.name,

      namespace,
    });

  const events =
    await runtime.loadEvents<
      SessionProjectionPayload
    >(
      checkpoint,
      500
    );

  if (events.length === 0) {
    return {
      checkpoint,
      completed: true,
    };
  }

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

  return {
    checkpoint,
    completed: false,
  };
}
