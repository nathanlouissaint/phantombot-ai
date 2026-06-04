import { describe, expect, it } from "vitest";

import {
  buildExecutionStrategies,
} from "../execution-strategy-planner";

describe("execution strategy planner", () => {
  it("creates enriched recovery strategy", () => {
    const result =
      buildExecutionStrategies({
        nodes: [],
        edges: [],
        workflows: [
          {
            id: "recovery",
            decisionId: "1",
            workflowType: "recovery",
            priority: "critical",
            steps: [],
            executionOrder: 0,
          },
        ],
      });

    expect(result[0]).toEqual({
      id: "strategy:recovery",
      workflowId: "recovery",
      strategyType: "recovery",
      executionOrder: 0,
      urgency: "immediate",
      executionGroup: "customer_recovery",
      dependencyCount: 0,
    });
  });
});
