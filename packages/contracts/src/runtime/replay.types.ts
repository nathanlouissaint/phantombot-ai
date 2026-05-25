/**
 * replay.types.ts
 *
 * Responsibility:
 * Define replay execution contracts for deterministic rebuild systems.
 *
 * Owns:
 * - replay execution context
 * - replay mode semantics
 * - rebuild result contracts
 *
 * Does NOT Own:
 * - projection reset SQL
 * - event loading
 * - verification hashing
 * - dead-letter replay behavior
 *
 * Critical Rules:
 * - replay must be deterministic
 * - replay must not emit external side effects
 * - replay must rebuild state from persisted ordered events
 * - replay output must be verifiable against live execution
 */

import { RuntimeExecutionResult } from "./execution-result.types";
import { ProjectionName } from "./projection-checkpoint.types";
import { ProjectionEventSequence } from "./projection-event.types";

export type ReplayMode =
  | "verification"
  | "rebuild"
  | "backfill";

export interface ReplayExecutionContext {
  readonly mode: ReplayMode;
  readonly namespace: string;
  readonly projectionName: ProjectionName;
  readonly fromSequence: ProjectionEventSequence;
  readonly toSequence?: ProjectionEventSequence;
}

export interface ReplayExecutionResult extends RuntimeExecutionResult {
  readonly replayMode: ReplayMode;
  readonly projectionName: ProjectionName;
}