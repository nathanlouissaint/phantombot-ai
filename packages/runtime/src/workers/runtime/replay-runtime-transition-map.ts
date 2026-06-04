/**
 * replay-runtime-transition-map.ts
 *
 * Responsibility:
 * Define valid replay runtime state transitions.
 *
 * Owns:
 * - runtime transition authority
 * - invalid transition prevention
 * - terminal state protection
 *
 * Does NOT Own:
 * - replay execution
 * - lifecycle coordination
 * - recovery orchestration
 * - checkpoint persistence
 *
 * Critical Rules:
 * - invalid transitions must be rejected
 * - terminal states must remain protected
 * - runtime state changes must be deterministic
 */

import {
  ReplayRuntimeState,
} from "./replay-runtime.types";

export const REPLAY_RUNTIME_TRANSITIONS:
Record<
  ReplayRuntimeState,
  ReplayRuntimeState[]
> = {
  IDLE: [
    "RUNNING",
  ],

  RUNNING: [
    "DRAINING",
    "STOPPED",
  ],

  DRAINING: [
    "INTERRUPTED",
    "STOPPED",
  ],

  INTERRUPTED: [
    "STOPPED",
  ],

  STOPPED: [],
};