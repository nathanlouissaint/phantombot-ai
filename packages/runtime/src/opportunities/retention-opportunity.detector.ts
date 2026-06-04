/**
 * retention-opportunity.detector.ts
 *
 * Responsibility:
 * Detect deterministic retention opportunities.
 *
 * Owns:
 * - retention signal detection
 * - opportunity generation
 * - retention classification
 *
 * Does NOT Own:
 * - workflow execution
 * - AI reasoning
 * - persistence
 * - confidence scoring
 */

import {
  ShopperSessionState,
} from "@phantombot/contracts";

import {
  scoreReturnPurchaseSignal,
  scoreHighValueRetention,
} from "./opportunity-score";

import {
  RetentionOpportunity,
  RetentionOpportunityDetectionConfig,
} from "./retention-opportunity.types";

export function detectRetentionOpportunities(
  state: ShopperSessionState,
  config: RetentionOpportunityDetectionConfig
): RetentionOpportunity[] {
  const opportunities:
    RetentionOpportunity[] = [];

  if (
    state.customerId &&
    state.converted
  ) {
    opportunities.push({
      id:
        `retention:return_purchase_signal:${state.sessionId}`,

      category:
        "retention",

      type:
        "RETURN_PURCHASE_SIGNAL",

      confidence:
        scoreReturnPurchaseSignal(
          state
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  if (
    state.converted &&
    state.currentCartValue >=
      config.highValueThreshold
  ) {
    opportunities.push({
      id:
        `retention:high_value_converted_session:${state.sessionId}`,

      category:
        "retention",

      type:
        "HIGH_VALUE_CONVERTED_SESSION",

      confidence:
        scoreHighValueRetention(
          state,
          config.highValueThreshold
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  return opportunities;
}
