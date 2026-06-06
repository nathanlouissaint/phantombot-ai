/**
 * execution-context-validator.ts
 *
 * Responsibility:
 * Validate deterministic execution contexts.
 */

import type {
  ExecutionContext,
} from "./execution-context.types";

export function validateExecutionContexts(
  contexts: ExecutionContext[],
): string[] {
  const violations: string[] = [];

  for (const context of contexts) {
    if (!context.workflowId) {
      violations.push(
        "Missing workflowId",
      );
    }

    if (!context.strategyId) {
      violations.push(
        "Missing strategyId",
      );
    }

    if (!context.objective) {
      violations.push(
        "Missing objective",
      );
    }
  }

  return violations;
}