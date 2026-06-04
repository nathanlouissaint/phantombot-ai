/**
 * decision-policy.ts
 *
 * Responsibility:
 * Evaluate opportunities using
 * deterministic business rules.
 *
 * Owns:
 * - priority assignment
 * - policy evaluation
 *
 * Does NOT Own:
 * - workflow execution
 * - AI reasoning
 * - persistence
 *
 * Critical Rules:
 * - deterministic only
 * - replay-safe
 */

import {
  Opportunity,
} from "../opportunities/opportunity.types";

import {
  DecisionPriority,
} from "./decision.types";

/**
 * Determine decision priority
 * from opportunity confidence.
 */
export function determinePriority(
  opportunity: Opportunity,
): DecisionPriority {
  if (
    opportunity.confidence >=
    0.8
  ) {
    return "high";
  }

  if (
    opportunity.confidence >=
    0.5
  ) {
    return "medium";
  }

  return "low";
}