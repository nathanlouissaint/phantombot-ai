/**
 * Verifies:
 *
 * ExecutionPlan
 *      ↓
 * CoordinatedWorkflow
 *
 * Every plan must appear
 * inside workflow coordination.
 */

import type { ExecutionPlan } from "../workflow-runtime/workflow.types";
import type { CoordinatedWorkflow }
  from "../workflow-coordinator/workflow-coordinator.types";

export function validateWorkflows(
  plans: ExecutionPlan[],
  workflows: CoordinatedWorkflow[],
): string[] {
  const violations: string[] = [];

  for (const plan of plans) {
    const exists = workflows.some(
      workflow => workflow.id === plan.id,
    );

    if (!exists) {
      violations.push(
        `Execution plan ${plan.id} is missing from workflow coordination.`,
      );
    }
  }

  return violations;
}