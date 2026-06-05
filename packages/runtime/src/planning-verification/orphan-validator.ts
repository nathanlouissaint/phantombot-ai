/**
 * orphan-validator.ts
 *
 * Responsibility:
 * Detect planning artifacts that
 * are not connected to the planning chain.
 *
 * Detects:
 * - orphan execution plans
 * - orphan workflows
 * - orphan strategies
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

export function validateOrphans(
  decisions: Decision[],
  plans: ExecutionPlan[],
  workflows: CoordinatedWorkflow[],
  strategies: ExecutionStrategy[],
): string[] {
  const violations: string[] = [];

  const decisionIds =
    new Set(
      decisions.map(
        decision => decision.id,
      ),
    );

  const planIds =
    new Set(
      plans.map(
        plan => plan.id,
      ),
    );

  const workflowIds =
    new Set(
      workflows.map(
        workflow => workflow.id,
      ),
    );

  for (const plan of plans) {
    if (!decisionIds.has(plan.decisionId)) {
      violations.push(
        `Orphan execution plan ${plan.id}`,
      );
    }
  }

  for (const workflow of workflows) {
    if (!planIds.has(workflow.id)) {
      violations.push(
        `Orphan workflow ${workflow.id}`,
      );
    }
  }

  for (const strategy of strategies) {
    if (!workflowIds.has(strategy.workflowId)) {
      violations.push(
        `Orphan strategy ${strategy.id}`,
      );
    }
  }

  return violations;
}