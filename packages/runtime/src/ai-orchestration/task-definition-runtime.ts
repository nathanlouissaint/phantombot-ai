/**
 * task-definition-runtime.ts
 *
 * Responsibility:
 * Convert orchestration requests
 * into deterministic task definitions.
 */

import type {
  OrchestrationRequest,
} from "./orchestration.types";

import type {
  TaskDefinition,
} from "./task-definition.types";

import {
  determineObjective,
} from "./task-definition-policy";

export function buildTaskDefinitions(
  requests: OrchestrationRequest[],
): TaskDefinition[] {
  return requests.map(
    request => ({
      id:
        `definition:${request.task.id}`,

      taskId:
        request.task.id,

      workflowId:
        request.task.workflowId,

      taskType:
        request.task.taskType,

      objective:
        determineObjective(
          request.task.taskType,
        ),
    }),
  );
}