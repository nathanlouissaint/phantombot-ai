/**
 * Phase 8D
 *
 * Purpose:
 * Validate deterministic routing decisions.
 *
 * Responsibilities:
 * - Detect missing task identity
 * - Detect missing routing profile
 * - Keep validation provider agnostic
 *
 * Constraints:
 * - No providers
 * - No models
 * - No execution
 * - No side effects
 */

import type {
  RoutingDecision,
} from "./routing.types";

export function validateRoutingDecision(
  decision: RoutingDecision,
): string[] {
  const violations: string[] = [];

  if (!decision.taskId) {
    violations.push("Missing task id");
  }

  if (!decision.profile) {
    violations.push("Missing routing profile");
  }

  return violations;
}
