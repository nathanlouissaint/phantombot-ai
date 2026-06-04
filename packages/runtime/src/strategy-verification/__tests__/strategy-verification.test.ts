import { describe, expect, it } from "vitest";

import {
  verifyStrategies,
} from "../strategy-verification";

describe("strategy verification", () => {
  it("marks valid strategies as verified", () => {
    const results =
      verifyStrategies([
        {
          id: "strategy:1",
          workflowId: "workflow:1",
          strategyType: "recovery",
          executionOrder: 0,
          urgency: "immediate",
          executionGroup: "customer_recovery",
          dependencyCount: 0,
        },
      ]);

    expect(results[0].verified)
      .toBe(true);
  });
});
