/**
 * worker-lifecycle.ts
 *
 * Responsibility:
 * Own deterministic worker lifecycle state transitions.
 *
 * Owns:
 * - worker state storage
 * - lifecycle transition enforcement
 * - shutdown/drain/lost-state semantics
 *
 * Does NOT Own:
 * - lease persistence
 * - heartbeat scheduling
 * - replay execution
 * - SQL mutation
 *
 * Critical Rules:
 * - lifecycle state is the authority for worker coordination
 * - invalid transitions must fail loudly
 * - workers must not hard-exit from lifecycle logic
 */

import { WorkerState } from "../types/worker-state.types";

const VALID_TRANSITIONS: Record<WorkerState, WorkerState[]> = {
  IDLE: ["ACQUIRING", "SHUTDOWN"],
  ACQUIRING: ["ACTIVE", "IDLE", "SHUTDOWN"],
  ACTIVE: ["DRAINING", "LOST", "SHUTDOWN"],
  DRAINING: ["SHUTDOWN", "LOST"],
  LOST: ["DRAINING", "SHUTDOWN"],
  SHUTDOWN: [],
};

export class WorkerLifecycle {
  private state: WorkerState = "IDLE";

  getState(): WorkerState {
    return this.state;
  }

  isActive(): boolean {
    return this.state === "ACTIVE";
  }

  isDraining(): boolean {
    return this.state === "DRAINING";
  }

  isLost(): boolean {
    return this.state === "LOST";
  }

  isShutdown(): boolean {
    return this.state === "SHUTDOWN";
  }

  transitionTo(nextState: WorkerState): void {
    const allowed = VALID_TRANSITIONS[this.state];

    if (!allowed.includes(nextState)) {
      throw new Error(
        `Invalid worker lifecycle transition: ${this.state} -> ${nextState}`
      );
    }

    this.state = nextState;
  }
}