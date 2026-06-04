/**
 * decision.types.ts
 *
 * Responsibility:
 * Define deterministic decision contracts.
 *
 * Owns:
 * - decision shape
 * - decision priority
 * - decision metadata
 *
 * Does NOT Own:
 * - decision evaluation
 * - workflow execution
 * - AI reasoning
 * - persistence
 *
 * Critical Rules:
 * - deterministic only
 * - replay-safe
 */

export type DecisionPriority =
  | "low"
  | "medium"
  | "high";

export interface Decision {
  /**
   * Deterministic decision identifier.
   */
  id: string;

  /**
   * Source opportunity.
   */
  opportunityId: string;

  /**
   * Decision classification.
   */
  type: string;

  /**
   * Deterministic priority.
   */
  priority: DecisionPriority;

  /**
   * Human-readable explanation.
   */
  rationale: string;
}