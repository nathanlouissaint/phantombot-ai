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
 * - deterministic event sequencing
 * - persistence-to-runtime contract translation
 *
 * Does NOT Own:
 * - business logic
 * - orchestration
 * - projections
 * - intelligence systems
 * - AI adaptation
 *
 * Critical Rules:
 * - event ordering must remain deterministic
 * - replay progression must remain sequential
 * - workers advance only after successful processing
 * - idempotency checks must occur inside transaction boundaries
 * - projection mutation + checkpoint advancement must remain atomic
 * - runtime contracts must remain canonical
 * - runtime systems must translate persistence schema to runtime contracts
 * - runtime contracts must remain strongly typed
 */

import { PoolClient }
from "pg";

import { sql }
from "@phantombot/database";

import {
  ProjectionCheckpoint,
  ProjectionEvent,
  ProjectionNamespace,
}
from "@phantombot/contracts";

import {
  projectionIdempotencyService,
}
from "./idempotency/projection-idempotency.service";

export class ProjectionRuntime {
  readonly projectionName: string;

  readonly namespace: ProjectionNamespace;

  constructor({
    projectionName,
    namespace,
  }: {
    projectionName: string;
    namespace: ProjectionNamespace;
  }) {
    this.projectionName =
      projectionName;

    this.namespace =
      namespace;
  }

  /**
   * loadCheckpoint
   *
   * Responsibility:
   * Load deterministic replay checkpoint state.
   *
   * Critical Rules:
   * - checkpoint ownership remains namespace-aware
   * - checkpoint progression must remain deterministic
   * - runtime contracts must remain canonical
   */
  async loadCheckpoint(): Promise<number> {
    const result =
      await sql<ProjectionCheckpoint[]>`
        SELECT
          projection_name as "projectionName",

          projection_namespace as "namespace",

          last_processed_sequence
            as "lastProcessedSequence",

          updated_at as "updatedAt"

        FROM projection_checkpoints

        WHERE projection_name =
          ${this.projectionName}

        AND projection_namespace =
          ${this.namespace}
      `;

    /**
     * Initialize deterministic checkpoint.
     */
    if (result.length === 0) {
      await sql`
        INSERT INTO projection_checkpoints (
          projection_name,
          projection_namespace,
          last_processed_sequence
        )

        VALUES (
          ${this.projectionName},
          ${this.namespace},
          0
        )
      `;

      return 0;
    }

    return result[0]
      .lastProcessedSequence;
  }

  /**
   * loadEvents
   *
   * Responsibility:
   * Load ordered deterministic replay events.
   *
   * Owns:
   * - runtime event envelope loading
   * - persistence schema translation
   * - strongly typed replay event contracts
   *
   * Critical Rules:
   * - event ordering must remain sequential
   * - persistence schema must not leak into runtime contracts
   * - replay contracts must remain strongly typed
   * - runtime event loading must remain deterministic
   */
  async loadEvents<TPayload>(
    lastSequence: number,
    batchSize = 100
  ): Promise<
    ProjectionEvent<TPayload>[]
  > {
    return sql<
      ProjectionEvent<TPayload>[]
    >`
      SELECT
        sequence_id as "sequence",

        event_id as "id",

        event_type as "type",

        shop_id as "shopId",

        occurred_at as "occurredAt",

        payload

      FROM behavior_events

      WHERE sequence_id >
        ${lastSequence}

      ORDER BY sequence_id ASC

      LIMIT ${batchSize}
    `;
  }

  /**
   * hasEventBeenApplied
   *
   * Responsibility:
   * Verify deterministic replay idempotency state.
   *
   * Critical Rules:
   * - idempotency checks must remain transactional
   * - replay progression must remain deterministic
   */
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

  /**
   * markEventApplied
   *
   * Responsibility:
   * Persist deterministic replay progression.
   *
   * Critical Rules:
   * - replay mutation tracking must remain atomic
   * - idempotency ownership must remain runtime-scoped
   */
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

  /**
   * updateCheckpoint
   *
   * Responsibility:
   * Advance deterministic replay checkpoint state.
   *
   * Critical Rules:
   * - checkpoint advancement must remain sequential
   * - namespace isolation must remain enforced
   * - runtime checkpoint ownership must remain canonical
   */
  async updateCheckpoint({
    client,
    sequence,
  }: {
    client: PoolClient;
    sequence: number;
  }): Promise<void> {
    await client.query(
      `
        UPDATE projection_checkpoints

        SET
          last_processed_sequence = $1,
          updated_at = NOW()

        WHERE projection_name = $2

        AND projection_namespace = $3
      `,
      [
        sequence,
        this.projectionName,
        this.namespace,
      ]
    );
  }
}