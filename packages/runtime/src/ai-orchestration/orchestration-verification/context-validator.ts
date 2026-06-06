/*
PHASE 7E

Validates:

Task
↓
ExecutionContext

Detects:

- Missing task references
- Orphan contexts
*/

export interface ContextReference {
  contextId: string;
  taskId: string;
}

export function validateContexts(
  taskIds: string[],
  contexts: ContextReference[]
): string[] {
  const violations: string[] = [];

  for (const context of contexts) {
    if (!taskIds.includes(context.taskId)) {
      violations.push(
        `Context ${context.contextId} references missing task ${context.taskId}`
      );
    }
  }

  return violations;
}