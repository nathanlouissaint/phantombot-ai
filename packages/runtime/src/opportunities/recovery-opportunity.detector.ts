/**
 * recovery-opportunity.detector.ts
 *
 * Responsibility:
 * Detect deterministic recovery opportunities.
 *
 * Owns:
 * - recovery signal detection
 * - opportunity generation
 * - recovery classification
 *
 * Does NOT Own:
 * - workflow execution
 * - AI reasoning
 * - persistence
 * - opportunity scoring
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
  scoreAbandonment,
  scoreHesitation,
} from "./opportunity-score";

import {
  RecoveryOpportunity,
} from "./recovery-opportunity.types";

export function detectRecoveryOpportunities(
  state: ShopperSessionState
): RecoveryOpportunity[] {
  const opportunities:
    RecoveryOpportunity[] = [];

  if (
    state.abandoned
  ) {
    opportunities.push({
      id:
        `abandoned-checkout-${state.sessionId}`,

      category:
        "recovery",

      type:
        "ABANDONED_CHECKOUT",

      confidence:
        scoreAbandonment(
          state
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  if (
    state.hesitationScore >=
    0.5
  ) {
    opportunities.push({
      id:
        `high-hesitation-${state.sessionId}`,

      category:
        "recovery",

      type:
        "HIGH_HESITATION",

      confidence:
        scoreHesitation(
          state
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  if (
    state.purchaseIntent ===
      "high" &&
    state.abandoned
  ) {
    opportunities.push({
      id:
        `high-intent-abandonment-${state.sessionId}`,

      category:
        "recovery",

      type:
        "HIGH_INTENT_ABANDONMENT",

      confidence:
        scoreAbandonment(
          state
        ),

      detectedAt:
        state.lastActivityAt,
    });
  }

  return opportunities;
}