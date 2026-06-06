/*
PHASE 7D

Deterministically maps tasks
to routing profiles.

Pure Function.

No side effects.

No provider selection.

Replay Safe.
*/

import type {
  RoutingDecision,
  RoutingProfile,
} from "./routing.types";

import { ROUTING_PROFILES } from "./routing-profiles";

export interface RouteTaskInput {
  taskId: string;

  taskType: string;
}

export function routeTask(
  input: RouteTaskInput
): RoutingDecision {
  const profile = ROUTING_PROFILES[input.taskType];

  if (!profile) {
    throw new Error(
      `No routing profile found for task type: ${input.taskType}`
    );
  }

  return {
    taskId: input.taskId,
    profile,
  };
}