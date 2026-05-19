// Converts shopper behavior into hesitation intelligence.

import { v4 as uuid } from "uuid";

import type { CommerceSession } from "../../commerce/domain/session.types";

import type { BehaviorSignal } from "../domain/behavior-signal.types";

export function detectHesitation(
  session: CommerceSession
): BehaviorSignal | null {
  const hasCartValue =
    session.commerce.cartValue > 0;

  const checkoutStarted =
    session.commerce.checkoutStarted;

  const highEngagement =
    session.behavior.engagementDepth >= 1;

  const hesitationScore =
    Number(hasCartValue) * 30 +
    Number(checkoutStarted) * 40 +
    Number(highEngagement) * 30;

  if (hesitationScore < 60) {
    return null;
  }

  return {
    id: uuid(),

    shopId: session.shopId,

    sessionId: session.id,

    type: "hesitation",

    confidence: hesitationScore,

    reason:
      "High-intent shopper stalled during purchase flow.",

    contributingEventIds:
      session.timeline.map((event) => event.id),

    createdAt: new Date().toISOString(),
  };
}