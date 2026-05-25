/**
 * lease-heartbeat.ts
 *
 * Responsibility:
 * Maintain deterministic worker lease ownership.
 *
 * Owns:
 * - heartbeat scheduling
 * - lease renewal progression
 * - ownership continuity
 * - worker lease durability
 *
 * Does NOT Own:
 * - projection processing
 * - event mutation
 * - replay orchestration
 * - runtime coordination
 */

import { workerLeaseService }
from "./worker-lease.service";

export function startLeaseHeartbeat(
  projectionName: string
) {
  const interval = setInterval(
    async () => {
      const renewed =
        await workerLeaseService
          .renewLease(projectionName);

      if (!renewed) {
        console.error(
          `[LEASE LOST] ${projectionName}`
        );

        process.exit(1);
      }
    },
    10000
  );

  return interval;
}