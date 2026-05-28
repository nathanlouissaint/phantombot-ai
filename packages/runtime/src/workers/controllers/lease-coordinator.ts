/**
 * lease-coordinator.ts
 *
 * Responsibility:
 * Coordinate lease ownership and replay-safe lease loss handling.
 *
 * Owns:
 * - lease acquisition orchestration
 * - lifecycle-aware heartbeat ownership
 * - replay-safe lease-loss signaling
 * - graceful heartbeat cancellation
 * - lease release coordination
 *
 * Does NOT Own:
 * - replay execution
 * - checkpoint durability
 * - SQL persistence
 * - worker lifecycle authority
 *
 * Critical Rules:
 * - lease ownership must match replay ownership
 * - lease loss must interrupt replay deterministically
 * - heartbeat must never own execution semantics
 * - coordinator must never terminate processes
 */

import {
  startLeaseHeartbeat,
  LeaseHeartbeatController,
} from "../../leases/lease-heartbeat";

import {
  workerLeaseService,
} from "../../leases/worker-lease.service";

import {
  WorkerLifecycle,
} from "../state/worker-lifecycle";

export class LeaseCoordinator {
  private heartbeat:
    LeaseHeartbeatController | null = null;

  constructor(
    private readonly lifecycle:
      WorkerLifecycle,

    private readonly onLeaseLost:
      () => void
  ) {}

  async acquire(
    projectionName: string
  ): Promise<boolean> {
    this.lifecycle
      .transitionTo("ACQUIRING");

    const acquired =
      await workerLeaseService.acquireLease(
        projectionName
      );

    if (!acquired) {
      this.lifecycle
        .transitionTo("IDLE");

      return false;
    }

    this.lifecycle
      .transitionTo("ACTIVE");

    this.heartbeat =
      startLeaseHeartbeat({
        projectionName,

        onLeaseLost: async () => {
          if (
            !this.lifecycle.isShutdown()
          ) {
            this.lifecycle
              .transitionTo("LOST");
          }

          this.onLeaseLost();
        },
      });

    return true;
  }

  async drain(): Promise<void> {
    this.stopHeartbeat();
  }

  async release(
    projectionName: string
  ): Promise<void> {
    this.stopHeartbeat();

    await workerLeaseService.releaseLease(
      projectionName
    );
  }

  private stopHeartbeat(): void {
    if (!this.heartbeat) {
      return;
    }

    this.heartbeat.stop();

    this.heartbeat = null;
  }
}
