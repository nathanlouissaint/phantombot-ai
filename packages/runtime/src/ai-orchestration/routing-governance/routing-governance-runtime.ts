/**
 * Phase 8E
 *
 * Purpose:
 * Execute deterministic routing governance.
 *
 * Responsibilities:
 * - Validate routing lineage
 * - Produce governance reports
 * - Gate routing before provider boundary enforcement
 *
 * Constraints:
 * - No providers
 * - No models
 * - No execution
 * - No side effects
 * - Replay safe
 */

import type {
  RoutingGovernanceInput,
  RoutingGovernanceReport,
} from "./routing-governance.types";

import {
  validateRoutingGovernance,
} from "./routing-governance-validator";

export function evaluateRoutingGovernance(
  input: RoutingGovernanceInput,
): RoutingGovernanceReport {
  const violations =
    validateRoutingGovernance(input);

  return {
    taskId:
      input.routingDecision.taskId ||
      input.resolvedCapabilitySet.taskId,

    approved:
      violations.length === 0,

    violations,
  };
}
