/**
 * recovery-opportunity.types.ts
 *
 * Responsibility:
 * Define recovery opportunity specialization.
 *
 * Owns:
 * - recovery opportunity types
 *
 * Does NOT Own:
 * - common opportunity contracts
 */

import {
  Opportunity,
} from "./opportunity.types";

export type RecoveryOpportunityType =
  | "ABANDONED_CHECKOUT"
  | "HIGH_HESITATION"
  | "HIGH_INTENT_ABANDONMENT";

export interface RecoveryOpportunity
  extends Opportunity {
  type:
    RecoveryOpportunityType;
}