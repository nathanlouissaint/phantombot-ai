/**
 * behavior-session.repository.ts
 *
 * Responsibility:
 * Own deterministic behavior session persistence.
 *
 * Owns:
 * - replay-safe session persistence
 * - namespace-aware session mutation
 * - deterministic session accumulation
 * - replay namespace reset persistence
 * - projection state query persistence
 *
 * Does NOT Own:
 * - projection orchestration
 * - replay coordination
 * - checkpoint advancement
 * - runtime lifecycle orchestration
 *
 * Critical Rules:
 * - repository owns all SQL mutation
 * - replay persistence must remain deterministic
 * - namespace isolation must remain explicit
 * - projection query semantics must remain centralized
 */

import {
  sql,
} from "../postgres";

import {
  TransactionContext,
} from "../transactions";

import {
  ProjectionNamespace,
} from "@phantombot/contracts";

export class BehaviorSessionRepository {
  async upsertSession({
    transaction,
    sessionId,
    shopId,
    occurredAt,
    namespace,
  }: {
    transaction: TransactionContext;
    sessionId: string;
    shopId: string;
    occurredAt: string;
    namespace: ProjectionNamespace;
  }): Promise<void> {
    await transaction.tx`
      INSERT INTO behavior_sessions (
        session_id,
        shop_id,
        started_at,
        last_activity_at,
        projection_namespace
      )

      VALUES (
        ${sessionId},
        ${shopId},
        ${occurredAt},
        ${occurredAt},
        ${namespace}
      )

      ON CONFLICT (
        projection_namespace,
        session_id
      )

      DO UPDATE SET
        last_activity_at =
          EXCLUDED.last_activity_at
    `;
  }

  async resetNamespaceProjectionState(
    namespace: ProjectionNamespace
  ): Promise<void> {
    await sql`
      DELETE FROM behavior_sessions

      WHERE projection_namespace =
        ${namespace}
    `;
  }

  async loadProjectionState(
    namespace: ProjectionNamespace
  ) {
    return sql`
      SELECT
        projection_namespace,
        session_id,
        shop_id,
        started_at,
        last_activity_at,
        event_count

      FROM behavior_sessions

      WHERE projection_namespace =
        ${namespace}

      ORDER BY session_id ASC
    `;
  }
}

export const behaviorSessionRepository =
  new BehaviorSessionRepository();