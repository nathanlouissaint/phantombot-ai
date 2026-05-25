/**
 * session-intelligence.reducer.ts
 *
 * Responsibility:
 * Provide deterministic shopper session state mutation.
 *
 * Owns:
 * - replay-safe state transitions
 * - deterministic behavioral accumulation
 * - canonical event mutation handling
 * - intelligence state mutation
 *
 * Does NOT Own:
 * - database persistence
 * - projection orchestration
 * - runtime coordination
 * - workflow execution
 */

import {
  CommerceEventEnvelope,
  ShopperSessionState,
} from "@phantombot/contracts";

import {
  computeHesitationScore,
  computePurchaseIntent,
  classifyFriction,
} from "./session-intelligence.helpers";

export function reduceSessionState(
  current: ShopperSessionState,
  event: CommerceEventEnvelope<Record<string, unknown>>
): ShopperSessionState {
  const next: ShopperSessionState = {
    ...current,
    lastActivityAt: event.occurredAt,
  };

  switch (event.eventType) {
    case "PRODUCT_VIEWED":
      next.productViewCount += 1;
      break;

    case "PRODUCT_ADDED_TO_CART":
      next.addToCartCount += 1;
      break;

    case "PRODUCT_REMOVED_FROM_CART":
      next.removeFromCartCount += 1;
      break;

    case "CART_UPDATED": {
      const payload = event.payload as {
        totalValue: number;
        itemCount: number;
        currency: string;
      };

      next.currentCartValue = payload.totalValue;
      next.currentCartItemCount = payload.itemCount;
      next.currency = payload.currency;

      next.cartUpdateCount += 1;
      break;
    }

    case "CHECKOUT_STARTED":
      next.checkoutStartCount += 1;
      break;

    case "CHECKOUT_HESITATED":
      next.hesitationSignalCount += 1;
      break;

    case "CHECKOUT_ABANDONED":
      next.abandoned = true;
      break;

    case "ORDER_CREATED":
      next.converted = true;
      break;
  }

  next.purchaseIntent = computePurchaseIntent(
    next.productViewCount,
    next.addToCartCount,
    next.checkoutStartCount
  );

  next.hesitationScore = computeHesitationScore(
    next.hesitationSignalCount,
    next.removeFromCartCount,
    next.checkoutStartCount
  );

  next.primaryFrictionType = classifyFriction(
    next.hesitationScore
  );

  return next;
}