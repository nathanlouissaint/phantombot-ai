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
 * - wall clock ownership
 *
 * Critical Rules:
 * - projection state must remain deterministic
 * - projection initialization must remain replay-safe
 * - projections must never generate timestamps
 */

import {
  CommerceEventEnvelope,
  ShopperSessionState,
} from "@phantombot/contracts";

import {
  reduceSessionState,
} from "./session-intelligence.reducer";

export class SessionIntelligenceProjection {
  createInitialState({
    shopId,
    sessionId,
    startedAt,
  }: {
    shopId: string;
    sessionId: string;
    startedAt: string;
  }): ShopperSessionState {
    return {
      shopId,
      sessionId,

      startedAt,
      lastActivityAt: startedAt,

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
    return reduceSessionState(
      current,
      event
    );
  }
}