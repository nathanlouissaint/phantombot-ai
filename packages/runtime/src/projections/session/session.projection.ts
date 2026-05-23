/**
 * session.projection.ts
 *
 * Responsibility:
 * Provide deterministic behavioral session projection mutation.
 *
 * Owns:
 * - session projection state mutation
 * - deterministic session accumulation
 * - replay-safe behavioral aggregation
 * - namespace-aware projection persistence
 *
 * Does NOT Own:
 * - runtime orchestration
 * - checkpoint advancement
 * - lease ownership
 * - replay coordination
 * - business intelligence systems
 *
 * Critical Rules:
 * - projection mutations must remain deterministic
 * - projection logic must remain side-effect free
 * - projection writes must remain replay-safe
 * - projection namespace isolation must be enforced
 * - projections must NEVER generate wall-clock timestamps
 */

import {
  ProjectionEvent,
} from "../../../../contracts/src/projection.types";

import {
  DEFAULT_PROJECTION_NAMESPACE,
  ProjectionNamespace,
} from "../../../../contracts/src/projection-namespace.types";

export class SessionProjection {
  private namespace: ProjectionNamespace;

  constructor({
    namespace = DEFAULT_PROJECTION_NAMESPACE,
  }: {
    namespace?: ProjectionNamespace;
  } = {}) {
    this.namespace = namespace;
  }

  async process(
    tx: any,
    event: ProjectionEvent
  ) {
    const sessionId =
      event.session_id;

    await tx`
      INSERT INTO behavior_sessions (
        projection_namespace,
        session_id,
        shop_id,
        started_at,
        last_activity_at,
        event_count
      )

      VALUES (
        ${this.namespace},
        ${sessionId},
        ${event.shop_id},
        ${event.occurred_at},
        ${event.occurred_at},
        1
      )

      ON CONFLICT (
        projection_namespace,
        session_id
      )

      DO UPDATE SET
        event_count =
          behavior_sessions.event_count + 1,

        last_activity_at =
          EXCLUDED.last_activity_at
    `;
  }
}

export const sessionProjection =
  new SessionProjection();