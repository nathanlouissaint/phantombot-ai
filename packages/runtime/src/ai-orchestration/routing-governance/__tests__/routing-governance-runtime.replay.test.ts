/**
 * Phase 8E
 *
 * Purpose:
 * Verify routing governance replay determinism.
 *
 * Responsibilities:
 * - Ensure same input produces same report
 * - Protect deterministic orchestration lineage
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
  evaluateRoutingGovernance,
} from "../routing-governance-runtime";

describe("routing-governance replay", () => {
  it("produces deterministic governance reports", () => {
    const input = {
      resolvedCapabilitySet: {
        taskId: "task-1",

        capabilities: [
          {
            capability: "retrieval" as const,
            priority: 0,
          },
        ],
      },

      routingDecision: {
        taskId: "task-1",
        profile: "reasoning" as const,
      },
    };

    const first =
      evaluateRoutingGovernance(input);

    const second =
      evaluateRoutingGovernance(input);

    expect(first).toEqual(second);
  });
});
