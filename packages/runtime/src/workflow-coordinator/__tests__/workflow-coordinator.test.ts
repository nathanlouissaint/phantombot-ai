import { describe, expect, it } from "vitest";

import {
  coordinateWorkflows,
} from "../workflow-coordinator";

describe("workflow coordinator", () => {
  it("orders by priority", () => {
    const results =
      coordinateWorkflows([
        {
          id: "1",
          decisionId: "1",
          workflowType: "upsell",
          priority: "low",
          steps: [],
        },
        {
          id: "2",
          decisionId: "2",
          workflowType: "recovery",
          priority: "critical",
          steps: [],
        },
      ]);

    expect(results[0].priority)
      .toBe("critical");
  });

  it("suppresses upsell when critical recovery exists", () => {
    const results =
      coordinateWorkflows([
        {
          id: "1",
          decisionId: "1",
          workflowType: "recovery",
          priority: "critical",
          steps: [],
        },
        {
          id: "2",
          decisionId: "2",
          workflowType: "upsell",
          priority: "high",
          steps: [],
        },
      ]);

    expect(results).toHaveLength(1);
  });
});
