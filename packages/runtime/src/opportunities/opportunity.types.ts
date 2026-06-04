/**
 * opportunity.types.ts
 *
 * Responsibility:
 * Define canonical business opportunity contracts.
 *
 * Owns:
 * - opportunity identifiers
 * - opportunity confidence contracts
 * - opportunity categorization
 *
 * Does NOT Own:
 * - opportunity detection
 * - scoring
 * - AI reasoning
 * - workflow execution
 *
 * Critical Rules:
 * - contracts must remain deterministic
 * - contracts must remain replay-safe
 */

export type OpportunityCategory =
  | "recovery"
  | "conversion"
  | "upsell"
  | "retention";

export interface Opportunity {
  id: string;

  category:
    OpportunityCategory;

  type: string;

  confidence: number;

  detectedAt: string;
}