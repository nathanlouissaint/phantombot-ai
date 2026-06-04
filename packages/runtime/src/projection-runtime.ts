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
 * - transactional projection orchestration
 * - deterministic event sequencing
 * - persistence-to-runtime contract translation
 *
 * Does NOT Own:
 * - SQL ownership
 * - transaction lifecycle ownership
 * - repository mutation semantics
 * - infrastructure orchestration
 * - postgres awareness
 *
 * Critical Rules:
 * - runtime must remain infrastructure-agnostic
 * - replay progression must remain deterministic
 * - event ordering must remain sequential
 * - runtime systems consume repositories only
 * - runtime must NEVER import postgres directly
 */

import {
  behaviorEventRepository,
  projectionCheckpointRepository,
  projectionIdempotencyRepository,
  runInTransaction,
  TransactionContext,
} from "@phantombot/database";

import {
  ProjectionEvent,
  ProjectionNamespace,
} from "@phantombot/contracts";

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
   */
  async loadCheckpoint(): Promise<number> {
    return projectionCheckpointRepository
      .loadCheckpoint({
        projectionName:
          this.projectionName,

        namespace:
          this.namespace,
      });
  }

  /**
   * loadEvents
   *
   * Responsibility:
   * Load ordered deterministic replay events.
   */
  async loadEvents<TPayload>(
    lastSequence: number,
    batchSize = 100
  ): Promise<
    ProjectionEvent<TPayload>[]
  > {
    return behaviorEventRepository
      .loadEvents<TPayload>({
        lastSequence,

        batchSize,
      });
  }

  /**
   * runTransaction
   *
   * Responsibility:
   * Execute deterministic replay transaction boundaries.
   */
  async runTransaction<T>(
    operation: (
      transaction: TransactionContext
    ) => Promise<T>
  ): Promise<T> {
    return runInTransaction(
      operation
    );
  }

  /**
   * hasEventBeenApplied
   *
   * Responsibility:
   * Verify deterministic replay idempotency state.
   */
  async hasEventBeenApplied({
    transaction,
    eventSequenceId,
  }: {
    transaction: TransactionContext;
    eventSequenceId: number;
  }): Promise<boolean> {
    return projectionIdempotencyRepository
      .hasEventBeenApplied({
        transaction,

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
   */
  async markEventApplied({
    transaction,
    eventSequenceId,
  }: {
    transaction: TransactionContext;
    eventSequenceId: number;
  }): Promise<void> {
    await projectionIdempotencyRepository
      .markEventApplied({
        transaction,

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
   */
  async updateCheckpoint({
    transaction,
    sequence,
  }: {
    transaction: TransactionContext;
    sequence: number;
  }): Promise<void> {
    await projectionCheckpointRepository
      .advanceCheckpoint({
        transaction,

        projectionName:
          this.projectionName,

        namespace:
          this.namespace,

        sequence,
      });
  }
}