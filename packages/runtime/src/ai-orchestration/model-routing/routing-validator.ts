/*
PHASE 7D

Validates routing decisions.

Detects:

- Missing profiles
- Invalid profiles
- Empty task identifiers

Used before provider adapters exist.
*/

import type { RoutingDecision } from "./routing.types";

export function validateRoutingDecision(
  decision: RoutingDecision
): string[] {
  const violations: string[] = [];

  if (!decision.taskId) {
    violations.push("Missing task id");
  }

  if (!decision.profile) {
    violations.push("Missing routing profile");
  }

  return violations;
}