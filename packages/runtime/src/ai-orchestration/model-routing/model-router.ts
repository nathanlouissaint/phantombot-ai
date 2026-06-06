/**
 * Phase 8D
 *
 * Purpose:
 * Derive routing decisions from resolved capability sets.
 *
 * Responsibilities:
 * - Consume resolved capabilities
 * - Select a deterministic routing profile
 * - Preserve replay-safe ordering semantics
 *
 * Constraints:
 * - No taskType routing
 * - No provider selection
 * - No model selection
 * - No prompt execution
 * - No side effects
 */

import type {
  ResolvedCapabilitySet,
} from "../capability-resolution";

import type {
  RoutingDecision,
  RoutingProfile,
} from "./routing.types";

import {
  ROUTING_PROFILES,
} from "./routing-profiles";

export function routeTask(
  resolvedCapabilitySet: ResolvedCapabilitySet,
): RoutingDecision {
  if (!resolvedCapabilitySet.taskId) {
    throw new Error("Missing task id");
  }

  if (
    resolvedCapabilitySet.capabilities.length === 0
  ) {
    throw new Error(
      "Resolved capability set requires at least one capability",
    );
  }

  const primaryCapability =
    resolvedCapabilitySet.capabilities[0];

  const profile: RoutingProfile | undefined =
    ROUTING_PROFILES[
      primaryCapability.capability
    ];

  if (!profile) {
    throw new Error(
      `No routing profile found for capability: ${primaryCapability.capability}`,
    );
  }

  return {
    taskId: resolvedCapabilitySet.taskId,
    profile,
  };
}
