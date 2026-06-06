import { describe, expect, it } from "vitest";

import { verifyOrchestration } from "../orchestration-verification";

describe("orchestration-verification", () => {
  it("passes valid lineage", () => {
    const result = verifyOrchestration({
      strategyIds: ["strategy-1"],

      tasks: [
        {
          taskId: "task-1",
          strategyId: "strategy-1",
        },
      ],

      contexts: [
        {
          contextId: "ctx-1",
          taskId: "task-1",
        },
      ],

      routes: [
        {
          routeId: "route-1",
          contextId: "ctx-1",
        },
      ],

      replayA: {},

      replayB: {},
    });

    expect(result.valid).toBe(true);
  });
});