/**
 * recovery-opportunity.detector.test.ts
 *
 * Responsibility:
 * Verify deterministic recovery opportunity generation.
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  detectRecoveryOpportunities,
} from "../recovery-opportunity.detector";

describe(
  "RecoveryOpportunityDetector",
  () => {
    it(
      "detects abandoned checkout",
      () => {
        const opportunities =
          detectRecoveryOpportunities({
            abandoned: true,

            purchaseIntent:
              "low",

            hesitationScore:
              0.1,

            lastActivityAt:
              "2026-01-01",

            sessionId:
              "session_1",

            shopId:
              "shop_1",

            startedAt:
              "2026-01-01",

            productViewCount: 0,
            addToCartCount: 0,
            removeFromCartCount: 0,
            cartUpdateCount: 0,
            checkoutStartCount: 0,
            hesitationSignalCount: 0,

            currentCartValue: 0,
            currentCartItemCount: 0,

            primaryFrictionType:
              "none",

            converted: false,
          });

        expect(
          opportunities.length
        ).toBe(1);

        expect(
          opportunities[0].category
        ).toBe(
          "recovery"
        );

        expect(
          opportunities[0].id
        ).toContain(
          "abandoned-checkout"
        );
      }
    );
  }
);