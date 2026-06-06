/**
 * Capability plan validation tests.
 */

import { describe, expect, it } from "vitest";

import { validateCapabilityPlan } from "../capability-validator";

describe("capability validator", () => {
  it("validates plans", () => {
    const violations = validateCapabilityPlan({
      taskId: "task-1",
      requirements: [
        {
          capability: "generation",
          priority: 1,
        },
      ],
    });

    expect(violations).toEqual([]);
  });

  it("detects invalid plans", () => {
    const violations = validateCapabilityPlan({
      taskId: "",
      requirements: [],
    });

    expect(violations.length).toBeGreaterThan(0);
  });
});