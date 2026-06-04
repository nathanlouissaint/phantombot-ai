/**
 * conversion-opportunity.types.ts
 *
 * Responsibility:
 * Define conversion opportunity specializations.
 *
 * Owns:
 * - conversion opportunity types
 * - conversion detection configuration
 *
 * Does NOT Own:
 * - detection logic
 * - confidence scoring
 * - workflow execution
 * - AI reasoning
 *
 * Critical Rules:
 * - contracts must remain deterministic
 * - contracts must remain replay-safe
 */

import {
  Opportunity,
} from "./opportunity.types";

/**
 * Supported conversion opportunities.
 *
 * These represent shoppers who are actively
 * moving toward a purchase but have not
 * converted yet.
 */
export type ConversionOpportunityType =
  | "HIGH_INTENT_ACTIVE_SESSION"
  | "CHECKOUT_READY"
  | "HIGH_VALUE_CHECKOUT";

/**
 * Conversion-specific opportunity contract.
 *
 * Extends the shared Opportunity contract
 * while restricting the allowed type values.
 */
export interface ConversionOpportunity
  extends Opportunity {
  type:
    ConversionOpportunityType;
}

/**
 * Detection configuration.
 *
 * Allows thresholds to remain deterministic
 * and externally controlled rather than
 * hardcoded inside detection logic.
 */
export interface ConversionOpportunityDetectionConfig {
  highValueThreshold: number;
}
