/**
 * execution-context-runtime.replay.test.ts
 *
 * Responsibility:
 * Verify replay-safe execution contexts.
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
  "execution context replay",
  () => {
    it(
      "produces identical contexts",
      () => {
        const requests = [
          {
            task: {
              id: "task_1",
              workflowId:
                "workflow_1",

              taskType:
                "recovery" as const,

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
        ];

        const definitions = [
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
        ];

        expect(
          buildExecutionContexts(
            requests,
            definitions,
          ),
        ).toEqual(
          buildExecutionContexts(
            requests,
            definitions,
          ),
        );
      },
    );
  },
);