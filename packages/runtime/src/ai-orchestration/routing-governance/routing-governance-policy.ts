/**
 * Phase 8E
 *
 * Purpose:
 * Define deterministic routing governance policy.
 *
 * Responsibilities:
 * - Identify approved routing profiles
 * - Reuse routing profile mappings
 * - Avoid duplicate routing abstractions
 *
 * Constraints:
 * - No providers
 * - No model execution
 * - No side effects
 * - Provider agnostic
 */

import type {
  RoutingProfile,
} from "../model-routing";

export const APPROVED_ROUTING_PROFILES:
  readonly RoutingProfile[] = [
    "classification",
    "reasoning",
    "summarization",
    "content_generation",
  ];
