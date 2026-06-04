/**
 * workflow-coordinator.ts
 *
 * Responsibility:
 * Coordinate execution plans.
 *
 * Owns:
 * - ordering
 * - suppression
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import type {
  ExecutionPlan,
} from "../workflow-runtime/workflow.types";

import type {
  CoordinatedWorkflow,
} from "./workflow-coordinator.types";

import {
  sortExecutionPlans,
} from "./workflow-priority";

import {
  resolveWorkflowConflicts,
} from "./workflow-conflicts";

export function coordinateWorkflows(
  plans: ExecutionPlan[],
): CoordinatedWorkflow[] {
  const resolved =
    resolveWorkflowConflicts(plans);

  const ordered =
    sortExecutionPlans(resolved);

  return ordered.map(
    (plan, index) => ({
      ...plan,
      executionOrder: index,
    }),
  );
}
