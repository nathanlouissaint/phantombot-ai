/**
 * execution-result.types.ts
 *
 * Responsibility:
 * Define canonical runtime execution result contracts.
 *
 * Owns:
 * - runtime success/failure result shapes
 * - deterministic mutation result contracts
 * - replay-safe execution outcome semantics
 *
 * Does NOT Own:
 * - logging
 * - persistence
 * - retry behavior
 * - dead-letter handling
 *
 * Critical Rules:
 * - execution results must be deterministic
 * - failures must be explicit
 * - runtime systems must not infer success from absence of errors
 */

export type RuntimeExecutionStatus =
  | "succeeded"
  | "failed"
  | "skipped"
  | "noop";

export interface RuntimeExecutionError {
  readonly code: string;
  readonly message: string;
  readonly retryable: boolean;
}

export interface RuntimeExecutionResult {
  readonly status: RuntimeExecutionStatus;
  readonly processedEventCount: number;
  readonly error?: RuntimeExecutionError;
}

export interface ProjectionMutationResult {
  readonly mutated: boolean;
  readonly affectedRows: number;
}