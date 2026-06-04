/**
 * projection-checkpoint.repository.ts
 *
 * Responsibility:
 * Own deterministic replay checkpoint persistence.
 *
 * Owns:
 * - checkpoint loading
 * - checkpoint advancement
 * - namespace-aware checkpoint persistence
 * - replay-safe progression durability
 *
 * Does NOT Own:
 * - runtime orchestration
 * - projection mutation logic
 * - replay sequencing
 */

import {
  sql,
} from "../postgres";

import {
  TransactionContext,
} from "../transactions";

import {
  ProjectionCheckpoint,
  ProjectionNamespace,
} from "@phantombot/contracts";

export class ProjectionCheckpointRepository {
  async loadCheckpoint({
    projectionName,
    namespace,
  }: {
    projectionName: string;
    namespace: ProjectionNamespace;
  }): Promise<number> {
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
          ${projectionName}

        AND projection_namespace =
          ${namespace}
      `;

    if (result.length === 0) {
      await sql`
        INSERT INTO projection_checkpoints (
          projection_name,
          projection_namespace,
          last_processed_sequence
        )

        VALUES (
          ${projectionName},
          ${namespace},
          0
        )
      `;

      return 0;
    }

    return result[0]
      .lastProcessedSequence;
  }

  async advanceCheckpoint({
    transaction,
    projectionName,
    namespace,
    sequence,
  }: {
    transaction: TransactionContext;
    projectionName: string;
    namespace: ProjectionNamespace;
    sequence: number;
  }): Promise<void> {
    await transaction.tx`
      UPDATE projection_checkpoints

      SET
        last_processed_sequence =
          ${sequence},

        updated_at = NOW()

      WHERE projection_name =
        ${projectionName}

      AND projection_namespace =
        ${namespace}
    `;
  }
}

export const projectionCheckpointRepository =
  new ProjectionCheckpointRepository();
