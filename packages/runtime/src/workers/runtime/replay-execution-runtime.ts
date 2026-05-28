/**
 * replay-execution-runtime.ts
 *
 * Responsibility:
 * Provide canonical deterministic replay execution authority.
 *
 * Owns:
 * - replay execution lifecycle
 * - replay interruption semantics
 * - deterministic replay continuation
 * - replay drain coordination
 * - execution supervision
 *
 * Does NOT Own:
 * - projection mutation
 * - SQL persistence
 * - checkpoint durability
 * - worker leases
 * - worker lifecycle authority
 *
 * Critical Rules:
 * - replay execution must remain sequential
 * - interruption boundaries must remain deterministic
 * - replay progression must remain atomic
 * - replay continuation must remain replay-safe
 */

import {
  ProjectionNamespace,
} from "@phantombot/contracts";

import {
  processReplayBatch,
} from "../../replay/process-replay-batch";

import {
  ReplayContinuation,
} from "./replay-runtime.types";

import {
  ReplayRuntimeStateStore,
} from "./replay-runtime-state";

export class ReplayExecutionRuntime {
  private readonly runtimeState =
    new ReplayRuntimeStateStore();

  async start({
    namespace,
  }: {
    namespace: ProjectionNamespace;
  }): Promise<void> {
    this.runtimeState
      .transitionTo("RUNNING");

    let continuation: ReplayContinuation = {
      checkpoint: 0,
      completed: false,
    };

    while (
      !continuation.completed &&
      !this.runtimeState.isInterrupted()
    ) {
      continuation =
        await processReplayBatch({
          namespace,

          checkpoint:
            continuation.checkpoint,
        });
    }

    if (
      this.runtimeState.isInterrupted()
    ) {
      this.runtimeState
        .transitionTo("INTERRUPTED");

      return;
    }

    this.runtimeState
      .transitionTo("STOPPED");
  }

  interrupt(): void {
    this.runtimeState.interrupt();

    this.runtimeState
      .transitionTo("DRAINING");
  }

  getState() {
    return this.runtimeState.getState();
  }
}
