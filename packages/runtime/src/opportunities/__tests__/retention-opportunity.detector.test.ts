import {
  describe,
  expect,
  it,
} from "vitest";

import {
  detectRetentionOpportunities,
} from "../retention-opportunity.detector";

const baseState = {
  shopId: "shop-1",
  sessionId: "session-1",

  customerId: "customer-1",

  startedAt:
    "2026-01-01T00:00:00Z",

  lastActivityAt:
    "2026-01-01T00:05:00Z",

  productViewCount: 10,
  addToCartCount: 2,
  removeFromCartCount: 0,
  cartUpdateCount: 0,
  checkoutStartCount: 1,
  hesitationSignalCount: 0,

  currentCartValue: 500,
  currentCartItemCount: 2,

  purchaseIntent: "high",

  primaryFrictionType:
    "none",

  hesitationScore: 0,

  converted: true,
  abandoned: false,
} as const;

describe(
  "retention opportunity detector",
  () => {
    it(
      "detects return purchase signal",
      () => {
        const opportunities =
          detectRetentionOpportunities(
            baseState,
            {
              highValueThreshold:
                250,
            }
          );

        expect(
          opportunities.some(
            o =>
              o.type ===
              "RETURN_PURCHASE_SIGNAL"
          )
        ).toBe(true);
      }
    );

    it(
      "detects high value converted session",
      () => {
        const opportunities =
          detectRetentionOpportunities(
            baseState,
            {
              highValueThreshold:
                250,
            }
          );

        expect(
          opportunities.some(
            o =>
              o.type ===
              "HIGH_VALUE_CONVERTED_SESSION"
          )
        ).toBe(true);
      }
    );

    it(
      "respects threshold",
      () => {
        const opportunities =
          detectRetentionOpportunities(
            {
              ...baseState,
              currentCartValue: 50,
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
              "HIGH_VALUE_CONVERTED_SESSION"
          )
        ).toBe(false);
      }
    );

    it(
      "remains deterministic",
      () => {
        const first =
          detectRetentionOpportunities(
            baseState,
            {
              highValueThreshold:
                250,
            }
          );

        const second =
          detectRetentionOpportunities(
            baseState,
            {
              highValueThreshold:
                250,
            }
          );

        expect(
          first
        ).toEqual(second);
      }
    );
  }
);
