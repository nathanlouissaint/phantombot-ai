/**
 * Phase 7G
 *
 * Validates capability plans.
 *
 * Ensures:
 *
 * - task identity exists
 * - capability requirements exist
 * - priorities are valid
 *
 * Replay-safe.
 */

import type { CapabilityPlan } from "./capability.types";

export function validateCapabilityPlan(
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

  for (const requirement of plan.requirements) {
    if (requirement.priority < 0) {
      violations.push(
        `Invalid priority for capability ${requirement.capability}`,
      );
    }
  }

  return violations;
}