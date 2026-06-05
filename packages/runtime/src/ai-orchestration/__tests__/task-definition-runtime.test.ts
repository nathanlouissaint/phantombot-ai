/**
 * task-definition-runtime.test.ts
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildTaskDefinitions,
} from "../task-definition-runtime";

describe(
  "task definition runtime",
  () => {
    it(
      "builds task definitions",
      () => {
        const definitions =
          buildTaskDefinitions([
            {
              task: {
                id: "task_1",
                workflowId: "workflow_1",
                taskType: "recovery",
                executionOrder: 0,
              },

              context: {
                workflowId: "workflow_1",
                strategyId: "strategy_1",
                executionGroup:
                  "customer_recovery",
              },
            },
          ]);

        expect(
          definitions,
        ).toHaveLength(1);

        expect(
          definitions[0].objective,
        ).toBe(
          "recover_customer",
        );
      },
    );
  },
);