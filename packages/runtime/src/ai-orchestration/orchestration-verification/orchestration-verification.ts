/*
PHASE 7E

Top-level orchestration validation.

Runs:

Task Validation
Context Validation
Routing Validation
Cross-Layer Validation
Replay Validation
*/

import type {
  OrchestrationVerificationResult,
} from "./orchestration-verification.types";

import {
  validateTasks,
  type TaskReference,
} from "./task-validator";

import {
  validateContexts,
  type ContextReference,
} from "./context-validator";

import {
  validateRouting,
  type RoutingReference,
} from "./routing-validator";

import { validateReplay } from "./replay-validator";

import { validateLineage } from "./cross-layer-validator";

export interface VerificationInput {
  strategyIds: string[];

  tasks: TaskReference[];

  contexts: ContextReference[];

  routes: RoutingReference[];

  replayA: unknown;

  replayB: unknown;
}

export function verifyOrchestration(
  input: VerificationInput
): OrchestrationVerificationResult {
  const violations: string[] = [];

  violations.push(
    ...validateTasks(
      input.strategyIds,
      input.tasks
    )
  );

  violations.push(
    ...validateContexts(
      input.tasks.map(t => t.taskId),
      input.contexts
    )
  );

  violations.push(
    ...validateRouting(
      input.contexts.map(c => c.contextId),
      input.routes
    )
  );

  violations.push(
    ...validateLineage(
      input.tasks,
      input.contexts,
      input.routes
    )
  );

  violations.push(
    ...validateReplay(
      input.replayA,
      input.replayB
    )
  );

  return {
    valid: violations.length === 0,
    violations,
  };
}