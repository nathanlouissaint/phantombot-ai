/**
 * orchestration-runtime.replay.test.ts
 *
 * Responsibility:
 * Verify replay-safe orchestration planning.
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildOrchestrationRequests,
} from "../orchestration-runtime";

describe(
  "orchestration replay",
  () => {
    it(
      "produces identical results",
      () => {
        const strategies = [
          {
            id: "strategy_1",
            workflowId: "workflow_1",
            strategyType: "recovery" as const,
            executionOrder: 0,
            urgency: "immediate" as const,
            executionGroup:
              "customer_recovery" as const,
            dependencyCount: 0,
          },
        ];

        expect(
          buildOrchestrationRequests(
            strategies,
          ),
        ).toEqual(
          buildOrchestrationRequests(
            strategies,
          ),
        );
      },
    );
  },
);