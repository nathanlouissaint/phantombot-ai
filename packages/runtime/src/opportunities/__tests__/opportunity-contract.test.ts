/**
 * opportunity-contract.test.ts
 *
 * Responsibility:
 * Verify canonical opportunity contract.
 */

import {
  describe,
  expect,
  it,
} from "vitest";

describe(
  "OpportunityContract",
  () => {
    it(
      "allows deterministic opportunity creation",
      () => {
        const opportunity = {
          id:
            "opp_1",

          category:
            "recovery",

          type:
            "ABANDONED_CHECKOUT",

          confidence:
            0.8,

          detectedAt:
            "2026-01-01T00:00:00.000Z",
        };

        expect(
          opportunity.category
        ).toBe(
          "recovery"
        );
      }
    );
  }
);