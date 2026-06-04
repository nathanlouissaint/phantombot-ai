/**
 * replay-recovery.ts
 *
 * Responsibility:
 * Build deterministic replay recovery plans.
 *
 * Owns:
 * - checkpoint discovery
 * - lease verification
 * - recovery planning
 * - restart checkpoint selection
 *
 * Does NOT Own:
 * - replay execution
 * - worker startup
 * - replay lifecycle
 * - lease acquisition
 *
 * Critical Rules:
 * - recovery must remain deterministic
 * - recovery must never mutate state
 * - recovery produces plans only
 */

import {
  ProjectionNamespace,
} from "@phantombot/contracts";

import {
  ReplayRecoveryPlan,
} from "./replay-recovery.types";

export class ReplayRecovery {
  async recover({
    namespace,
    loadCheckpoint,
    verifyLeaseOwnership,
  }: {
    namespace: ProjectionNamespace;

    loadCheckpoint: () => Promise<number | null>;

    verifyLeaseOwnership: () => Promise<boolean>;
  }): Promise<ReplayRecoveryPlan> {
    const ownsLease =
      await verifyLeaseOwnership();

    if (!ownsLease) {
      return {
        namespace,

        checkpoint: 0,

        canResume: false,

        reason:
          "LEASE_NOT_OWNED",
      };
    }

    const checkpoint =
      await loadCheckpoint();

    if (checkpoint === null) {
      return {
        namespace,

        checkpoint: 0,

        canResume: true,

        reason:
          "NO_CHECKPOINT",
      };
    }

    return {
      namespace,

      checkpoint,

      canResume: true,

      reason:
        "CHECKPOINT_FOUND",
    };
  }
}