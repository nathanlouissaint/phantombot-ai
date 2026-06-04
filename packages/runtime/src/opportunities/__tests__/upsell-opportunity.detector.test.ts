import {
  describe,
  expect,
  it,
} from "vitest";

import {
  detectUpsellOpportunities,
} from "../upsell-opportunity.detector";

const baseState = {
  shopId: "shop-1",
  sessionId: "session-1",

  startedAt:
    "2026-01-01T00:00:00Z",

  lastActivityAt:
    "2026-01-01T00:05:00Z",

  productViewCount: 10,
  addToCartCount: 3,
  removeFromCartCount: 0,
  cartUpdateCount: 0,
  checkoutStartCount: 0,
  hesitationSignalCount: 0,

  currentCartValue: 300,
  currentCartItemCount: 3,

  purchaseIntent: "high",

  primaryFrictionType:
    "none",

  hesitationScore: 0,

  converted: false,
  abandoned: false,
} as const;

describe(
  "upsell opportunity detector",
  () => {
    it(
      "detects high value cart expansion",
      () => {
        const opportunities =
          detectUpsellOpportunities(
            baseState,
            {
              highValueThreshold:
                250,

              multiItemThreshold:
                5,
            }
          );

        expect(
          opportunities.some(
            opportunity =>
              opportunity.type ===
              "HIGH_VALUE_CART_EXPANSION"
          )
        ).toBe(true);
      }
    );

    it(
      "detects multi item expansion",
      () => {
        const opportunities =
          detectUpsellOpportunities(
            baseState,
            {
              highValueThreshold:
                500,

              multiItemThreshold:
                3,
            }
          );

        expect(
          opportunities.some(
            opportunity =>
              opportunity.type ===
              "MULTI_ITEM_EXPANSION"
          )
        ).toBe(true);
      }
    );

    it(
      "does not detect converted sessions",
      () => {
        const opportunities =
          detectUpsellOpportunities(
            {
              ...baseState,
              converted: true,
            },
            {
              highValueThreshold:
                250,

              multiItemThreshold:
                3,
            }
          );

        expect(
          opportunities
        ).toHaveLength(0);
      }
    );

    it(
      "does not detect abandoned sessions",
      () => {
        const opportunities =
          detectUpsellOpportunities(
            {
              ...baseState,
              abandoned: true,
            },
            {
              highValueThreshold:
                250,

              multiItemThreshold:
                3,
            }
          );

        expect(
          opportunities
        ).toHaveLength(0);
      }
    );

    it(
      "respects high value threshold",
      () => {
        const opportunities =
          detectUpsellOpportunities(
            {
              ...baseState,
              currentCartValue: 100,
            },
            {
              highValueThreshold:
                250,

              multiItemThreshold:
                5,
            }
          );

        expect(
          opportunities.some(
            opportunity =>
              opportunity.type ===
              "HIGH_VALUE_CART_EXPANSION"
          )
        ).toBe(false);
      }
    );

    it(
      "respects multi item threshold",
      () => {
        const opportunities =
          detectUpsellOpportunities(
            {
              ...baseState,
              currentCartItemCount: 1,
            },
            {
              highValueThreshold:
                500,

              multiItemThreshold:
                3,
            }
          );

        expect(
          opportunities.some(
            opportunity =>
              opportunity.type ===
              "MULTI_ITEM_EXPANSION"
          )
        ).toBe(false);
      }
    );

    it(
      "remains deterministic",
      () => {
        const config = {
          highValueThreshold:
            250,

          multiItemThreshold:
            3,
        };

        const first =
          detectUpsellOpportunities(
            baseState,
            config
          );

        const second =
          detectUpsellOpportunities(
            baseState,
            config
          );

        expect(
          first
        ).toEqual(second);
      }
    );
  }
);
