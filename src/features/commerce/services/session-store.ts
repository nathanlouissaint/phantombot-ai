// Owns session creation, timeline reconstruction, and behavioral state updates.

import type { PhantomEvent } from "../../events/domain/event.types";
import type { CommerceSession } from "../domain/session.types";

const sessions = new Map<string, CommerceSession>();

export function getOrCreateSession(
  event: PhantomEvent
): CommerceSession {
  const existing = sessions.get(event.sessionId);

  if (existing) {
    return existing;
  }

  const session: CommerceSession = {
    id: event.sessionId,

    shopId: event.shopId,

    shopper: {
      anonymousId: event.payload.anonymousId as string | undefined,
      lifecycleStage: "unknown",
    },

    attribution: {},

    commerce: {
      cartValue: 0,
      cartItems: [],
      productViews: [],
      checkoutStarted: false,
    },

    behavior: {
      hesitationScore: 0,
      trustScore: 100,
      intentScore: 0,
      engagementDepth: 0,
    },

    timeline: [],

    updatedAt: new Date().toISOString(),
  };

  sessions.set(session.id, session);

  return session;
}

export function updateSessionFromEvent(
  event: PhantomEvent
): CommerceSession {
  const session = getOrCreateSession(event);

  session.timeline.push(event);

  session.updatedAt = new Date().toISOString();

  if (event.type === "shopper.product_viewed") {
    const productId = event.payload.productId as string;

    if (
      productId &&
      !session.commerce.productViews.includes(productId)
    ) {
      session.commerce.productViews.push(productId);
    }

    session.behavior.engagementDepth += 1;
    session.behavior.intentScore += 10;
  }

  if (event.type === "shopper.cart_updated") {
    session.commerce.cartValue = Number(
      event.payload.cartValue ?? 0
    );

    session.behavior.intentScore += 25;
  }

  if (event.type === "shopper.checkout_started") {
    session.commerce.checkoutStarted = true;

    session.behavior.intentScore += 40;
  }

  sessions.set(session.id, session);

  return session;
}

export function getSession(sessionId: string) {
  return sessions.get(sessionId);
}