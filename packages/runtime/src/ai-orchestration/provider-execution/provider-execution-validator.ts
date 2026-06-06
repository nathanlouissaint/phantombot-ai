/**
 * provider-execution-validator.ts
 *
 * Responsibility:
 * Validate execution authorization requests.
 *
 * Owns:
 * - execution validation
 * - authorization checks
 * - violation generation
 *
 * Does NOT Own:
 * - provider execution
 * - SDK imports
 * - prompt execution
 *
 * Critical Rules:
 * - validation must be deterministic
 * - validation must be replay-safe
 * - validation must be side-effect free
 */

import {
  PROVIDER_EXECUTION_POLICY,
} from "./provider-execution-policy";

import type {
  ProviderExecutionRequest,
  ProviderExecutionValidationResult,
} from "./provider-execution.types";

export function validateProviderExecution(
  request: ProviderExecutionRequest
): ProviderExecutionValidationResult {
  const violations = [];

  if (
    PROVIDER_EXECUTION_POLICY.REQUIRE_ROUTING_DECISION &&
    !request.routingDecision
  ) {
    violations.push({
      reason: "Missing routing decision",
    });
  }

  if (
    PROVIDER_EXECUTION_POLICY.REQUIRE_BOUNDARY_APPROVAL &&
    !request.boundaryReport.result.valid
  ) {
    violations.push({
      reason:
        "Provider boundary enforcement failed",
    });
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}