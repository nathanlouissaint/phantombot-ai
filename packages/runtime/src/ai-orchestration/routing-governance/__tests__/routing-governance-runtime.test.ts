/**
 * Phase 8E
 *
 * Purpose:
 * Verify routing governance runtime behavior.
 *
 * Responsibilities:
 * - Produce approval reports
 * - Produce rejection reports
 * - Preserve task identity
 *
 * Constraints:
 * - No providers
 * - No model calls
 * - No side effects
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  evaluateRoutingGovernance,
} from "../routing-governance-runtime";

describe("routing-governance-runtime", () => {
  it("approves valid routing lineage", () => {
    const report =
      evaluateRoutingGovernance({
        resolvedCapabilitySet: {
          taskId: "task-1",

          capabilities: [
            {
              capability: "generation",
              priority: 0,
            },
          ],
        },

        routingDecision: {
          taskId: "task-1",
          profile: "content_generation",
        },
      });

    expect(report).toEqual({
      taskId: "task-1",
      approved: true,
      violations: [],
    });
  });

  it("rejects invalid routing lineage", () => {
    const report =
      evaluateRoutingGovernance({
        resolvedCapabilitySet: {
          taskId: "task-1",

          capabilities: [
            {
              capability: "summarization",
              priority: 0,
            },
          ],
        },

        routingDecision: {
          taskId: "task-1",
          profile: "reasoning",
        },
      });

    expect(report.approved).toBe(false);
    expect(report.violations.length).toBeGreaterThan(0);
  });
});
