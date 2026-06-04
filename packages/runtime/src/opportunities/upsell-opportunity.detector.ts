/**
 * upsell-opportunity.detector.ts
 *
 * Responsibility:
 * Detect deterministic upsell opportunities.
 *
 * Owns:
 * - upsell signal detection
 * - opportunity generation
 * - upsell classification
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
  scoreCartExpansion,
  scoreMultiItemExpansion,
} from "./opportunity-score";

import {
  UpsellOpportunity,
  UpsellOpportunityDetectionConfig,
} from "./upsell-opportunity.types";

/**
 * Detect upsell opportunities from
 * deterministic shopper session state.
 */
export function detectUpsellOpportunities(
  state: ShopperSessionState,
  config: UpsellOpportunityDetectionConfig
): UpsellOpportunity[] {
  const opportunities:
    UpsellOpportunity[] = [];

  /**
   * Shopper has high intent and a high-value
   * cart, making them a candidate for premium
   * offers or cart expansion.
   */
  if (
    state.purchaseIntent === "high" &&
    state.currentCartValue >=
      config.highValueThreshold &&
    !state.converted &&
    !state.abandoned
  ) {
    opportunities.push({
      id:
        `upsell:high_value_cart_expansion:${state.sessionId}`,

      category:
        "upsell",

      type:
        "HIGH_VALUE_CART_EXPANSION",

      confidence:
        scoreCartExpansion(
          state,
          config.highValueThreshold
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  /**
   * Shopper already has multiple items in cart,
   * making them a candidate for bundle or add-on
   * expansion.
   */
  if (
    state.currentCartItemCount >=
      config.multiItemThreshold &&
    !state.converted &&
    !state.abandoned
  ) {
    opportunities.push({
      id:
        `upsell:multi_item_expansion:${state.sessionId}`,

      category:
        "upsell",

      type:
        "MULTI_ITEM_EXPANSION",

      confidence:
        scoreMultiItemExpansion(
          state,
          config.multiItemThreshold
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  return opportunities;
}
