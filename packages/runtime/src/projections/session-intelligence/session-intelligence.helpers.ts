/**
 * session-intelligence.helpers.ts
 *
 * Responsibility:
 * Provide deterministic behavioral intelligence calculations.
 *
 * Owns:
 * - hesitation scoring
 * - purchase intent scoring
 * - friction classification
 * - deterministic behavioral heuristics
 *
 * Does NOT Own:
 * - projection orchestration
 * - runtime persistence
 * - AI reasoning
 * - workflow generation
 */

import {
  ShopperFrictionType,
  PurchaseIntentLevel,
} from "@phantombot/contracts";

export function clampScore(
  value: number,
  min = 0,
  max = 1
): number {
  return Math.max(min, Math.min(max, value));
}

export function computePurchaseIntent(
  productViews: number,
  addToCartCount: number,
  checkoutStarts: number
): PurchaseIntentLevel {
  const score =
    productViews * 0.1 +
    addToCartCount * 0.4 +
    checkoutStarts * 0.8;

  if (score >= 2.5) {
    return "high";
  }

  if (score >= 1.2) {
    return "medium";
  }

  if (score > 0) {
    return "low";
  }

  return "unknown";
}

export function computeHesitationScore(
  hesitationSignals: number,
  removeFromCartCount: number,
  checkoutStarts: number
): number {
  const score =
    hesitationSignals * 0.25 +
    removeFromCartCount * 0.15 +
    checkoutStarts * 0.1;

  return clampScore(score);
}

export function classifyFriction(
  hesitationScore: number
): ShopperFrictionType {
  if (hesitationScore >= 0.8) {
    return "trust";
  }

  if (hesitationScore >= 0.5) {
    return "price";
  }

  if (hesitationScore >= 0.3) {
    return "decision";
  }

  return "none";
}