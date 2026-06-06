import { describe, expect, it } from "vitest";

/**
 * provider-boundary-runtime.test.ts
 *
 * Responsibility:
 * Verify provider-boundary runtime report construction.
 */

import {
  enforceProviderBoundary,
} from "../provider-boundary-runtime";

describe("provider boundary runtime", () => {
  it("returns a valid report for clean deterministic targets", () => {
    const targets = [
      {
        layer: "workflow-runtime" as const,
        modulePath:
          "packages/runtime/src/workflow-runtime/workflow-runtime.ts",
        imports: [
          "@phantombot/contracts",
        ],
        symbols: [
          "WorkflowRuntime",
          "WorkflowTask",
        ],
      },
      {
        layer: "model-routing" as const,
        modulePath:
          "packages/runtime/src/ai-orchestration/model-routing/model-router.ts",
        imports: [
          "./routing.types",
        ],
        symbols: [
          "RoutingDecision",
          "RoutingProfile",
        ],
      },
    ];

    const report = enforceProviderBoundary(targets);

    expect(report.checkedTargets).toEqual(targets);
    expect(report.result.valid).toBe(true);
    expect(report.result.violations).toEqual([]);
  });

  it("returns violations for provider leakage", () => {
    const report = enforceProviderBoundary([
      {
        layer: "capability-planning",
        modulePath:
          "packages/runtime/src/ai-orchestration/capability-planning/capability-planner.ts",
        imports: [],
        symbols: [
          "ANTHROPIC",
        ],
      },
    ]);

    expect(report.result.valid).toBe(false);
    expect(report.result.violations).toHaveLength(1);
    expect(report.result.violations[0]?.kind).toBe(
      "provider-name-leak"
    );
  });
});