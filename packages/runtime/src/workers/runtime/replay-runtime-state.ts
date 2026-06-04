/**
 * replay-runtime-state.ts
 *
 * Responsibility:
 * Own deterministic replay runtime execution state.
 *
 * Owns:
 * - replay runtime state
 * - interruption state
 * - transition enforcement
 * - runtime execution status
 *
 * Does NOT Own:
 * - replay execution logic
 * - checkpoint persistence
 * - lifecycle coordination
 * - recovery orchestration
 *
 * Critical Rules:
 * - invalid transitions must fail
 * - runtime state must remain deterministic
 * - interruption must remain observable
 * - terminal states must remain protected
 */

import {
  ReplayRuntimeState,
} from "./replay-runtime.types";

import {
  REPLAY_RUNTIME_TRANSITIONS,
} from "./replay-runtime-transition-map";

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
    const allowed =
      REPLAY_RUNTIME_TRANSITIONS[
        this.state
      ];

    if (
      !allowed.includes(
        nextState
      )
    ) {
      throw new Error(
        `[INVALID REPLAY TRANSITION]
from=${this.state}
to=${nextState}`
      );
    }

    this.state = nextState;
  }

  interrupt(): void {
    this.interrupted = true;
  }
}