import { describe, expect, it } from "vitest";

import {
  buildExecutionStrategies,
} from "../execution-strategy-planner";

describe("execution strategy replay safety", () => {
  it("returns identical strategies", () => {
    const graph = {
      nodes: [],
      edges: [],
      workflows: [],
    };

    expect(
      buildExecutionStrategies(graph),
    ).toEqual(
      buildExecutionStrategies(graph),
    );
  });
});
