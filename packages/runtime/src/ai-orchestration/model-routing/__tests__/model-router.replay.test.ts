/*
Replay verification.

Same input
↓
Same output
*/

import { describe, expect, it } from "vitest";

import { routeTask } from "../model-router";

describe("model-router replay", () => {
  it("produces deterministic routing", () => {
    const first = routeTask({
      taskId: "1",
      taskType: "CLASSIFY_INTENT",
    });

    const second = routeTask({
      taskId: "1",
      taskType: "CLASSIFY_INTENT",
    });

    expect(first).toEqual(second);
  });
});