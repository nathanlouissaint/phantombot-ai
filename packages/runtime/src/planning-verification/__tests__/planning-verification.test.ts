/**
 * planning-verification.test.ts
 *
 * Responsibility:
 * Verify deterministic planning integrity behavior.
 *
 * Covers:
 * - valid planning chains
 * - orphan artifact detection
 * - replay-safe validation behavior
 *
 * Does NOT Own:
 * - planning validation logic
 * - dependency validation
 * - workflow coordination
 * - strategy generation
 *
 * Critical Rules:
 * - tests must remain deterministic
 * - tests must not rely on wall-clock time
 * - tests must validate replay-safe outcomes
 * - tests must validate planning integrity guarantees
 */

import { describe, expect, it } from "vitest";

import {
  verifyPlanningIntegrity,
} from "../planning-verification";

describe(
  "planning verification",
  () => {
    it(
      "returns valid when no violations exist",
      () => {
        const result =
          verifyPlanningIntegrity({
            decisions: [],
            plans: [],
            workflows: [],
            strategies: [],
            graph: {
              nodes: [],
              edges: [],
              workflows: [],
            },
          });

        expect(result.valid)
          .toBe(true);

        expect(result.violations)
          .toHaveLength(0);
      },
    );

    it(
      "fails when orphan artifacts exist",
      () => {
        const result =
          verifyPlanningIntegrity({
            decisions: [],

            plans: [
              {
                id: "plan_1",
                decisionId: "missing",
                workflowType: "recovery",
                steps: [],
                priority: "high",
              },
            ],

            workflows: [],

            strategies: [],

            graph: {
              nodes: [],
              edges: [],
              workflows: [],
            },
          });

        expect(result.valid)
          .toBe(false);

        /**
         * Debug helper:
         * If this assertion fails,
         * inspect result.violations
         * to determine which validator
         * is producing the failure.
         */

        expect(
          result.violations.some(
            violation =>
              violation.includes(
                "Orphan execution plan",
              ),
          ),
        ).toBe(true);
      },
    );
  },
);