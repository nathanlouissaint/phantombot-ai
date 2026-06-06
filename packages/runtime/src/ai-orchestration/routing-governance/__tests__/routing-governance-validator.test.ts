/**
 * Phase 8E
 *
 * Purpose:
 * Verify routing governance validation.
 *
 * Responsibilities:
 * - Accept valid routing lineage
 * - Reject mismatched task identity
 * - Reject capability-routing drift
 *
 * Constraints:
 * - No providers
 * - No model execution
 * - No prompt execution
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateRoutingGovernance,
} from "../routing-governance-validator";

describe("routing-governance-validator", () => {
  it("accepts routing decisions that match resolved capabilities", () => {
    const violations =
      validateRoutingGovernance({
        resolvedCapabilitySet: {
          taskId: "task-1",

          capabilities: [
            {
              capability: "reasoning",
              priority: 0,
            },
          ],
        },

        routingDecision: {
          taskId: "task-1",
          profile: "reasoning",
        },
      });

    expect(violations).toEqual([]);
  });

  it("rejects mismatched task identity", () => {
    const violations =
      validateRoutingGovernance({
        resolvedCapabilitySet: {
          taskId: "task-1",

          capabilities: [
            {
              capability: "reasoning",
              priority: 0,
            },
          ],
        },

        routingDecision: {
          taskId: "task-2",
          profile: "reasoning",
        },
      });

    expect(violations).toContain(
      "Routing decision task id does not match resolved capability task id",
    );
  });

  it("rejects capability-routing drift", () => {
    const violations =
      validateRoutingGovernance({
        resolvedCapabilitySet: {
          taskId: "task-1",

          capabilities: [
            {
              capability: "reasoning",
              priority: 0,
            },
          ],
        },

        routingDecision: {
          taskId: "task-1",
          profile: "classification",
        },
      });

    expect(violations).toContain(
      "Routing profile classification does not match resolved capability reasoning",
    );
  });
});
