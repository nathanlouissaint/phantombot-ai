/**
 * projection-runtime.ts
 *
 * Responsibility:
 * Provide deterministic projection runtime execution.
 *
 * Owns:
 * - checkpoint loading
 * - ordered event loading
 * - replay-safe progression
 * - checkpoint advancement
 * - transactional projection execution
 * - replay-safe idempotency enforcement
 *
 * Does NOT Own:
 * - business logic
 * - orchestration
 * - projections
 * - intelligence systems
 *
 * Critical Rules:
 * - event ordering must remain deterministic
 * - replay progression must remain sequential
 * - workers advance only after successful processing
 * - idempotency checks must occur inside transaction boundaries
 * - projection mutation + checkpoint advancement must remain atomic
 */

import { PoolClient } from "pg";

import { projectionIdempotencyService } from "./idempotency/projection-idempotency.service";

import { sql } from "../../database/src/postgres";

import {
  ProjectionCheckpoint,
  ProjectionEvent,
} from "../../contracts/src/projection.types";

export class ProjectionRuntime {
  constructor(
    private projectionName: string
  ) {}

  async loadCheckpoint(): Promise<number> {
    const result =
      await sql<ProjectionCheckpoint[]>`
        SELECT *
        FROM projection_checkpoints
        WHERE projection_name =
          ${this.projectionName}
      `;

    if (result.length === 0) {
      await sql`
        INSERT INTO projection_checkpoints (
          projection_name,
          last_processed_sequence
        )
        VALUES (
          ${this.projectionName},
          0
        )
      `;

      return 0;
    }

    return result[0]
      .last_processed_sequence;
  }

  async loadEvents(
    lastSequence: number,
    batchSize = 100
  ): Promise<ProjectionEvent[]> {
    return sql<ProjectionEvent[]>`
      SELECT *
      FROM behavior_events
      WHERE sequence_id > ${lastSequence}
      ORDER BY sequence_id ASC
      LIMIT ${batchSize}
    `;
  }

  async hasEventBeenApplied({
    client,
    eventSequenceId,
  }: {
    client: PoolClient;
    eventSequenceId: number;
  }): Promise<boolean> {
    return projectionIdempotencyService
      .hasEventBeenApplied({
        client,
        projectionName:
          this.projectionName,
        eventSequenceId,
      });
  }

  async markEventApplied({
    client,
    eventSequenceId,
  }: {
    client: PoolClient;
    eventSequenceId: number;
  }): Promise<void> {
    await projectionIdempotencyService
      .markEventApplied({
        client,
        projectionName:
          this.projectionName,
        eventSequenceId,
      });
  }

  async updateCheckpoint(
    sequence: number
  ) {
    await sql`
      UPDATE projection_checkpoints

      SET
        last_processed_sequence =
          ${sequence},

        updated_at = NOW()

      WHERE projection_name =
        ${this.projectionName}
    `;
  }
}