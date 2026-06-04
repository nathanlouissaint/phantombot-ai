/**
 * strategy-policy.ts
 *
 * Responsibility:
 * Determine deterministic strategy type.
 *
 * Owns:
 * - strategy selection
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import type {
  CoordinatedWorkflow,
} from "../workflow-coordinator/workflow-coordinator.types";

export function determineStrategyType(
  workflow: CoordinatedWorkflow,
) {
  return workflow.workflowType;
}
