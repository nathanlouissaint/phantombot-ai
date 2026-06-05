/**
 * orchestration-runtime.test.ts
 *
 * Responsibility:
 * Verify orchestration request generation.
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
  "orchestration runtime",
  () => {
    it(
      "builds orchestration requests",
      () => {
        const requests =
          buildOrchestrationRequests([
            {
              id: "strategy_1",
              workflowId: "workflow_1",
              strategyType: "recovery",
              executionOrder: 0,
              urgency: "immediate",
              executionGroup:
                "customer_recovery",
              dependencyCount: 0,
            },
          ]);

        expect(
          requests,
        ).toHaveLength(1);

        expect(
          requests[0].task.taskType,
        ).toBe("recovery");
      },
    );
  },
);