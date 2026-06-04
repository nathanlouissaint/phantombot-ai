/**
 * runtime-worker.ts
 *
 * Responsibility:
 * Provide canonical deterministic worker orchestration.
 *
 * Owns:
 * - lifecycle coordination
 * - lease coordination
 * - replay runtime coordination
 * - graceful drain orchestration
 * - deterministic shutdown sequencing
 *
 * Does NOT Own:
 * - SQL persistence
 * - projection mutation
 * - checkpoint durability
 * - replay transaction ownership
 *
 * Critical Rules:
 * - worker lifecycle must control execution reality
 * - replay execution must stop deterministically
 * - lease ownership must match replay ownership
 * - workers must never hard-exit
 */

import {
  ProjectionNamespace,
} from "@phantombot/contracts";

import {
  WorkerLifecycle,
} from "./state/worker-lifecycle";

import {
  LeaseCoordinator,
} from "./controllers/lease-coordinator";

import {
  ReplayExecutionRuntime,
} from "./runtime/replay-execution-runtime";

export class RuntimeWorker {
  private readonly lifecycle =
    new WorkerLifecycle();

  private readonly replayRuntime =
    new ReplayExecutionRuntime();

  private readonly leaseCoordinator =
    new LeaseCoordinator(
      this.lifecycle,

      () => {
        this.replayRuntime.interrupt();
      }
    );

  constructor(
    private readonly namespace:
      ProjectionNamespace,

    private readonly projectionName:
      string
  ) {}

  getState() {
    return this.lifecycle.getState();
  }

  async start(): Promise<boolean> {
    const acquired =
      await this.leaseCoordinator.acquire(
        this.projectionName
      );

    if (!acquired) {
      return false;
    }

    await this.replayRuntime.start({
      namespace: this.namespace,
    });

    return true;
  }

  async drain(): Promise<void> {
    if (
      !this.lifecycle.isDraining()
    ) {
      this.lifecycle
        .transitionTo("DRAINING");
    }

    this.replayRuntime.interrupt();

    await this.leaseCoordinator.drain();
  }

  async shutdown(): Promise<void> {
    await this.drain();

    await this.leaseCoordinator.release(
      this.projectionName
    );

    if (
      !this.lifecycle.isShutdown()
    ) {
      this.lifecycle
        .transitionTo("SHUTDOWN");
    }
  }
}
