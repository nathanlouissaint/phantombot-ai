/**
 * ProjectionIdempotencyService
 *
 * Responsibility:
 * Guarantees replay-safe projection idempotency.
 *
 * Owns:
 * - applied event existence checks
 * - projection duplication prevention
 * - replay-safe event application tracking
 * - deterministic projection enforcement
 *
 * Does NOT Own:
 * - projection mutation logic
 * - runtime orchestration
 * - checkpoint progression
 * - transaction ownership
 */

import { PoolClient } from "pg";

export class ProjectionIdempotencyService {
  async hasEventBeenApplied({
    client,
    projectionName,
    eventSequenceId,
  }: {
    client: PoolClient;
    projectionName: string;
    eventSequenceId: number;
  }): Promise<boolean> {
    const result = await client.query(
      `
      SELECT 1
      FROM projection_applied_events
      WHERE projection_name = $1
      AND event_sequence_id = $2
      LIMIT 1
      `,
      [projectionName, eventSequenceId]
    );

    return result.rowCount > 0;
  }

  async markEventApplied({
    client,
    projectionName,
    eventSequenceId,
  }: {
    client: PoolClient;
    projectionName: string;
    eventSequenceId: number;
  }): Promise<void> {
    await client.query(
      `
      INSERT INTO projection_applied_events (
        projection_name,
        event_sequence_id
      )
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      `,
      [projectionName, eventSequenceId]
    );
  }
}

export const projectionIdempotencyService =
  new ProjectionIdempotencyService();