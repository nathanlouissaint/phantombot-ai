import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateOrphans,
} from "../orphan-validator";

describe(
  "orphan validator",
  () => {
    it(
      "detects orphan execution plans",
      () => {
        const violations =
          validateOrphans(
            [],
            [
              {
                id: "plan_1",
                decisionId: "missing",
                workflowType: "recovery",
                steps: [],
                priority: "high",
              },
            ],
            [],
            [],
          );

        expect(
          violations.some(
            violation =>
              violation.includes(
                "Orphan execution plan",
              ),
          ),
        ).toBe(true);
      },
    );

    it(
      "detects orphan workflows",
      () => {
        const violations =
          validateOrphans(
            [],
            [],
            [
              {
                id: "workflow_1",
                decisionId: "decision_1",
                workflowType: "recovery",
                steps: [],
                priority: "high",
                executionOrder: 1,
              },
            ],
            [],
          );

        expect(
          violations.some(
            violation =>
              violation.includes(
                "Orphan workflow",
              ),
          ),
        ).toBe(true);
      },
    );

    it(
      "detects orphan strategies",
      () => {
        const violations =
          validateOrphans(
            [],
            [],
            [],
            [
              {
                id: "strategy_1",
                workflowId: "missing",
                strategyType: "recovery",
                executionOrder: 1,
                urgency: "immediate",
                executionGroup:
                  "customer_recovery",
                dependencyCount: 0,
              },
            ],
          );

        expect(
          violations.some(
            violation =>
              violation.includes(
                "Orphan strategy",
              ),
          ),
        ).toBe(true);
      },
    );

    it(
      "accepts valid chains",
      () => {
        const violations =
          validateOrphans(
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
                executionOrder: 1,
              },
            ],
            [
              {
                id: "strategy_1",
                workflowId: "plan_1",
                strategyType: "recovery",
                executionOrder: 1,
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
  },
);