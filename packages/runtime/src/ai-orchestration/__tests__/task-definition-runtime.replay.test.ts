/**
 * task-definition-runtime.replay.test.ts
 *
 * Responsibility:
 * Verify deterministic replay behavior
 * for task definition generation.
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  OrchestrationRequest,
} from "../orchestration.types";

import {
  buildTaskDefinitions,
} from "../task-definition-runtime";

describe(
  "task definition replay",
  () => {
    it(
      "produces identical results",
      () => {
        const requests:
          OrchestrationRequest[] = [
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
        ];

        const first =
          buildTaskDefinitions(
            requests,
          );

        const second =
          buildTaskDefinitions(
            requests,
          );

        expect(first)
          .toEqual(second);
      },
    );
  },
);