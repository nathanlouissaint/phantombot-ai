/**
 * strategy-verification.types.ts
 *
 * Responsibility:
 * Define strategy verification contracts.
 *
 * Owns:
 * - verification result contracts
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import type {
  ExecutionStrategy,
} from "../execution-strategy/execution-strategy.types";

export interface VerifiedExecutionStrategy
  extends ExecutionStrategy {

  verified: true;
}
