/**
 * Verifies deterministic
 * capability plan creation.
 */

import { describe, expect, it } from "vitest";

import { buildCapabilityPlan } from "../capability-planner";

describe("capability planner", () => {
  it("builds capability plans", () => {
    const plan = buildCapabilityPlan(
      {
        id: "task-1",
      } as any,
      [
        {
          capability: "generation",
          priority: 1,
        },
      ],
    );

    expect(plan.taskId).toBe("task-1");

    expect(plan.requirements).toHaveLength(1);
  });
});