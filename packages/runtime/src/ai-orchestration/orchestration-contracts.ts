/**
 * orchestration-contracts.ts
 *
 * Responsibility:
 * Build deterministic orchestration requests.
 *
 * Owns:
 * - request construction
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
  determineTaskType,
} from "./orchestration-policy";

export function createOrchestrationRequest(
  strategy: ExecutionStrategy,
): OrchestrationRequest {
  return {
    task: {
      id:
        `task:${strategy.id}`,

      workflowId:
        strategy.workflowId,

      taskType:
        determineTaskType(strategy),

      executionOrder:
        strategy.executionOrder,
    },

    context: {
      workflowId:
        strategy.workflowId,

      strategyId:
        strategy.id,

      executionGroup:
        strategy.executionGroup,
    },
  };
}