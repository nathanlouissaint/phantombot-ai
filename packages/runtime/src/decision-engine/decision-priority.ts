import type {
  Opportunity,
} from "../opportunities/opportunity.types";

import type {
  DecisionPriority,
} from "./decision.types";

export function determinePriority(
  opportunity: Opportunity,
): DecisionPriority {
  if (
    opportunity.category === "recovery" &&
    opportunity.confidence >= 0.8
  ) {
    return "critical";
  }

  if (opportunity.confidence >= 0.8) {
    return "high";
  }

  if (opportunity.confidence >= 0.6) {
    return "medium";
  }

  return "low";
}
