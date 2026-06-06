/**
 * Phase 8C
 *
 * Purpose:
 * Validate resolved capability inputs.
 *
 * Responsibilities:
 * - Ensure task identity exists
 * - Ensure capabilities exist
 * - Ensure priorities are valid
 *
 * Replay Safe.
 */

import type {
  CapabilityPlan,
} from "../capability-planning";

export function validateCapabilityResolution(
  plan: CapabilityPlan,
): string[] {
  const violations: string[] = [];

  if (!plan.taskId) {
    violations.push("Missing task id");
  }

  if (plan.requirements.length === 0) {
    violations.push(
      "Capability plan requires at least one capability",
    );
  }

  for (const capability of plan.requirements) {
    if (capability.priority < 0) {
      violations.push(
        `Invalid priority for capability ${capability.capability}`,
      );
    }
  }

  return violations;
}