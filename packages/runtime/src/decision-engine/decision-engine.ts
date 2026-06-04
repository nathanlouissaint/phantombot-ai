/**
 * decision-engine.ts
 *
 * Responsibility:
 * Transform opportunities
 * into deterministic decisions.
 *
 * Owns:
 * - decision generation
 * - policy application
 *
 * Does NOT Own:
 * - workflow execution
 * - persistence
 * - AI reasoning
 *
 * Critical Rules:
 * - deterministic only
 * - replay-safe
 */

import {
  Opportunity,
} from "../opportunities/opportunity.types";

import {
  determinePriority,
} from "./decision-policy";

import {
  Decision,
} from "./decision.types";

/**
 * Convert opportunities into
 * deterministic decisions.
 */
export function evaluateDecisions(
  opportunities: Opportunity[],
): Decision[] {
  return opportunities.map(
    opportunity => ({
      id:
        `decision:${opportunity.id}`,

      opportunityId:
        opportunity.id,

      type:
        opportunity.type,

      priority:
        determinePriority(
          opportunity,
        ),

      rationale:
        `Generated from ${opportunity.type}`,
    }),
  );
}