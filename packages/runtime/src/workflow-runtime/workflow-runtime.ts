/**
 * workflow-runtime.ts
 *
 * Responsibility:
 * Build execution plans from decisions.
 *
 * Owns:
 * - workflow planning
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 * - persistence
 */

import type {
  Decision,
} from "../decision-engine/decision.types";

import type {
  ExecutionPlan,
} from "./workflow.types";

import {
  createExecutionPlan,
} from "./execution-plan";

export function buildExecutionPlans(
  decisions: Decision[],
): ExecutionPlan[] {
  return decisions.map(
    createExecutionPlan,
  );
}