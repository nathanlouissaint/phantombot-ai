/**
 * strategy-policy.ts
 *
 * Responsibility:
 * Determine deterministic strategy metadata.
 *
 * Owns:
 * - urgency assignment
 * - execution grouping
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import type {
  CoordinatedWorkflow,
} from "../workflow-coordinator/workflow-coordinator.types";

import type {
  ExecutionGroup,
  StrategyUrgency,
} from "./execution-strategy.types";

export function determineStrategyType(
  workflow: CoordinatedWorkflow,
) {
  return workflow.workflowType;
}

export function determineUrgency(
  workflow: CoordinatedWorkflow,
): StrategyUrgency {
  return workflow.priority === "critical"
    ? "immediate"
    : "scheduled";
}

export function determineExecutionGroup(
  workflow: CoordinatedWorkflow,
): ExecutionGroup {
  switch (workflow.workflowType) {
    case "recovery":
      return "customer_recovery";

    case "conversion":
      return "customer_conversion";

    case "retention":
      return "customer_retention";

    case "upsell":
      return "customer_growth";
  }
}
