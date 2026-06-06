/*
Verifies routing behavior.

Task
↓
Routing Profile
*/

import { describe, expect, it } from "vitest";

import { routeTask } from "../model-router";

describe("model-router", () => {
  it("routes email generation", () => {
    const result = routeTask({
      taskId: "task-1",
      taskType: "GENERATE_EMAIL",
    });

    expect(result.profile).toBe(
      "content_generation"
    );
  });
});