/**
 * execution-context.types.ts
 *
 * Responsibility:
 * Define deterministic execution context contracts.
 *
 * Owns:
 * - execution context shape
 * - runtime context shape
 *
 * Does NOT Own:
 * - model providers
 * - prompts
 * - execution
 *
 * Critical Rules:
 * - deterministic
 * - serializable
 * - replay safe
 */

export interface ExecutionContext {
  workflowId: string;

  strategyId: string;

  executionGroup: string;

  objective: string;
}/**
 * execution-context.types.ts
 *
 * Responsibility:
 * Define deterministic execution context contracts.
 *
 * Owns:
 * - execution context shape
 * - runtime context shape
 *
 * Does NOT Own:
 * - model providers
 * - prompts
 * - execution
 *
 * Critical Rules:
 * - deterministic
 * - serializable
 * - replay safe
 */

export interface ExecutionContext {
  workflowId: string;

  strategyId: string;

  executionGroup: string;

  objective: string;
}