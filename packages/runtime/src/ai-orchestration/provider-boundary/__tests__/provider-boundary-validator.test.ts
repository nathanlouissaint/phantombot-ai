import { describe, expect, it } from "vitest";

/**
 * provider-boundary-validator.test.ts
 *
 * Responsibility:
 * Verify deterministic provider-boundary validation.
 *
 * Critical Rules:
 * - tests must remain replay-safe
 * - tests must not assume exact violation counts
 * - tests should verify required violations exist
 * - future policy expansion should not break tests
 */

import {
  validateProviderBoundaryTarget,
} from "../provider-boundary-validator";

describe("provider boundary validator", () => {
  it("accepts provider-agnostic deterministic targets", () => {
    const result = validateProviderBoundaryTarget({
      layer: "capability-planning",
      modulePath:
        "packages/runtime/src/ai-orchestration/capability-planning/capability-planner.ts",
      imports: [
        "./capability.types",
      ],
      symbols: [
        "CapabilityPlan",
        "CapabilityRequirement",
        "buildCapabilityPlan",
      ],
    });

    expect(result.valid).toBe(true);
    expect(result.violations).toEqual([]);
  });

  it("rejects provider-specific names before the provider adapter boundary", () => {
    const result = validateProviderBoundaryTarget({
      layer: "model-routing",
      modulePath:
        "packages/runtime/src/ai-orchestration/model-routing/model-router.ts",
      imports: [],
      symbols: [
        "OPENAI",
      ],
    });

    expect(result.valid).toBe(false);

    expect(
      result.violations.map(
        (violation) => violation.kind
      )
    ).toContain(
      "provider-name-leak"
    );
  });

  it("rejects provider SDK imports before the provider adapter boundary", () => {
    const result = validateProviderBoundaryTarget({
      layer: "orchestration-runtime",
      modulePath:
        "packages/runtime/src/ai-orchestration/orchestration-runtime.ts",
      imports: [
        "openai",
      ],
      symbols: [],
    });

    expect(result.valid).toBe(false);

    expect(
      result.violations.map(
        (violation) => violation.kind
      )
    ).toContain(
      "provider-sdk-leak"
    );
  });

  it("rejects nondeterministic runtime symbols", () => {
    const result = validateProviderBoundaryTarget({
      layer: "planning-verification",
      modulePath:
        "packages/runtime/src/planning-verification/planning-verification.ts",
      imports: [],
      symbols: [
        "Date.now",
      ],
    });

    expect(result.valid).toBe(false);

    expect(
      result.violations.map(
        (violation) => violation.kind
      )
    ).toContain(
      "nondeterministic-api-leak"
    );
  });
});