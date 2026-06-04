import type {
  Opportunity,
} from "../opportunities/opportunity.types";

import {
  isDecisionEligible,
} from "./decision-eligibility";

import {
  resolveDecisionConflicts,
} from "./decision-conflicts";

import {
  determineAction,
} from "./decision-policy";

import {
  determinePriority,
} from "./decision-priority";

import type {
  Decision,
} from "./decision.types";

export function evaluateDecisions(
  opportunities: Opportunity[],
): Decision[] {
  const decisions =
    opportunities
      .filter(isDecisionEligible)
      .map(
        opportunity => ({
          id:
            `decision:${opportunity.id}`,

          opportunityId:
            opportunity.id,

          category:
            opportunity.category,

          action:
            determineAction(opportunity),

          type:
            opportunity.type,

          priority:
            determinePriority(opportunity),

          rationale:
            `Selected ${opportunity.category} decision for ${opportunity.type}`,
        }),
      );

  return resolveDecisionConflicts(decisions);
}
