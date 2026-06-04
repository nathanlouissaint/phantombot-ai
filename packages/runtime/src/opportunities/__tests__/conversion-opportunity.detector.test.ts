import {
  describe,
  expect,
  it,
} from "vitest";

import {
  detectConversionOpportunities,
} from "../conversion-opportunity.detector";

const baseState = {
  shopId: "shop-1",
  sessionId: "session-1",

  startedAt:
    "2026-01-01T00:00:00Z",

  lastActivityAt:
    "2026-01-01T00:05:00Z",

  productViewCount: 10,
  addToCartCount: 2,
  removeFromCartCount: 0,
  cartUpdateCount: 0,
  checkoutStartCount: 0,
  hesitationSignalCount: 0,

  currentCartValue: 100,
  currentCartItemCount: 2,

  purchaseIntent: "high",

  primaryFrictionType:
    "none",

  hesitationScore: 0,

  converted: false,
  abandoned: false,
} as const;

describe(
  "conversion opportunity detector",
  () => {
    it(
      "detects high intent active session",
      () => {
        const opportunities =
          detectConversionOpportunities(
            baseState,
            {
              highValueThreshold:
                200,
            }
          );

        expect(
          opportunities.some(
            o =>
              o.type ===
              "HIGH_INTENT_ACTIVE_SESSION"
          )
        ).toBe(true);
      }
    );

    it(
      "detects checkout ready",
      () => {
        const opportunities =
          detectConversionOpportunities(
            {
              ...baseState,
              checkoutStartCount: 1,
            },
            {
              highValueThreshold:
                200,
            }
          );

        expect(
          opportunities.some(
            o =>
              o.type ===
              "CHECKOUT_READY"
          )
        ).toBe(true);
      }
    );

    it(
      "detects high value checkout",
      () => {
        const opportunities =
          detectConversionOpportunities(
            {
              ...baseState,
              checkoutStartCount: 1,
              currentCartValue: 500,
            },
            {
              highValueThreshold:
                250,
            }
          );

        expect(
          opportunities.some(
            o =>
              o.type ===
              "HIGH_VALUE_CHECKOUT"
          )
        ).toBe(true);
      }
    );

    it(
      "does not detect converted sessions",
      () => {
        const opportunities =
          detectConversionOpportunities(
            {
              ...baseState,
              converted: true,
            },
            {
              highValueThreshold:
                200,
            }
          );

        expect(
          opportunities
        ).toHaveLength(0);
      }
    );

    it(
      "remains deterministic",
      () => {
        const first =
          detectConversionOpportunities(
            baseState,
            {
              highValueThreshold:
                200,
            }
          );

        const second =
          detectConversionOpportunities(
            baseState,
            {
              highValueThreshold:
                200,
            }
          );

        expect(
          first
        ).toEqual(second);
      }
    );
  }
);
