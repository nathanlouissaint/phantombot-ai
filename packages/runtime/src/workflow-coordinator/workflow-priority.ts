/**
 * workflow-priority.ts
 *
 * Responsibility:
 * Provide deterministic workflow ranking.
 *
 * Owns:
 * - workflow priority ordering
 *
 * Does NOT Own:
 * - suppression
 * - execution
 */

import type {
  ExecutionPlan,
} from "../workflow-runtime/workflow.types";

const PRIORITY_SCORE = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
} as const;

export function sortExecutionPlans(
  plans: ExecutionPlan[],
): ExecutionPlan[] {
  return [...plans].sort(
    (a, b) =>
      PRIORITY_SCORE[b.priority]
      - PRIORITY_SCORE[a.priority],
  );
}
