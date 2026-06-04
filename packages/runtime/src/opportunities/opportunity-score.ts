/**
 * opportunity-score.ts
 *
 * Responsibility:
 * Provide deterministic opportunity confidence scoring.
 *
 * Owns:
 * - recovery confidence scoring
 * - conversion confidence scoring
 * - upsell confidence scoring
 *
 * Does NOT Own:
 * - opportunity detection
 * - workflow execution
 * - AI reasoning
 *
 * Critical Rules:
 * - scoring must remain deterministic
 * - scoring must remain replay-safe
 * - scoring must never use wall-clock data
 */

import {
  ShopperSessionState,
} from "@phantombot/contracts";

/**
 * Score abandoned checkout recovery.
 *
 * Higher confidence when the session is
 * abandoned, intent is high, and hesitation
 * signals are present.
 */
export function scoreAbandonment(
  state: ShopperSessionState
): number {
  let score = 0;

  if (state.abandoned) {
    score += 0.5;
  }

  if (
    state.purchaseIntent === "high"
  ) {
    score += 0.3;
  }

  score +=
    state.hesitationScore * 0.2;

  return Math.min(score, 1);
}

/**
 * Score hesitation recovery.
 *
 * Confidence directly follows the normalized
 * hesitation score from deterministic session
 * intelligence.
 */
export function scoreHesitation(
  state: ShopperSessionState
): number {
  return Math.min(
    state.hesitationScore,
    1
  );
}

/**
 * Score active conversion intent.
 *
 * Measures whether a shopper appears likely
 * to convert based on high intent and cart
 * presence.
 */
export function scoreConversionIntent(
  state: ShopperSessionState
): number {
  let score = 0;

  if (
    state.purchaseIntent === "high"
  ) {
    score += 0.7;
  }

  if (
    state.currentCartValue > 0
  ) {
    score += 0.2;
  }

  if (
    state.currentCartItemCount > 0
  ) {
    score += 0.1;
  }

  return Math.min(score, 1);
}

/**
 * Score checkout readiness.
 *
 * Rewards sessions that have high purchase
 * intent and have already started checkout.
 */
export function scoreCheckoutReadiness(
  state: ShopperSessionState
): number {
  let score = 0.5;

  if (
    state.purchaseIntent === "high"
  ) {
    score += 0.3;
  }

  if (
    state.checkoutStartCount > 0
  ) {
    score += 0.2;
  }

  return Math.min(score, 1);
}

/**
 * Score high-value checkout.
 *
 * Confidence increases as current cart value
 * approaches or exceeds the configured
 * high-value threshold.
 */
export function scoreHighValueCheckout(
  state: ShopperSessionState,
  threshold: number
): number {
  const valueRatio =
    Math.min(
      state.currentCartValue /
        threshold,
      1
    );

  return Math.min(
    0.5 + valueRatio * 0.5,
    1
  );
}

/**
 * Score high-value cart expansion.
 *
 * Confidence increases when a shopper has
 * high intent and a cart value near or above
 * the configured upsell threshold.
 */
export function scoreCartExpansion(
  state: ShopperSessionState,
  threshold: number
): number {
  let score = 0;

  if (
    state.purchaseIntent === "high"
  ) {
    score += 0.4;
  }

  const valueRatio =
    Math.min(
      state.currentCartValue /
        threshold,
      1
    );

  score +=
    valueRatio * 0.6;

  return Math.min(score, 1);
}

/**
 * Score multi-item expansion.
 *
 * Confidence increases as cart item count
 * approaches or exceeds the configured
 * multi-item threshold.
 */
export function scoreMultiItemExpansion(
  state: ShopperSessionState,
  threshold: number
): number {
  const itemRatio =
    Math.min(
      state.currentCartItemCount /
        threshold,
      1
    );

  return Math.min(
    0.4 + itemRatio * 0.6,
    1
  );
}
/**
 * Score repeat purchase potential.
 *
 * Customer identity combined with
 * successful conversion increases
 * future retention potential.
 */
export function scoreReturnPurchaseSignal(
  state: ShopperSessionState
): number {
  let score = 0;

  if (state.customerId) {
    score += 0.5;
  }

  if (state.converted) {
    score += 0.5;
  }

  return Math.min(score, 1);
}

/**
 * Score high-value retention opportunity.
 *
 * Larger converted orders are more
 * valuable for future retention.
 */
export function scoreHighValueRetention(
  state: ShopperSessionState,
  threshold: number
): number {
  const valueRatio =
    Math.min(
      state.currentCartValue /
        threshold,
      1
    );

  return Math.min(
    0.5 + valueRatio * 0.5,
    1
  );
}
