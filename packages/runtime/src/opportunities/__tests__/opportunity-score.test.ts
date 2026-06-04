/**
 * opportunity-score.test.ts
 *
 * Responsibility:
 * Verify deterministic opportunity scoring.
 *
 * Owns:
 * - abandonment scoring verification
 * - hesitation scoring verification
 *
 * Does NOT Own:
 * - opportunity detection
 * - runtime orchestration
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  scoreAbandonment,
  scoreHesitation,
} from "../opportunity-score";

describe(
  "OpportunityScore",
  () => {
    it(
      "scores high intent abandonment",
      () => {
        const score =
          scoreAbandonment({
            abandoned: true,

            purchaseIntent:
              "high",

            hesitationScore:
              0.5,
          } as any);

        expect(
          score
        ).toBe(0.9);
      }
    );

    it(
      "scores hesitation",
      () => {
        expect(
          scoreHesitation({
            hesitationScore:
              0.75,
          } as any)
        ).toBe(0.75);
      }
    );
  }
);