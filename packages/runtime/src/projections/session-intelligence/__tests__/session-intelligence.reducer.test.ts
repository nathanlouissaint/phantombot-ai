/**
 * session-intelligence.reducer.test.ts
 *
 * Responsibility:
 * Verify deterministic behavioral intelligence mutation.
 *
 * Owns:
 * - reducer correctness verification
 * - replay-safe state verification
 * - intelligence score verification
 *
 * Does NOT Own:
 * - projection orchestration
 * - database persistence
 * - runtime execution
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  reduceSessionState,
} from "../session-intelligence.reducer";

import {
  ShopperSessionState,
} from "@phantombot/contracts";

const INITIAL_STATE: ShopperSessionState = {
  shopId: "shop_1",
  sessionId: "session_1",

  startedAt:
    "2026-01-01T00:00:00.000Z",

  lastActivityAt:
    "2026-01-01T00:00:00.000Z",

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

describe(
  "SessionIntelligenceReducer",
  () => {
    it(
      "increments product views",
      () => {
        const next =
          reduceSessionState(
            INITIAL_STATE,
            {
              eventType:
                "PRODUCT_VIEWED",

              shopId:
                "shop_1",

              sessionId:
                "session_1",

              occurredAt:
                "2026-01-01T01:00:00.000Z",

              payload: {},
            } as any
          );

        expect(
          next.productViewCount
        ).toBe(1);
      }
    );

    it(
      "marks session converted",
      () => {
        const next =
          reduceSessionState(
            INITIAL_STATE,
            {
              eventType:
                "ORDER_CREATED",

              shopId:
                "shop_1",

              sessionId:
                "session_1",

              occurredAt:
                "2026-01-01T01:00:00.000Z",

              payload: {},
            } as any
          );

        expect(
          next.converted
        ).toBe(true);
      }
    );

    it(
      "marks session abandoned",
      () => {
        const next =
          reduceSessionState(
            INITIAL_STATE,
            {
              eventType:
                "CHECKOUT_ABANDONED",

              shopId:
                "shop_1",

              sessionId:
                "session_1",

              occurredAt:
                "2026-01-01T01:00:00.000Z",

              payload: {},
            } as any
          );

        expect(
          next.abandoned
        ).toBe(true);
      }
    );
  }
);