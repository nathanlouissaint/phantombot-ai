import { describe, expect, it } from "vitest";

import {
  enforceProviderBoundary,
} from "../provider-boundary-runtime";

describe("provider boundary runtime", () => {
  it("returns valid report when governance approves", () => {
    const report =
      enforceProviderBoundary({
        targets: [
          {
            layer: "model-routing",
            modulePath: "router.ts",
            imports: [],
            symbols: [
              "RoutingDecision",
            ],
          },
        ],

        governanceReport: {
          taskId: "task-1",
          approved: true,
          violations: [],
        },
      });

    expect(report.result.valid).toBe(true);
  });

  it("fails when governance rejects", () => {
    const report =
      enforceProviderBoundary({
        targets: [
          {
            layer: "model-routing",
            modulePath: "router.ts",
            imports: [],
            symbols: [
              "RoutingDecision",
            ],
          },
        ],

        governanceReport: {
          taskId: "task-1",
          approved: false,
          violations: [
            "Capability mismatch",
          ],
        },
      });

    expect(report.result.valid).toBe(false);
  });
});
