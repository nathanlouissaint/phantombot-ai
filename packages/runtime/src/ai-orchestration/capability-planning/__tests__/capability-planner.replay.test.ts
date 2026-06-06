/**
 * Replay verification.
 *
 * Same task
 * =>
 * Same capability plan.
 */

import { describe, expect, it } from "vitest";

import { buildCapabilityPlan } from "../capability-planner";

describe("capability planner replay", () => {
  it("is deterministic", () => {
    const requirements = [
      {
        capability: "generation" as const,
        priority: 1,
      },
    ];

    const first = buildCapabilityPlan(
      { id: "task-1" } as any,
      requirements,
    );

    const second = buildCapabilityPlan(
      { id: "task-1" } as any,
      requirements,
    );

    expect(first).toEqual(second);
  });
});