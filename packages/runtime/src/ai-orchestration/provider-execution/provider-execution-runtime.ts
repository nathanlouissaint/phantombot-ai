/**
 * provider-execution-runtime.ts
 *
 * Responsibility:
 * Construct deterministic provider execution decisions.
 *
 * Owns:
 * - execution authorization
 * - execution rejection
 * - replay-safe decision construction
 *
 * Does NOT Own:
 * - provider execution
 * - SDK imports
 * - model calls
 *
 * Critical Rules:
 * - runtime must remain deterministic
 * - runtime must remain replay-safe
 * - runtime must remain side-effect free
 */

import {
  validateProviderExecution,
} from "./provider-execution-validator";

import type {
  ProviderExecutionDecision,
  ProviderExecutionRequest,
} from "./provider-execution.types";

export function authorizeProviderExecution(
  request: ProviderExecutionRequest
): ProviderExecutionDecision {
  const result =
    validateProviderExecution(request);

  return {
    authorized: result.valid,
    violations: result.violations,
  };
}