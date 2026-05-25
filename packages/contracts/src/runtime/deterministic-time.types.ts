/**
 * deterministic-time.types.ts
 *
 * Responsibility:
 * Define deterministic time primitives for replay-safe runtime systems.
 *
 * Owns:
 * - deterministic timestamp branding
 * - replay-safe timestamp semantics
 * - event-derived time contracts
 *
 * Does NOT Own:
 * - wall-clock generation
 * - Date.now usage
 * - runtime scheduling
 * - system clock access
 *
 * Critical Rules:
 * - deterministic systems must never generate timestamps internally
 * - timestamps must come from persisted events, checkpoints, or explicit runtime context
 * - replay execution must reproduce the same timestamp values
 */

export type DeterministicTimestamp = string & {
  readonly __brand: "DeterministicTimestamp";
};

export type DeterministicDateString = string & {
  readonly __brand: "DeterministicDateString";
};

export interface DeterministicTimeContext {
  readonly currentEventTimestamp: DeterministicTimestamp;
  readonly replayStartedAt?: DeterministicTimestamp;
}