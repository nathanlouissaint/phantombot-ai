/**
 * planning-verification.ts
 *
 * Responsibility:
 * Aggregate all deterministic planning validators.
 *
 * Validation Chain:
 *
 * Decision
 *      ↓
 * ExecutionPlan
 *      ↓
 * CoordinatedWorkflow
 *      ↓
 * ExecutionStrategy
 *
 * Owns:
 * - planning integrity verification
 * - validator aggregation
 * - deterministic validation orchestration
 *
 * Does NOT Own:
 * - workflow generation
 * - strategy generation
 * - orchestration
 * - execution
 *
 * Critical Rules:
 * - validation must remain deterministic
 * - validation must remain replay-safe
 * - validators must remain side-effect free
 * - validators must not perform persistence
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

import {
  validateCrossLayerConsistency,
} from "./cross-layer-validator";

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

    ...validateCrossLayerConsistency(
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