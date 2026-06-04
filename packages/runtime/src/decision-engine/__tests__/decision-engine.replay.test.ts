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
  "decision engine replay",
  () => {
    it(
      "produces identical decisions across repeated evaluations",
      () => {
        const opportunities: Opportunity[] = [
          {
            id: "recovery-1",
            category: "recovery",
            type: "ABANDONED_SESSION",
            confidence: 0.9,
            detectedAt: "2026-01-01T00:00:00Z",
          },
          {
            id: "upsell-1",
            category: "upsell",
            type: "BUNDLE_READY",
            confidence: 0.7,
            detectedAt: "2026-01-01T00:00:00Z",
          },
        ];

        const run1 =
          evaluateDecisions(opportunities);

        const run2 =
          evaluateDecisions(opportunities);

        const run3 =
          evaluateDecisions(opportunities);

        expect(run1).toEqual(run2);
        expect(run2).toEqual(run3);
      },
    );
  },
);
