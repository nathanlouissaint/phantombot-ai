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
        const opportunities: Opportunity[] = [
          {
            id: "opportunity-1",
            category: "conversion",
            type: "CHECKOUT_READY",
            confidence: 0.9,
            detectedAt: "2026-01-01T00:00:00Z",
          },
        ];

        expect(
          evaluateDecisions(opportunities),
        ).toEqual(
          evaluateDecisions(opportunities),
        );
      },
    );

    it(
      "filters ineligible opportunities",
      () => {
        const opportunities: Opportunity[] = [
          {
            id: "weak-opportunity",
            category: "upsell",
            type: "LOW_CONFIDENCE_UPSELL",
            confidence: 0.2,
            detectedAt: "2026-01-01T00:00:00Z",
          },
        ];

        expect(
          evaluateDecisions(opportunities),
        ).toEqual([]);
      },
    );

    it(
      "assigns category-specific actions",
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
            id: "conversion-1",
            category: "conversion",
            type: "CHECKOUT_READY",
            confidence: 0.9,
            detectedAt: "2026-01-01T00:00:00Z",
          },
          {
            id: "upsell-1",
            category: "upsell",
            type: "BUNDLE_READY",
            confidence: 0.9,
            detectedAt: "2026-01-01T00:00:00Z",
          },
          {
            id: "retention-1",
            category: "retention",
            type: "CHURN_RISK",
            confidence: 0.9,
            detectedAt: "2026-01-01T00:00:00Z",
          },
        ];

        const actions =
          evaluateDecisions(
            opportunities,
          ).map(
            decision =>
              decision.action,
          );

        expect(actions)
          .toContain(
            "recover_session",
          );

        expect(actions)
          .toContain(
            "protect_retention",
          );

        expect(actions)
          .toContain(
            "advance_conversion",
          );

        expect(actions)
          .not.toContain(
            "present_upsell",
          );
      },
    );

    it(
      "prioritizes recovery conflicts above other categories",
      () => {
        const opportunities: Opportunity[] = [
          {
            id: "conversion-1",
            category: "conversion",
            type: "CHECKOUT_READY",
            confidence: 0.95,
            detectedAt: "2026-01-01T00:00:00Z",
          },
          {
            id: "recovery-1",
            category: "recovery",
            type: "ABANDONED_SESSION",
            confidence: 0.85,
            detectedAt: "2026-01-01T00:00:00Z",
          },
        ];

        const decisions =
          evaluateDecisions(
            opportunities,
          );

        expect(
          decisions[0],
        ).toMatchObject({
          opportunityId:
            "recovery-1",
          priority:
            "critical",
          action:
            "recover_session",
        });
      },
    );

    it(
      "uses deterministic id ordering as final conflict tiebreaker",
      () => {
        const opportunities: Opportunity[] = [
          {
            id: "b-opportunity",
            category: "upsell",
            type: "BUNDLE_READY",
            confidence: 0.6,
            detectedAt: "2026-01-01T00:00:00Z",
          },
          {
            id: "a-opportunity",
            category: "upsell",
            type: "BUNDLE_READY",
            confidence: 0.6,
            detectedAt: "2026-01-01T00:00:00Z",
          },
        ];

        expect(
          evaluateDecisions(
            opportunities,
          ).map(
            decision =>
              decision.id,
          ),
        ).toEqual([
          "decision:a-opportunity",
          "decision:b-opportunity",
        ]);
      },
    );
  },
);