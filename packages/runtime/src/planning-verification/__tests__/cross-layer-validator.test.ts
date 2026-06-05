/**
 * cross-layer-validator.test.ts
 *
 * Responsibility:
 * Verify deterministic lineage validation.
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateCrossLayerConsistency,
} from "../cross-layer-validator";

describe(
  "cross layer validator",
  () => {
    it(
      "accepts valid lineage",
      () => {
        const violations =
          validateCrossLayerConsistency(
            [
              {
                id: "decision_1",
                opportunityId: "opp_1",
                category: "recovery",
                action: "recover_session",
                type: "recovery",
                priority: "high",
                rationale: "test",
              },
            ],
            [
              {
                id: "plan_1",
                decisionId: "decision_1",
                workflowType: "recovery",
                steps: [],
                priority: "high",
              },
            ],
            [
              {
                id: "plan_1",
                decisionId: "decision_1",
                workflowType: "recovery",
                steps: [],
                priority: "high",
                executionOrder: 0,
              },
            ],
            [
              {
                id: "strategy_1",
                workflowId: "plan_1",
                strategyType: "recovery",
                executionOrder: 0,
                urgency: "immediate",
                executionGroup:
                  "customer_recovery",
                dependencyCount: 0,
              },
            ],
          );

        expect(
          violations,
        ).toHaveLength(0);
      },
    );

    it(
      "detects missing plan",
      () => {
        const violations =
          validateCrossLayerConsistency(
            [
              {
                id: "decision_1",
                opportunityId: "opp_1",
                category: "recovery",
                action: "recover_session",
                type: "recovery",
                priority: "high",
                rationale: "test",
              },
            ],
            [],
            [],
            [],
          );

        expect(
          violations.length,
        ).toBeGreaterThan(0);
      },
    );

    it(
      "detects missing strategy",
      () => {
        const violations =
          validateCrossLayerConsistency(
            [
              {
                id: "decision_1",
                opportunityId: "opp_1",
                category: "recovery",
                action: "recover_session",
                type: "recovery",
                priority: "high",
                rationale: "test",
              },
            ],
            [
              {
                id: "plan_1",
                decisionId: "decision_1",
                workflowType: "recovery",
                steps: [],
                priority: "high",
              },
            ],
            [
              {
                id: "plan_1",
                decisionId: "decision_1",
                workflowType: "recovery",
                steps: [],
                priority: "high",
                executionOrder: 0,
              },
            ],
            [],
          );

        expect(
          violations.length,
        ).toBeGreaterThan(0);
      },
    );
  },
);