/**
 * Verifies:
 *
 * Workflow
 *      ↓
 * ExecutionStrategy
 *
 * Every coordinated workflow
 * must produce a strategy.
 */

import type { CoordinatedWorkflow }
  from "../workflow-coordinator/workflow-coordinator.types";

import type { ExecutionStrategy }
  from "../execution-strategy/execution-strategy.types";

export function validateStrategies(
  workflows: CoordinatedWorkflow[],
  strategies: ExecutionStrategy[],
): string[] {
  const violations: string[] = [];

  for (const workflow of workflows) {
    const exists = strategies.some(
      strategy => strategy.workflowId === workflow.id,
    );

    if (!exists) {
      violations.push(
        `Workflow ${workflow.id} is missing an execution strategy.`,
      );
    }
  }

  return violations;
}