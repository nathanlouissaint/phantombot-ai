/**
 * projection-runtime.types.ts
 *
 * Responsibility:
 * Define canonical projection runtime execution contracts.
 *
 * Owns:
 * - projection runtime context
 * - projection handler interface
 * - deterministic projection execution shape
 *
 * Does NOT Own:
 * - database clients
 * - transport clients
 * - replay runners
 * - orchestration workflows
 *
 * Critical Rules:
 * - projection handlers must be deterministic
 * - projection handlers must not generate wall-clock timestamps
 * - projection handlers must not call AI systems
 * - projection handlers must not perform non-deterministic external side effects
 */

import { DeterministicTimeContext } from "./deterministic-time.types";
import { ProjectionMutationResult } from "./execution-result.types";
import { ProjectionCheckpoint } from "./projection-checkpoint.types";
import { ProjectionEvent } from "./projection-event.types";

export interface ProjectionRuntimeContext {
  readonly namespace: string;
  readonly time: DeterministicTimeContext;
  readonly checkpoint?: ProjectionCheckpoint;
  readonly replayMode: boolean;
}

export interface ProjectionHandler<TEvent extends ProjectionEvent = ProjectionEvent> {
  readonly name: string;

  apply(
    event: TEvent,
    context: ProjectionRuntimeContext
  ): Promise<ProjectionMutationResult>;
}