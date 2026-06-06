/**
 * Phase 8D
 *
 * Purpose:
 * Verify routing replay determinism.
 *
 * Responsibilities:
 * - Ensure identical resolved capability sets produce identical routing decisions
 * - Protect replay-safe orchestration behavior
 *
 * Constraints:
 * - No time
 * - No randomness
 * - No providers
 * - No execution
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  routeTask,
} from "../model-router";

describe("model-router replay", () => {
  it("produces deterministic routing from resolved capabilities", () => {
    const input = {
      taskId: "task-1",

      capabilities: [
        {
          capability: "reasoning" as const,
          priority: 0,
        },
        {
          capability: "retrieval" as const,
          priority: 1,
        },
      ],
    };

    const first = routeTask(input);
    const second = routeTask(input);

    expect(first).toEqual(second);
  });
});
