/**
 * lease-coordinator.ts
 *
 * Responsibility:
 * Coordinate lease acquisition, heartbeat ownership, and graceful lease loss.
 *
 * Owns:
 * - lease acquisition orchestration
 * - lifecycle-controlled heartbeat startup
 * - lease-loss signaling
 * - heartbeat cancellation
 * - lease release orchestration
 *
 * Does NOT Own:
 * - SQL persistence
 * - replay execution
 * - projection mutation
 * - checkpoint advancement
 *
 * Critical Rules:
 * - coordinator must never call process.exit
 * - heartbeat must only run while worker is active
 * - lease loss must transition through lifecycle semantics
 */

import {
  startLeaseHeartbeat,
  LeaseHeartbeatController,
} from "../../leases/lease-heartbeat";

import { workerLeaseService } from "../../leases/worker-lease.service";
import { WorkerLifecycle } from "../state/worker-lifecycle";

export class LeaseCoordinator {
  private heartbeat: LeaseHeartbeatController | null = null;

  constructor(
    private readonly lifecycle: WorkerLifecycle
  ) {}

  async acquire(projectionName: string): Promise<boolean> {
    this.lifecycle.transitionTo("ACQUIRING");

    const acquired =
      await workerLeaseService.acquireLease(projectionName);

    if (!acquired) {
      this.lifecycle.transitionTo("IDLE");
      return false;
    }

    this.lifecycle.transitionTo("ACTIVE");

    this.heartbeat = startLeaseHeartbeat({
      projectionName,
      onLeaseLost: async () => {
        if (!this.lifecycle.isShutdown()) {
          this.lifecycle.transitionTo("LOST");
        }
      },
    });

    return true;
  }

  async drain(): Promise<void> {
    if (this.lifecycle.isActive()) {
      this.lifecycle.transitionTo("DRAINING");
    }

    this.stopHeartbeat();
  }

  async release(projectionName: string): Promise<void> {
    this.stopHeartbeat();

    await workerLeaseService.releaseLease(projectionName);

    if (!this.lifecycle.isShutdown()) {
      this.lifecycle.transitionTo("SHUTDOWN");
    }
  }

  private stopHeartbeat(): void {
    if (!this.heartbeat) {
      return;
    }

    this.heartbeat.stop();
    this.heartbeat = null;
  }
}