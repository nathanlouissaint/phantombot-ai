/*
PHASE 7E

Validates complete orchestration lineage.

Strategy
↓
Task
↓
Context
↓
Route

Detects gaps in the chain.
*/

import type { TaskReference } from "./task-validator";
import type { ContextReference } from "./context-validator";
import type { RoutingReference } from "./routing-validator";

export function validateLineage(
  tasks: TaskReference[],
  contexts: ContextReference[],
  routes: RoutingReference[]
): string[] {
  const violations: string[] = [];

  for (const task of tasks) {
    const context = contexts.find(
      c => c.taskId === task.taskId
    );

    if (!context) {
      violations.push(
        `Task ${task.taskId} has no context`
      );

      continue;
    }

    const route = routes.find(
      r => r.contextId === context.contextId
    );

    if (!route) {
      violations.push(
        `Context ${context.contextId} has no route`
      );
    }
  }

  return violations;
}