/**
 * runtime-worker.ts
 *
 * Responsibility:
 * Provide the canonical deterministic runtime worker coordinator.
 *
 * Owns:
 * - worker lifecycle orchestration
 * - lease acquisition coordination
 * - graceful drain handling
 * - shutdown coordination
 *
 * Does NOT Own:
 * - replay mutation logic
 * - projection mutation
 * - SQL persistence
 * - transaction lifecycle
 * - checkpoint semantics
 *
 * Critical Rules:
 * - worker must never call process.exit
 * - worker must coordinate through lifecycle state
 * - replay execution must remain separate from lease coordination
 * - distributed ownership must be explicit
 */

import { WorkerLifecycle } from "./state/worker-lifecycle";
import { LeaseCoordinator } from "./controllers/lease-coordinator";

export class RuntimeWorker {
  private readonly lifecycle =
    new WorkerLifecycle();

  private readonly leaseCoordinator =
    new LeaseCoordinator(this.lifecycle);

  constructor(
    private readonly projectionName: string
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

    return true;
  }

  async drain(): Promise<void> {
    await this.leaseCoordinator.drain();
  }

  async shutdown(): Promise<void> {
    await this.leaseCoordinator.release(
      this.projectionName
    );
  }
}