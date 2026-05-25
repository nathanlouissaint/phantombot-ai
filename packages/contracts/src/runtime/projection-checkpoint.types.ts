/**
 * projection-checkpoint.types.ts
 *
 * Responsibility:
 * Define checkpoint contracts for deterministic projection progression.
 *
 * Owns:
 * - projection checkpoint identity
 * - last processed event sequence
 * - checkpoint advancement semantics
 *
 * Does NOT Own:
 * - database queries
 * - transaction management
 * - checkpoint locking implementation
 * - worker lease ownership
 *
 * Critical Rules:
 * - checkpoints must only advance after successful deterministic mutation
 * - checkpoint progression must be atomic with projection writes
 * - replay must be able to reset and rebuild checkpoints safely
 */

import { DeterministicTimestamp } from "./deterministic-time.types";
import { ProjectionEventSequence } from "./projection-event.types";

export type ProjectionName = string & {
  readonly __brand: "ProjectionName";
};

export interface ProjectionCheckpoint {
  readonly projectionName: ProjectionName;
  readonly namespace: string;
  readonly lastProcessedSequence: ProjectionEventSequence;
  readonly updatedAt: DeterministicTimestamp;
}

export interface ProjectionCheckpointAdvance {
  readonly projectionName: ProjectionName;
  readonly namespace: string;
  readonly fromSequence: ProjectionEventSequence;
  readonly toSequence: ProjectionEventSequence;
}