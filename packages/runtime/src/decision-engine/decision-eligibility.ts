import type {
  Opportunity,
} from "../opportunities/opportunity.types";

export function isDecisionEligible(
  opportunity: Opportunity,
): boolean {
  return opportunity.confidence >= 0.4;
}
