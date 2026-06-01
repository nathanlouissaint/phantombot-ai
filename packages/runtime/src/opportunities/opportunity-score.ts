/**
 * opportunity-score.ts
 *
 * Responsibility:
 * Provide deterministic opportunity confidence scoring.
 *
 * Owns:
 * - recovery confidence scoring
 * - abandonment confidence scoring
 * - hesitation confidence scoring
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

export function scoreHesitation(
  state: ShopperSessionState
): number {
  return Math.min(
    state.hesitationScore,
    1
  );
}