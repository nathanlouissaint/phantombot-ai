/**
 * replay-runtime-state.ts
 *
 * Responsibility:
 * Own deterministic replay runtime execution state.
 *
 * Owns:
 * - replay runtime state
 * - interruption state
 * - drain state
 *
 * Does NOT Own:
 * - replay execution logic
 * - lifecycle coordination
 * - checkpoint persistence
 * - lease coordination
 *
 * Critical Rules:
 * - runtime state must remain explicit
 * - interruption must be observable
 * - state holder must not execute replay work
 */

import { ReplayRuntimeState }
from "./replay-runtime.types";

export class ReplayRuntimeStateStore {
  private state: ReplayRuntimeState =
    "IDLE";

  private interrupted = false;

  getState(): ReplayRuntimeState {
    return this.state;
  }

  isInterrupted(): boolean {
    return this.interrupted;
  }

  transitionTo(
    nextState: ReplayRuntimeState
  ): void {
    this.state = nextState;
  }

  interrupt(): void {
    this.interrupted = true;
  }
}
