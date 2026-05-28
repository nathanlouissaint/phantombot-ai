/**
 * replay-runtime.types.ts
 *
 * Responsibility:
 * Define canonical replay runtime execution contracts.
 *
 * Owns:
 * - replay execution state contracts
 * - replay continuation contracts
 * - replay interruption contracts
 *
 * Does NOT Own:
 * - replay execution logic
 * - checkpoint persistence
 * - lifecycle coordination
 * - lease coordination
 *
 * Critical Rules:
 * - replay execution must remain deterministic
 * - interruption boundaries must remain explicit
 * - continuation state must remain replay-safe
 */

export type ReplayRuntimeState =
  | "IDLE"
  | "RUNNING"
  | "DRAINING"
  | "INTERRUPTED"
  | "STOPPED";

export interface ReplayContinuation {
  checkpoint: number;
  completed: boolean;
}
