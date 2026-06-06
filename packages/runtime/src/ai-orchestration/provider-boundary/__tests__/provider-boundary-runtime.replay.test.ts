import { describe, expect, it } from "vitest";

/**
 * provider-boundary-runtime.replay.test.ts
 *
 * Responsibility:
 * Verify provider-boundary enforcement is replay-safe.
 */

import {
  enforceProviderBoundary,
} from "../provider-boundary-runtime";

describe("provider boundary runtime replay", () => {
  it("produces identical reports for identical inputs", () => {
    const targets = [
      {
        layer: "decision-engine" as const,
        modulePath:
          "packages/runtime/src/decision-engine/decision-engine.ts",
        imports: [
          "@phantombot/contracts",
        ],
        symbols: [
          "Decision",
          "DecisionReason",
          "OpportunityDecision",
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

    const liveReport = enforceProviderBoundary(targets);
    const replayReport = enforceProviderBoundary(targets);

    expect(replayReport).toEqual(liveReport);
    expect(JSON.stringify(replayReport)).toBe(
      JSON.stringify(liveReport)
    );
  });
});