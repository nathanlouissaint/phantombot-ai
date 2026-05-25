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

import { sql }
from "@phantombot/database";

import {
  ProjectionEvent,
} from "@phantombot/contracts";

import {
  DEFAULT_PROJECTION_NAMESPACE,
  ProjectionNamespace,
} from "@phantombot/contracts";

/**
 * SessionProjectionPayload
 *
 * Responsibility:
 * Define deterministic behavioral session payload contracts.
 *
 * Owns:
 * - session identity payload structure
 * - replay-safe payload typing
 *
 * Does NOT Own:
 * - runtime event envelope metadata
 * - orchestration semantics
 * - projection execution semantics
 *
 * Critical Rules:
 * - payload contracts must remain deterministic
 * - payload contracts must remain replay-safe
 * - payloads must not contain runtime-owned metadata
 */
export interface SessionProjectionPayload {
  readonly sessionId: string;
}

export class SessionProjection {
  constructor(
    private namespace: ProjectionNamespace =
      DEFAULT_PROJECTION_NAMESPACE
  ) {}

  async apply(
    event: ProjectionEvent<SessionProjectionPayload>
  ): Promise<void> {
    const sessionId =
      event.payload.sessionId;

    await sql`
      INSERT INTO behavior_sessions (
        session_id,
        shop_id,
        started_at,
        last_activity_at,
        projection_namespace
      )

      VALUES (
        ${sessionId},
        ${event.shopId},
        ${event.occurredAt},
        ${event.occurredAt},
        ${this.namespace}
      )

      ON CONFLICT (
        session_id,
        projection_namespace
      )

      DO UPDATE SET
        last_activity_at =
          EXCLUDED.last_activity_at
    `;
  }
}