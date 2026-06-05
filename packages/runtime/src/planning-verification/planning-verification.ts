/**
 * Root Planning Integrity Runtime.
 *
 * Aggregates all validators.
 *
 * Decision
 *      ↓
 * Plan
 *      ↓
 * Workflow
 *      ↓
 * Strategy
 *
 * Produces deterministic verification results.
 */

import {
  validateDecisionPlans,
} from "./decision-plan-validator";

import {
  validateWorkflows,
} from "./workflow-validator";

import {
  validateStrategies,
} from "./strategy-validator";

import {
  validateDependencies,
} from "./dependency-validator";

import {
  validateOrphans,
} from "./orphan-validator";

export function verifyPlanningIntegrity(
  input: {
    decisions: any[];
    plans: any[];
    workflows: any[];
    strategies: any[];
    graph: any;
  },
) {
  const violations = [
    ...validateDecisionPlans(
      input.decisions,
      input.plans,
    ),

    ...validateWorkflows(
      input.plans,
      input.workflows,
    ),

    ...validateStrategies(
      input.workflows,
      input.strategies,
    ),

    ...validateDependencies(
      input.graph,
    ),

    ...validateOrphans(
      input.decisions,
      input.plans,
      input.workflows,
      input.strategies,
    ),
  ];

  return {
    valid: violations.length === 0,
    violations,
  };
}