/**
 * decision.types.ts
 *
 * Responsibility:
 * Define deterministic decision contracts.
 *
 * Owns:
 * - decision shape
 * - decision category
 * - decision action
 * - decision priority
 *
 * Does NOT Own:
 * - workflow execution
 * - AI reasoning
 * - persistence
 */

import type {
  OpportunityCategory,
} from "../opportunities/opportunity.types";

export type DecisionCategory =
  OpportunityCategory;

export type DecisionAction =
  | "recover_session"
  | "advance_conversion"
  | "present_upsell"
  | "protect_retention";

export type DecisionPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface Decision {
  id: string;
  opportunityId: string;
  category: DecisionCategory;
  action: DecisionAction;
  type: string;
  priority: DecisionPriority;
  rationale: string;
}
