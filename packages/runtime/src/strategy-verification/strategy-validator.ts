/**
 * strategy-validator.ts
 *
 * Responsibility:
 * Validate execution strategies.
 *
 * Owns:
 * - strategy validation
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import type {
  ExecutionStrategy,
} from "../execution-strategy/execution-strategy.types";

export function validateStrategy(
  strategy: ExecutionStrategy,
): boolean {
  return (
    strategy.workflowId.length > 0
    && strategy.id.length > 0
  );
}
