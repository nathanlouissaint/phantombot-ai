/**
 * lease-heartbeat.ts
 *
 * Responsibility:
 * Provide lifecycle-controlled lease heartbeat execution.
 *
 * Owns:
 * - heartbeat interval scheduling
 * - lease renewal attempts
 * - semantic lease-loss notification
 * - heartbeat cancellation
 *
 * Does NOT Own:
 * - worker lifecycle transitions
 * - process termination
 * - replay execution
 * - projection mutation
 * - SQL persistence
 *
 * Critical Rules:
 * - heartbeat must NEVER call process.exit
 * - heartbeat must be stoppable
 * - lease loss must be reported semantically
 * - lifecycle coordinator decides what happens next
 */

import { workerLeaseService } from "./worker-lease.service";

export interface LeaseHeartbeatController {
  stop(): void;
}

export function startLeaseHeartbeat({
  projectionName,
  onLeaseLost,
  intervalMs = 10000,
}: {
  projectionName: string;
  onLeaseLost: () => Promise<void> | void;
  intervalMs?: number;
}): LeaseHeartbeatController {
  let stopped = false;

  const interval = setInterval(async () => {
    if (stopped) {
      return;
    }

    const renewed = await workerLeaseService.renewLease(
      projectionName
    );

    if (!renewed) {
      stopped = true;
      clearInterval(interval);

      await onLeaseLost();
    }
  }, intervalMs);

  return {
    stop() {
      stopped = true;
      clearInterval(interval);
    },
  };
}