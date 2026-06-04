/**
 * workflow-conflicts.ts
 *
 * Responsibility:
 * Resolve workflow conflicts.
 *
 * Owns:
 * - workflow suppression
 *
 * Does NOT Own:
 * - workflow execution
 * - orchestration
 */

import type {
  ExecutionPlan,
} from "../workflow-runtime/workflow.types";

export function resolveWorkflowConflicts(
  plans: ExecutionPlan[],
): ExecutionPlan[] {
  const hasCriticalRecovery =
    plans.some(
      plan =>
        plan.workflowType === "recovery"
        && plan.priority === "critical",
    );

  if (!hasCriticalRecovery) {
    return plans;
  }

  return plans.filter(
    plan =>
      plan.workflowType !== "upsell",
  );
}
