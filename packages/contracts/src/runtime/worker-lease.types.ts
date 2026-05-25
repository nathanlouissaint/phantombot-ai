/**
 * worker-lease.types.ts
 *
 * Responsibility:
 * Define worker lease contracts for distributed runtime coordination.
 *
 * Owns:
 * - worker lease identity
 * - lease ownership state
 * - heartbeat contract semantics
 *
 * Does NOT Own:
 * - lease acquisition SQL
 * - heartbeat timers
 * - worker process lifecycle
 * - orchestration execution
 *
 * Critical Rules:
 * - only a valid lease owner may advance checkpoints
 * - worker leases must expire safely
 * - lease ownership must be explicit and auditable
 */

import { DeterministicTimestamp } from "./deterministic-time.types";

export type WorkerId = string & {
  readonly __brand: "WorkerId";
};

export type WorkerLeaseName = string & {
  readonly __brand: "WorkerLeaseName";
};

export interface WorkerLease {
  readonly leaseName: WorkerLeaseName;
  readonly workerId: WorkerId;
  readonly acquiredAt: DeterministicTimestamp;
  readonly expiresAt: DeterministicTimestamp;
}

export interface WorkerHeartbeat {
  readonly leaseName: WorkerLeaseName;
  readonly workerId: WorkerId;
  readonly heartbeatAt: DeterministicTimestamp;
}