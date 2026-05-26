/**
 * WorkerLeaseService
 *
 * Responsibility:
 * Provide deterministic distributed worker ownership.
 *
 * Owns:
 * - projection lease orchestration
 * - worker ownership coordination
 * - lease-aware runtime progression
 * - runtime ownership semantics
 *
 * Does NOT Own:
 * - SQL persistence
 * - lease mutation storage
 * - projection mutation
 * - checkpoint progression
 */

import { randomUUID }
from "crypto";

import {
  workerLeaseRepository,
} from "@phantombot/database";

export class WorkerLeaseService {
  readonly workerId =
    randomUUID();

  async acquireLease(
    projectionName: string
  ): Promise<boolean> {
    return workerLeaseRepository
      .acquireLease({
        projectionName,
        workerId: this.workerId,
      });
  }

  async renewLease(
    projectionName: string
  ): Promise<boolean> {
    return workerLeaseRepository
      .renewLease({
        projectionName,
        workerId: this.workerId,
      });
  }

  async releaseLease(
    projectionName: string
  ): Promise<void> {
    await workerLeaseRepository
      .releaseLease({
        projectionName,
        workerId: this.workerId,
      });
  }
}

export const workerLeaseService =
  new WorkerLeaseService();