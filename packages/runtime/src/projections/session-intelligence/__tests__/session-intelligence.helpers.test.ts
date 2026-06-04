/**
 * session-intelligence.helpers.test.ts
 *
 * Responsibility:
 * Verify deterministic behavioral intelligence calculations.
 *
 * Owns:
 * - purchase intent verification
 * - hesitation score verification
 * - friction classification verification
 *
 * Does NOT Own:
 * - projection orchestration
 * - runtime execution
 * - persistence
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  classifyFriction,
  computeHesitationScore,
  computePurchaseIntent,
} from "../session-intelligence.helpers";

describe(
  "SessionIntelligenceHelpers",
  () => {
    it(
      "classifies unknown intent",
      () => {
        expect(
          computePurchaseIntent(
            0,
            0,
            0
          )
        ).toBe(
          "unknown"
        );
      }
    );

    it(
      "classifies low intent",
      () => {
        expect(
          computePurchaseIntent(
            1,
            0,
            0
          )
        ).toBe(
          "low"
        );
      }
    );

    it(
      "classifies medium intent",
      () => {
        expect(
          computePurchaseIntent(
            4,
            1,
            1
          )
        ).toBe(
          "medium"
        );
      }
    );

    it(
      "classifies high intent",
      () => {
        expect(
          computePurchaseIntent(
            10,
            2,
            1
          )
        ).toBe(
          "high"
        );
      }
    );

    it(
      "clamps hesitation score",
      () => {
        expect(
          computeHesitationScore(
            20,
            20,
            20
          )
        ).toBe(1);
      }
    );

    it(
      "classifies no friction",
      () => {
        expect(
          classifyFriction(
            0.1
          )
        ).toBe(
          "none"
        );
      }
    );

    it(
      "classifies decision friction",
      () => {
        expect(
          classifyFriction(
            0.35
          )
        ).toBe(
          "decision"
        );
      }
    );

    it(
      "classifies price friction",
      () => {
        expect(
          classifyFriction(
            0.6
          )
        ).toBe(
          "price"
        );
      }
    );

    it(
      "classifies trust friction",
      () => {
        expect(
          classifyFriction(
            0.9
          )
        ).toBe(
          "trust"
        );
      }
    );
  }
);