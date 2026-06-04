/**
 * opportunity-engine.ts
 *
 * Responsibility:
 * Coordinate deterministic opportunity detection.
 *
 * Owns:
 * - detector orchestration
 * - opportunity aggregation
 * - detector execution order
 *
 * Does NOT Own:
 * - opportunity detection logic
 * - scoring
 * - workflow execution
 * - AI reasoning
 * - persistence
 *
 * Critical Rules:
 * - execution must remain deterministic
 * - execution must remain replay-safe
 * - no wall-clock dependencies
 */

import {
  ShopperSessionState,
} from "@phantombot/contracts";

import {
  Opportunity,
} from "./opportunity.types";

import {
  detectRecoveryOpportunities,
} from "./recovery-opportunity.detector";

import {
  detectConversionOpportunities,
} from "./conversion-opportunity.detector";

import {
  detectUpsellOpportunities,
} from "./upsell-opportunity.detector";

import {
  detectRetentionOpportunities,
} from "./retention-opportunity.detector";

/**
 * Centralized opportunity engine configuration.
 *
 * Each detector receives only the
 * configuration it requires.
 */
export interface OpportunityEngineConfig {
  conversion: {
    highValueThreshold: number;
  };

  upsell: {
    highValueThreshold: number;
    multiItemThreshold: number;
  };

  retention: {
    highValueThreshold: number;
  };
}

/**
 * Evaluate all business opportunities
 * from deterministic shopper state.
 */
export function evaluateOpportunities(
  state: ShopperSessionState,
  config: OpportunityEngineConfig
): Opportunity[] {
  return [
    ...detectRecoveryOpportunities(
      state
    ),

    ...detectConversionOpportunities(
      state,
      config.conversion
    ),

    ...detectUpsellOpportunities(
      state,
      config.upsell
    ),

    ...detectRetentionOpportunities(
      state,
      config.retention
    ),
  ];
}
