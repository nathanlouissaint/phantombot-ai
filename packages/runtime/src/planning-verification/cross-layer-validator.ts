/**
 * cross-layer-validator.ts
 *
 * Responsibility:
 * Verify complete planning lineage.
 *
 * Decision
 *      ↓
 * ExecutionPlan
 *      ↓
 * CoordinatedWorkflow
 *      ↓
 * ExecutionStrategy
 *
 * Detects:
 * - broken lineage
 * - partial chains
 * - duplicate ownership
 *
 * Deterministic only.
 */

import type {
  Decision,
} from "../decision-engine/decision.types";

import type {
  ExecutionPlan,
} from "../workflow-runtime/workflow.types";

import type {
  CoordinatedWorkflow,
} from "../workflow-coordinator/workflow-coordinator.types";

import type {
  ExecutionStrategy,
} from "../execution-strategy/execution-strategy.types";

export function validateCrossLayerConsistency(
  decisions: Decision[],
  plans: ExecutionPlan[],
  workflows: CoordinatedWorkflow[],
  strategies: ExecutionStrategy[],
): string[] {
  const violations: string[] = [];

  for (const decision of decisions) {
    const matchingPlans =
      plans.filter(
        plan =>
          plan.decisionId === decision.id,
      );

    if (matchingPlans.length !== 1) {
      violations.push(
        `Decision ${decision.id} does not map to exactly one plan.`,
      );

      continue;
    }

    const plan =
      matchingPlans[0];

    const matchingWorkflows =
      workflows.filter(
        workflow =>
          workflow.id === plan.id,
      );

    if (
      matchingWorkflows.length !== 1
    ) {
      violations.push(
        `Plan ${plan.id} does not map to exactly one workflow.`,
      );

      continue;
    }

    const workflow =
      matchingWorkflows[0];

    const matchingStrategies =
      strategies.filter(
        strategy =>
          strategy.workflowId === workflow.id,
      );

    if (
      matchingStrategies.length !== 1
    ) {
      violations.push(
        `Workflow ${workflow.id} does not map to exactly one strategy.`,
      );
    }
  }

  return violations;
}