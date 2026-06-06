/**
 * Phase 7G
 *
 * Converts orchestration tasks into
 * capability plans.
 *
 * This planner does NOT:
 *
 * - select providers
 * - execute prompts
 * - call AI systems
 *
 * It only produces deterministic
 * capability requirements.
 */

import type {
  CapabilityPlan,
  CapabilityRequirement,
} from "./capability.types";

import type { OrchestrationTask } from "../orchestration.types";

export function buildCapabilityPlan(
  task: OrchestrationTask,
  requirements: CapabilityRequirement[],
): CapabilityPlan {
  return {
    taskId: task.id,
    requirements,
  };
}