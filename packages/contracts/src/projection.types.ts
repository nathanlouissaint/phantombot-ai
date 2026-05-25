/**
 * projection.types.ts
 *
 * Responsibility:
 * Define projection-level mutation contracts that are independent from
 * runtime execution, checkpoint ownership, and event transport envelopes.
 *
 * Owns:
 * - projection mutation intent contracts
 * - projection reducer output contracts
 * - deterministic projection state mutation metadata
 *
 * Does NOT Own:
 * - projection event envelopes
 * - checkpoint progression contracts
 * - replay execution contracts
 * - worker execution contracts
 * - persistence implementation
 *
 * Critical Rules:
 * - projection contracts must remain deterministic
 * - projection contracts must not duplicate runtime contracts
 * - projection contracts must not own checkpoint or event envelope semantics
 * - runtime execution contracts belong in packages/contracts/src/runtime
 */

export type ProjectionMutationOperation =
  | "insert"
  | "update"
  | "delete"
  | "noop";

export interface ProjectionMutation {
  readonly operation: ProjectionMutationOperation;
  readonly target: string;
  readonly deterministicKey: string;
}

export interface ProjectionReducerResult<TState = unknown> {
  readonly state: TState;
  readonly mutations: readonly ProjectionMutation[];
}