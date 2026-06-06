/**
 * Phase 8D
 *
 * Purpose:
 * Verify routing derives from resolved capability sets.
 *
 * Responsibilities:
 * - Test capability-driven routing
 * - Prevent taskType routing regression
 * - Preserve provider-agnostic decisions
 *
 * Constraints:
 * - No providers
 * - No model calls
 * - No prompt execution
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  routeTask,
} from "../model-router";

describe("model-router", () => {
  it("routes generation capabilities to content generation", () => {
    const result = routeTask({
      taskId: "task-1",

      capabilities: [
        {
          capability: "generation",
          priority: 0,
        },
      ],
    });

    expect(result).toEqual({
      taskId: "task-1",
      profile: "content_generation",
    });
  });

  it("routes classification capabilities", () => {
    const result = routeTask({
      taskId: "task-2",

      capabilities: [
        {
          capability: "classification",
          priority: 0,
        },
      ],
    });

    expect(result.profile).toBe("classification");
  });

  it("routes from the first resolved capability", () => {
    const result = routeTask({
      taskId: "task-3",

      capabilities: [
        {
          capability: "summarization",
          priority: 0,
        },
        {
          capability: "reasoning",
          priority: 1,
        },
      ],
    });

    expect(result.profile).toBe("summarization");
  });

  it("rejects empty resolved capability sets", () => {
    expect(() =>
      routeTask({
        taskId: "task-4",
        capabilities: [],
      }),
    ).toThrow(
      "Resolved capability set requires at least one capability",
    );
  });
});
