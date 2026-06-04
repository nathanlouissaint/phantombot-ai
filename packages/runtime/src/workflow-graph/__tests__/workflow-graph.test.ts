import { describe, expect, it } from "vitest";

import {
  buildWorkflowGraph,
} from "../workflow-graph";

describe("workflow graph", () => {
  it("creates dependency edge from recovery to conversion", () => {
    const graph =
      buildWorkflowGraph([
        {
          id: "recovery",
          decisionId: "1",
          workflowType: "recovery",
          priority: "critical",
          steps: [],
          executionOrder: 0,
        },
        {
          id: "conversion",
          decisionId: "2",
          workflowType: "conversion",
          priority: "high",
          steps: [],
          executionOrder: 1,
        },
      ]);

    expect(graph.edges).toEqual([
      {
        from: "recovery",
        to: "conversion",
      },
    ]);
  });
});
