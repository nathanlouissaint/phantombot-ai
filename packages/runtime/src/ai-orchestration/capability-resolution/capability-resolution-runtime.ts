/**
 * Phase 8C
 *
 * Purpose:
 * Resolve capability plans into
 * deterministic capability sets.
 *
 * Responsibilities:
 * - Validate capability plans
 * - Normalize ordering
 * - Produce replay-safe outputs
 *
 * Constraints:
 * - No provider selection
 * - No model selection
 * - No execution
 */

import type {
  CapabilityPlan,
} from "../capability-planning";

import type {
  ResolvedCapabilitySet,
} from "./capability-resolution.types";

import {
  validateCapabilityResolution,
} from "./capability-resolution-validator";

export function resolveCapabilities(
  plan: CapabilityPlan,
): ResolvedCapabilitySet {
  const violations =
    validateCapabilityResolution(plan);

  if (violations.length > 0) {
    throw new Error(
      violations.join(", "),
    );
  }

  const capabilities = [...plan.requirements].sort(
    (a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }

      return a.capability.localeCompare(
        b.capability,
      );
    },
  );

  return {
    taskId: plan.taskId,

    capabilities,
  };
}