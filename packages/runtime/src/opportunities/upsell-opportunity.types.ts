/**
 * upsell-opportunity.types.ts
 *
 * Responsibility:
 * Define upsell opportunity specializations.
 *
 * Owns:
 * - upsell opportunity types
 * - upsell detection configuration
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
 * Supported upsell opportunity types.
 *
 * These represent shoppers whose current
 * behavior suggests potential for cart
 * expansion, bundling, or premium offers.
 */
export type UpsellOpportunityType =
  | "HIGH_VALUE_CART_EXPANSION"
  | "MULTI_ITEM_EXPANSION";

/**
 * Upsell-specific opportunity contract.
 *
 * Extends the shared Opportunity contract
 * while restricting allowed type values.
 */
export interface UpsellOpportunity
  extends Opportunity {
  type:
    UpsellOpportunityType;
}

/**
 * Detection configuration.
 *
 * Thresholds stay outside detector logic
 * so behavior remains deterministic and
 * configurable.
 */
export interface UpsellOpportunityDetectionConfig {
  highValueThreshold: number;
  multiItemThreshold: number;
}
