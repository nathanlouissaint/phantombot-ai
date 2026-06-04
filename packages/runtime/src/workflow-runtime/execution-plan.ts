/**
 * execution-plan.ts
 *
 * Responsibility:
 * Translate decisions into execution plans.
 *
 * Owns:
 * - plan creation
 *
 * Does NOT Own:
 * - workflow execution
 * - orchestration
 */

import type {
  Decision,
} from "../decision-engine/decision.types";

import type {
  ExecutionPlan,
} from "./workflow.types";

import {
  getWorkflowSteps,
} from "./workflow-policy";

export function createExecutionPlan(
  decision: Decision,
): ExecutionPlan {
  return {
    id: `plan:${decision.id}`,

    decisionId: decision.id,

    workflowType: decision.category,

    steps:
      getWorkflowSteps(decision.action),

    priority:
      decision.priority,
  };
}