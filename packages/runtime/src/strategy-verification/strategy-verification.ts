/**
 * strategy-verification.ts
 *
 * Responsibility:
 * Verify execution strategies.
 *
 * Owns:
 * - verification pipeline
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import type {
  ExecutionStrategy,
} from "../execution-strategy/execution-strategy.types";

import type {
  VerifiedExecutionStrategy,
} from "./strategy-verification.types";

import {
  validateStrategy,
} from "./strategy-validator";

export function verifyStrategies(
  strategies: ExecutionStrategy[],
): VerifiedExecutionStrategy[] {
  return strategies
    .filter(validateStrategy)
    .map(
      strategy => ({
        ...strategy,
        verified: true,
      }),
    );
}
