/**
 * projection-idempotency.repository.ts
 *
 * Responsibility:
 * Own deterministic replay idempotency persistence.
 *
 * Owns:
 * - applied event existence checks
 * - replay duplication prevention
 * - projection idempotency durability
 *
 * Does NOT Own:
 * - projection mutation logic
 * - runtime orchestration
 * - checkpoint progression
 */

import {
  TransactionContext,
} from "../transactions";

export class ProjectionIdempotencyRepository {
  async hasEventBeenApplied({
    transaction,
    projectionName,
    eventSequenceId,
  }: {
    transaction: TransactionContext;
    projectionName: string;
    eventSequenceId: number;
  }): Promise<boolean> {
    const result =
      await transaction.tx`
        SELECT 1

        FROM projection_applied_events

        WHERE projection_name =
          ${projectionName}

        AND event_sequence_id =
          ${eventSequenceId}

        LIMIT 1
      `;

    return result.length > 0;
  }

  async markEventApplied({
    transaction,
    projectionName,
    eventSequenceId,
  }: {
    transaction: TransactionContext;
    projectionName: string;
    eventSequenceId: number;
  }): Promise<void> {
    await transaction.tx`
      INSERT INTO projection_applied_events (
        projection_name,
        event_sequence_id
      )

      VALUES (
        ${projectionName},
        ${eventSequenceId}
      )

      ON CONFLICT DO NOTHING
    `;
  }
}

export const projectionIdempotencyRepository =
  new ProjectionIdempotencyRepository();
