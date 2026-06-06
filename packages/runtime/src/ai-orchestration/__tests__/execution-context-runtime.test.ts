/**
 * execution-context-runtime.test.ts
 *
 * Responsibility:
 * Verify execution context generation.
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildExecutionContexts,
} from "../execution-context-runtime";

describe(
  "execution context runtime",
  () => {
    it(
      "builds execution contexts",
      () => {
        const contexts =
          buildExecutionContexts(
            [
              {
                task: {
                  id: "task_1",
                  workflowId:
                    "workflow_1",

                  taskType:
                    "recovery",

                  executionOrder: 0,
                },

                context: {
                  workflowId:
                    "workflow_1",

                  strategyId:
                    "strategy_1",

                  executionGroup:
                    "customer_recovery",
                },
              },
            ],

            [
              {
                id:
                  "definition_1",

                taskId:
                  "task_1",

                workflowId:
                  "workflow_1",

                taskType:
                  "recovery",

                objective:
                  "recover_customer",
              },
            ],
          );

        expect(
          contexts,
        ).toHaveLength(1);

        expect(
          contexts[0].strategyId,
        ).toBe(
          "strategy_1",
        );
      },
    );
  },
);