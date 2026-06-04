import {
  describe,
  expect,
  it,
} from "vitest";

import {
  evaluateOpportunities,
} from "../opportunity-engine";

const baseState = {
  shopId: "shop-1",
  sessionId: "session-1",

  customerId: "customer-1",

  startedAt:
    "2026-01-01T00:00:00Z",

  lastActivityAt:
    "2026-01-01T00:05:00Z",

  productViewCount: 20,
  addToCartCount: 4,
  removeFromCartCount: 0,
  cartUpdateCount: 0,
  checkoutStartCount: 1,
  hesitationSignalCount: 5,

  currentCartValue: 500,
  currentCartItemCount: 5,

  purchaseIntent: "high",

  primaryFrictionType:
    "none",

  hesitationScore: 0.8,

  converted: true,
  abandoned: false,
} as const;

const config = {
  conversion: {
    highValueThreshold: 250,
  },

  upsell: {
    highValueThreshold: 250,
    multiItemThreshold: 3,
  },

  retention: {
    highValueThreshold: 250,
  },
};

describe(
  "opportunity engine",
  () => {
    it(
      "returns opportunities",
      () => {
        const opportunities =
          evaluateOpportunities(
            baseState,
            config
          );

        expect(
          opportunities.length
        ).toBeGreaterThan(0);
      }
    );

    it(
      "returns opportunity contracts",
      () => {
        const opportunities =
          evaluateOpportunities(
            baseState,
            config
          );

        for (
          const opportunity
          of opportunities
        ) {
          expect(
            opportunity.id
          ).toBeDefined();

          expect(
            opportunity.category
          ).toBeDefined();

          expect(
            opportunity.type
          ).toBeDefined();

          expect(
            opportunity.confidence
          ).toBeDefined();

          expect(
            opportunity.detectedAt
          ).toBeDefined();
        }
      }
    );

    it(
      "remains deterministic",
      () => {
        const first =
          evaluateOpportunities(
            baseState,
            config
          );

        const second =
          evaluateOpportunities(
            baseState,
            config
          );

        expect(
          first
        ).toEqual(second);
      }
    );

    it(
      "returns only replay-safe data",
      () => {
        const opportunities =
          evaluateOpportunities(
            baseState,
            config
          );

        expect(
          JSON.parse(
            JSON.stringify(
              opportunities
            )
          )
        ).toEqual(
          opportunities
        );
      }
    );
  }
);
