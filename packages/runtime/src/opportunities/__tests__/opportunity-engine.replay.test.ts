import {
  describe,
  expect,
  it,
} from "vitest";

import {
  evaluateOpportunities,
} from "../opportunity-engine";

import type {
  ShopperSessionState,
} from "@phantombot/contracts";

describe(
  "opportunity engine replay determinism",
  () => {
    it(
      "produces identical opportunities for identical state",
      () => {
        const state: ShopperSessionState = {
          shopId: "shop-1",

          sessionId: "session-1",

          startedAt:
            "2026-06-01T00:00:00Z",

          lastActivityAt:
            "2026-06-01T00:05:00Z",

          productViewCount: 10,

          addToCartCount: 3,

          removeFromCartCount: 0,

          cartUpdateCount: 0,

          checkoutStartCount: 1,

          hesitationSignalCount: 0,

          currentCartValue: 250,

          currentCartItemCount: 3,

          purchaseIntent: "high",

          primaryFrictionType:
            "none",

          hesitationScore: 0.7,

          converted: false,

          abandoned: false,
        };

        const config = {
          conversion: {
            highValueThreshold: 100,
          },

          upsell: {
            highValueThreshold: 100,

            multiItemThreshold: 2,
          },

          retention: {
            highValueThreshold: 100,
          },
        };

        const first =
          evaluateOpportunities(
            state,
            config,
          );

        const second =
          evaluateOpportunities(
            state,
            config,
          );

        expect(first)
          .toEqual(second);
      },
    );
  },
);