/**
 * replay-restart-coordinator.ts
 *
 * Responsibility:
 * Coordinate deterministic replay restart.
 *
 * Owns:
 * - recovery plan execution
 * - replay restart authority
 * - runtime restart coordination
 *
 * Does NOT Own:
 * - recovery planning
 * - replay progression
 * - checkpoint persistence
 *
 * Critical Rules:
 * - restart must follow recovery plan
 * - restart must remain deterministic
 */

import {
  ReplayExecutionRuntime,
} from "../workers/runtime/replay-execution-runtime";

import {
  ReplayRecoveryPlan,
} from "./replay-recovery.types";

export class ReplayRestartCoordinator {
  constructor(
    private readonly runtime:
      ReplayExecutionRuntime
  ) {}

  async restart(
    plan: ReplayRecoveryPlan
  ): Promise<void> {
    if (!plan.canResume) {
      throw new Error(
        `[REPLAY RECOVERY BLOCKED]
namespace=${plan.namespace}
reason=${plan.reason}`
      );
    }

    await this.runtime.start({
      namespace:
        plan.namespace,

      checkpoint:
        plan.checkpoint,
    });
  }
}