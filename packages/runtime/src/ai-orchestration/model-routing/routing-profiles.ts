/**
 * Phase 8D
 *
 * Purpose:
 * Map resolved capabilities to deterministic routing profiles.
 *
 * Responsibilities:
 * - Own capability-to-routing-profile translation
 * - Preserve provider-agnostic routing
 * - Avoid taskType-based routing shortcuts
 *
 * Constraints:
 * - No providers
 * - No models
 * - No execution
 * - No networking
 * - Replay safe
 */

import type {
  CapabilityType,
} from "../capability-planning";

import type {
  RoutingProfile,
} from "./routing.types";

export const ROUTING_PROFILES: Record<
  CapabilityType,
  RoutingProfile
> = {
  classification: "classification",

  reasoning: "reasoning",

  summarization: "summarization",

  generation: "content_generation",

  retrieval: "reasoning",
};
