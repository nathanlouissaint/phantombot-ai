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
 *
 * Does NOT Own:
 * - projection orchestration
 * - replay coordination
 * - checkpoint advancement
 */

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
}

export const behaviorSessionRepository =
  new BehaviorSessionRepository();
