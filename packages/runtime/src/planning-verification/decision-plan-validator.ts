/**
 * Verifies:
 *
 * Decision
 *      ↓
 * ExecutionPlan
 *
 * Every decision must produce
 * exactly one execution plan.
 */

import type { Decision } from "../decision-engine/decision.types";
import type { ExecutionPlan } from "../workflow-runtime/workflow.types";

export function validateDecisionPlans(
  decisions: Decision[],
  plans: ExecutionPlan[],
): string[] {
  const violations: string[] = [];

  for (const decision of decisions) {
    const matches = plans.filter(
      plan => plan.decisionId === decision.id,
    );

    if (matches.length !== 1) {
      violations.push(
        `Decision ${decision.id} has ${matches.length} execution plans.`,
      );
    }
  }

  return violations;
}