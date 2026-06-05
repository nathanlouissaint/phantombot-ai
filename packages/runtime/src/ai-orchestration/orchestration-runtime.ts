/**
 * orchestration-runtime.ts
 *
 * Responsibility:
 * Convert execution strategies into
 * orchestration requests.
 *
 * Owns:
 * - orchestration planning
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
  OrchestrationRequest,
} from "./orchestration.types";

import {
  createOrchestrationRequest,
} from "./orchestration-contracts";

export function buildOrchestrationRequests(
  strategies: ExecutionStrategy[],
): OrchestrationRequest[] {
  return strategies.map(
    createOrchestrationRequest,
  );
}