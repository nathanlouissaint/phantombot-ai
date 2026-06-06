/**
 * Phase 8D
 *
 * Purpose:
 * Define deterministic model routing contracts derived from resolved capabilities.
 *
 * Responsibilities:
 * - Describe routing profiles
 * - Describe routing decisions
 * - Keep routing provider agnostic
 *
 * Constraints:
 * - No provider selection
 * - No model selection
 * - No prompt execution
 * - No SDK imports
 * - No API calls
 * - No persistence
 * - Replay safe
 */

export type RoutingProfile =
  | "classification"
  | "reasoning"
  | "summarization"
  | "content_generation";

export interface RoutingDecision {
  taskId: string;

  profile: RoutingProfile;
}
