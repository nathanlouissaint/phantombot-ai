/*
PHASE 7E

Validates:

ExecutionStrategy
↓
OrchestrationTask

Detects:

- Missing strategy references
- Orphan tasks
*/

export interface TaskReference {
  taskId: string;
  strategyId: string;
}

export function validateTasks(
  strategies: string[],
  tasks: TaskReference[]
): string[] {
  const violations: string[] = [];

  for (const task of tasks) {
    if (!strategies.includes(task.strategyId)) {
      violations.push(
        `Task ${task.taskId} references missing strategy ${task.strategyId}`
      );
    }
  }

  return violations;
}