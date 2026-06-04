/**
 * worker-state.types.ts
 *
 * Responsibility:
 * Define canonical deterministic worker lifecycle states.
 *
 * Owns:
 * - worker lifecycle state contract
 *
 * Does NOT Own:
 * - lifecycle transition rules
 * - lease persistence
 * - replay execution
 */

export type WorkerState =
  | "IDLE"
  | "ACQUIRING"
  | "ACTIVE"
  | "DRAINING"
  | "LOST"
  | "SHUTDOWN";