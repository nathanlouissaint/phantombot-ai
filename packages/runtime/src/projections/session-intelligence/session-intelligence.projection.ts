/**
 * session-intelligence.projection.ts
 *
 * Responsibility:
 * Define deterministic shopper session intelligence projection.
 *
 * Owns:
 * - shopper intelligence projection lifecycle
 * - deterministic projection processing
 * - replay-safe state accumulation
 * - canonical commerce event processing
 *
 * Does NOT Own:
 * - workflow orchestration
 * - AI generation
 * - database ownership
 * - runtime leasing
 */

import {
  CommerceEventEnvelope,
  ShopperSessionState,
} from "@phantombot/contracts";

import {
  reduceSessionState,
} from "./session-intelligence.reducer";

export class SessionIntelligenceProjection {
  createInitialState(
    shopId: string,
    sessionId: string
  ): ShopperSessionState {
    return {
      shopId,
      sessionId,

      startedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),

      productViewCount: 0,
      addToCartCount: 0,
      removeFromCartCount: 0,
      cartUpdateCount: 0,
      checkoutStartCount: 0,
      hesitationSignalCount: 0,

      currentCartValue: 0,
      currentCartItemCount: 0,

      purchaseIntent: "unknown",
      primaryFrictionType: "none",
      hesitationScore: 0,

      converted: false,
      abandoned: false,
    };
  }

  process(
    current: ShopperSessionState,
    event: CommerceEventEnvelope<Record<string, unknown>>
  ): ShopperSessionState {
    return reduceSessionState(current, event);
  }
}