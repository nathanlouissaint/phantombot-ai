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
 *
 * Does NOT Own:
 * - projection mutation logic
 * - checkpoint ownership
 * - worker leases
 * - business intelligence
 *
 * Critical Rules:
 * - replay execution must remain deterministic
 * - replay ordering must remain sequential
 * - replay namespaces must remain isolated
 * - projection namespace ownership must remain explicit
 */

import { sql }
from "../../../database/src/postgres";

import { ProjectionRuntime }
from "../projection-runtime";

import {
  SessionProjection,
}
from "../projections/session/session.projection";

import {
  ProjectionNamespace,
}
from "../../../contracts/src/projection-namespace.types";

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
   * Reset namespace state.
   */
  await sql`
    DELETE FROM behavior_sessions

    WHERE projection_namespace =
      ${namespace}
  `;

  console.log(
    `[NAMESPACE RESET]
namespace=${namespace}`
  );

  /**
   * Create namespace-aware projection.
   */
  const projection =
    new SessionProjection({
      namespace,
    });

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
      await runtime.loadEvents(
        checkpoint,
        500
      );

    if (events.length === 0) {
      break;
    }

    for (const event of events) {
      await sql.begin(
        async (tx: any) => {
          await projection.process(
            tx,
            event
          );
        }
      );

      checkpoint =
        event.sequence_id;
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