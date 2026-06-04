/**
 * workflow-policy.ts
 *
 * Responsibility:
 * Map decisions to deterministic workflow steps.
 *
 * Owns:
 * - workflow step templates
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 * - AI
 */

import type {
  DecisionAction,
} from "../decision-engine/decision.types";

export function getWorkflowSteps(
  action: DecisionAction,
): string[] {
  switch (action) {
    case "recover_session":
      return [
        "identify_shopper",
        "prepare_recovery_action",
      ];

    case "advance_conversion":
      return [
        "identify_shopper",
        "prepare_conversion_action",
      ];

    case "present_upsell":
      return [
        "identify_shopper",
        "prepare_upsell_action",
      ];

    case "protect_retention":
      return [
        "identify_shopper",
        "prepare_retention_action",
      ];
  }
}