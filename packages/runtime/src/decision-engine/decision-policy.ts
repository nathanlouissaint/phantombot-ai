import type {
  Opportunity,
} from "../opportunities/opportunity.types";

import type {
  DecisionAction,
} from "./decision.types";

export function determineAction(
  opportunity: Opportunity,
): DecisionAction {
  if (opportunity.category === "recovery") {
    return "recover_session";
  }

  if (opportunity.category === "conversion") {
    return "advance_conversion";
  }

  if (opportunity.category === "upsell") {
    return "present_upsell";
  }

  return "protect_retention";
}
