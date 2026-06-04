/**
 * retention-opportunity.types.ts
 *
 * Responsibility:
 * Define retention opportunity contracts.
 *
 * Owns:
 * - retention opportunity types
 * - retention detection configuration
 *
 * Does NOT Own:
 * - detection logic
 * - confidence scoring
 * - workflow execution
 * - AI reasoning
 */

import {
  Opportunity,
} from "./opportunity.types";

export type RetentionOpportunityType =
  | "RETURN_PURCHASE_SIGNAL"
  | "HIGH_VALUE_CONVERTED_SESSION";

export interface RetentionOpportunity
  extends Opportunity {
  type:
    RetentionOpportunityType;
}

export interface RetentionOpportunityDetectionConfig {
  highValueThreshold: number;
}
