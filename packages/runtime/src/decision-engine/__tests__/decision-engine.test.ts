import {
  describe,
  expect,
  it,
} from "vitest";

import {
  evaluateDecisions,
} from "../decision-engine";

import type {
  Opportunity,
} from "../../opportunities/opportunity.types";

describe(
  "decision engine",
  () => {
    it(
      "produces deterministic decisions",
      () => {
        const opportunities:
          Opportunity[] = [
            {
              id:
                "opportunity-1",

              category:
                "conversion",

              type:
                "CHECKOUT_READY",

              confidence:
                0.9,

              detectedAt:
                "2026-01-01T00:00:00Z",
            },
          ];

        const first =
          evaluateDecisions(
            opportunities,
          );

        const second =
          evaluateDecisions(
            opportunities,
          );

        expect(first)
          .toEqual(second);
      },
    );
  },
);