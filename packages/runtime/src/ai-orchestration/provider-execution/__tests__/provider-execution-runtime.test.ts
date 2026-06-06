import { describe, expect, it } from "vitest";

import {
  authorizeProviderExecution,
} from "../provider-execution-runtime";

describe("provider execution runtime", () => {
  it("authorizes valid requests", () => {
    const decision =
      authorizeProviderExecution({
        routingDecision: {
          taskId: "task-1",
          profile: "reasoning",
        },

        boundaryReport: {
          checkedTargets: [],

          governanceReport: {
            taskId: "task-1",
            approved: true,
            violations: [],
          },

          result: {
            valid: true,
            violations: [],
          },
        },
      });

    expect(
      decision.authorized,
    ).toBe(true);
  });

  it("rejects invalid requests", () => {
    const decision =
      authorizeProviderExecution({
        routingDecision: {
          taskId: "task-1",
          profile: "reasoning",
        },

        boundaryReport: {
          checkedTargets: [],

          governanceReport: {
            taskId: "task-1",
            approved: true,
            violations: [],
          },

          result: {
            valid: false,
            violations: [],
          },
        },
      });

    expect(
      decision.authorized,
    ).toBe(false);
  });

  it(
    "rejects execution when governance invalidates boundary",
    () => {
      const decision =
        authorizeProviderExecution({
          routingDecision: {
            taskId: "task-1",
            profile: "reasoning",
          },

          boundaryReport: {
            checkedTargets: [],

            governanceReport: {
              taskId: "task-1",
              approved: false,
              violations: [
                "Capability mismatch",
              ],
            },

            result: {
              valid: false,
              violations: [],
            },
          },
        });

      expect(
        decision.authorized,
      ).toBe(false);
    },
  );
});