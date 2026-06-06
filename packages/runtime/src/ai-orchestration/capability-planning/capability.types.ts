/**
 * Phase 7G
 *
 * Defines provider-independent capability contracts.
 *
 * These contracts describe WHAT an orchestration task
 * requires from future AI systems.
 *
 * They intentionally do not reference:
 *
 * - OpenAI
 * - Anthropic
 * - Models
 * - Prompts
 * - Providers
 *
 * This layer remains deterministic,
 * serializable, and replay-safe.
 */

export type CapabilityType =
  | "generation"
  | "classification"
  | "summarization"
  | "reasoning"
  | "retrieval";

export interface CapabilityRequirement {
  capability: CapabilityType;

  priority: number;
}

export interface CapabilityPlan {
  taskId: string;

  requirements: CapabilityRequirement[];
}