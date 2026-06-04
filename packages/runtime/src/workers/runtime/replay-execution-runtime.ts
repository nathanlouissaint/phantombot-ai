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
    checkpoint = 0,
    verifyLeaseOwnership,
  }: {
    namespace: ProjectionNamespace;

    checkpoint?: number;

    verifyLeaseOwnership?: () => Promise<boolean>;
  }): Promise<void> {
    this.runtimeState
      .transitionTo("RUNNING");

    let continuation: ReplayContinuation = {
      checkpoint,
      completed: false,
    };

    while (
      !continuation.completed &&
      !this.runtimeState.isInterrupted()
    ) {
      if (verifyLeaseOwnership) {
        const ownsLease =
          await verifyLeaseOwnership();

        if (!ownsLease) {
          this.interrupt();

          break;
        }
      }

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
    if (
      this.runtimeState.isInterrupted()
    ) {
      return;
    }

    this.runtimeState.interrupt();

    this.runtimeState
      .transitionTo("DRAINING");
  }

  getState() {
    return this.runtimeState.getState();
  }
}