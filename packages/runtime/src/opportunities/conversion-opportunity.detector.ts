/**
 * conversion-opportunity.detector.ts
 *
 * Responsibility:
 * Detect deterministic conversion opportunities.
 *
 * Owns:
 * - conversion signal detection
 * - opportunity generation
 * - conversion classification
 *
 * Does NOT Own:
 * - workflow execution
 * - AI reasoning
 * - persistence
 * - confidence scoring
 *
 * Critical Rules:
 * - detection must remain deterministic
 * - detection must remain replay-safe
 * - detection must never use wall-clock data
 */

import {
  ShopperSessionState,
} from "@phantombot/contracts";

import {
  scoreConversionIntent,
  scoreCheckoutReadiness,
  scoreHighValueCheckout,
} from "./opportunity-score";

import {
  ConversionOpportunity,
  ConversionOpportunityDetectionConfig,
} from "./conversion-opportunity.types";

/**
 * Detect conversion opportunities from
 * deterministic behavioral state.
 */
export function detectConversionOpportunities(
  state: ShopperSessionState,
  config: ConversionOpportunityDetectionConfig
): ConversionOpportunity[] {
  const opportunities:
    ConversionOpportunity[] = [];

  /**
   * Shopper shows strong buying intent
   * but has not entered checkout.
   */
  if (
    state.purchaseIntent === "high" &&
    state.checkoutStartCount === 0 &&
    !state.converted &&
    !state.abandoned
  ) {
    opportunities.push({
      id:
        `conversion:high_intent_active_session:${state.sessionId}`,

      category:
        "conversion",

      type:
        "HIGH_INTENT_ACTIVE_SESSION",

      confidence:
        scoreConversionIntent(
          state
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  /**
   * Shopper has entered checkout
   * and remains active.
   */
  if (
    state.purchaseIntent === "high" &&
    state.checkoutStartCount > 0 &&
    !state.converted &&
    !state.abandoned
  ) {
    opportunities.push({
      id:
        `conversion:checkout_ready:${state.sessionId}`,

      category:
        "conversion",

      type:
        "CHECKOUT_READY",

      confidence:
        scoreCheckoutReadiness(
          state
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  /**
   * Shopper has a large cart
   * and has started checkout.
   */
  if (
    state.currentCartValue >=
      config.highValueThreshold &&
    state.checkoutStartCount > 0 &&
    !state.converted &&
    !state.abandoned
  ) {
    opportunities.push({
      id:
        `conversion:high_value_checkout:${state.sessionId}`,

      category:
        "conversion",

      type:
        "HIGH_VALUE_CHECKOUT",

      confidence:
        scoreHighValueCheckout(
          state,
          config.highValueThreshold
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  return opportunities;
}
