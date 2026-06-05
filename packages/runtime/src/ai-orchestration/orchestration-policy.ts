/**
 * orchestration-policy.ts
 *
 * Responsibility:
 * Determine orchestration task types.
 *
 * Owns:
 * - deterministic task classification
 *
 * Does NOT Own:
 * - execution
 * - providers
 * - prompts
 */

import type {
  ExecutionStrategy,
} from "../execution-strategy/execution-strategy.types";

import type {
  OrchestrationTaskType,
} from "./orchestration.types";

export function determineTaskType(
  strategy: ExecutionStrategy,
): OrchestrationTaskType {
  return strategy.strategyType;
}