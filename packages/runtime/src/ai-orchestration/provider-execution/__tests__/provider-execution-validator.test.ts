import { describe, expect, it } from "vitest";

import {
  validateProviderExecution,
} from "../provider-execution-validator";

describe("provider execution validator", () => {
  it("accepts valid execution requests", () => {
    const result =
      validateProviderExecution({
        routingDecision: {
          taskId: "task-1",
          profile: "reasoning",
        },

        boundaryReport: {
          checkedTargets: [],

          governanceReport: {
            taskId: "task-1",
            approved: true,
            violations: [],
          },

          result: {
            valid: true,
            violations: [],
          },
        },
      });

    expect(result.valid).toBe(true);
  });

  it("rejects failed boundary validation", () => {
    const result =
      validateProviderExecution({
        routingDecision: {
          taskId: "task-1",
          profile: "reasoning",
        },

        boundaryReport: {
          checkedTargets: [],

          governanceReport: {
            taskId: "task-1",
            approved: false,
            violations: [
              "Routing governance failed",
            ],
          },

          result: {
            valid: false,
            violations: [],
          },
        },
      });

    expect(result.valid).toBe(false);
  });
});
