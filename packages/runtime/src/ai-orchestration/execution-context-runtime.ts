/**
 * execution-context-runtime.ts
 *
 * Responsibility:
 * Build deterministic execution contexts.
 *
 * Owns:
 * - execution context construction
 *
 * Does NOT Own:
 * - execution
 * - providers
 * - prompts
 */

import type {
  TaskDefinition,
} from "./task-definition.types";

import type {
  OrchestrationRequest,
} from "./orchestration.types";

import type {
  ExecutionContext,
} from "./execution-context.types";

export function buildExecutionContexts(
  requests: OrchestrationRequest[],
  definitions: TaskDefinition[],
): ExecutionContext[] {
  return definitions.map(
    definition => {
      const request =
        requests.find(
          candidate =>
            candidate.task.id ===
            definition.taskId,
        );

      return {
        workflowId:
          definition.workflowId,

        strategyId:
          request?.context.strategyId ??
          "",

        executionGroup:
          request?.context.executionGroup ??
          "",

        objective:
          definition.objective,
      };
    },
  );
}