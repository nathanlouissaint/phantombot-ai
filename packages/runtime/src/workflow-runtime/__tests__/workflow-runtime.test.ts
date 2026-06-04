/**
 * workflow-runtime.test.ts
 *
 * Responsibility:
 * Verify deterministic workflow planning behavior.
 *
 * Owns:
 * - decision to execution plan assertions
 * - workflow step mapping assertions
 *
 * Does NOT Own:
 * - workflow execution
 * - AI orchestration
 * - persistence
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Decision,
} from "../../decision-engine/decision.types";

import {
  buildExecutionPlans,
} from "../workflow-runtime";

function createDecision(
  overrides: Partial<Decision>,
): Decision {
  return {
    id: "decision:test",
    opportunityId: "opportunity:test",
    category: "recovery",
    action: "recover_session",
    type: "test_opportunity",
    priority: "medium",
    rationale: "test rationale",
    ...overrides,
  };
}

describe("workflow runtime", () => {
  it("builds a recovery execution plan", () => {
    const plans =
      buildExecutionPlans([
        createDecision({
          id: "decision:recovery",
          category: "recovery",
          action: "recover_session",
          priority: "critical",
        }),
      ]);

    expect(plans).toEqual([
      {
        id: "plan:decision:recovery",
        decisionId: "decision:recovery",
        workflowType: "recovery",
        steps: [
          "identify_shopper",
          "prepare_recovery_action",
        ],
        priority: "critical",
      },
    ]);
  });

  it("builds a conversion execution plan", () => {
    const plans =
      buildExecutionPlans([
        createDecision({
          id: "decision:conversion",
          category: "conversion",
          action: "advance_conversion",
          priority: "high",
        }),
      ]);

    expect(plans[0]).toEqual({
      id: "plan:decision:conversion",
      decisionId: "decision:conversion",
      workflowType: "conversion",
      steps: [
        "identify_shopper",
        "prepare_conversion_action",
      ],
      priority: "high",
    });
  });

  it("builds an upsell execution plan", () => {
    const plans =
      buildExecutionPlans([
        createDecision({
          id: "decision:upsell",
          category: "upsell",
          action: "present_upsell",
          priority: "medium",
        }),
      ]);

    expect(plans[0]).toEqual({
      id: "plan:decision:upsell",
      decisionId: "decision:upsell",
      workflowType: "upsell",
      steps: [
        "identify_shopper",
        "prepare_upsell_action",
      ],
      priority: "medium",
    });
  });

  it("builds a retention execution plan", () => {
    const plans =
      buildExecutionPlans([
        createDecision({
          id: "decision:retention",
          category: "retention",
          action: "protect_retention",
          priority: "low",
        }),
      ]);

    expect(plans[0]).toEqual({
      id: "plan:decision:retention",
      decisionId: "decision:retention",
      workflowType: "retention",
      steps: [
        "identify_shopper",
        "prepare_retention_action",
      ],
      priority: "low",
    });
  });

  it("preserves decision ordering", () => {
    const plans =
      buildExecutionPlans([
        createDecision({
          id: "decision:first",
          category: "recovery",
          action: "recover_session",
        }),
        createDecision({
          id: "decision:second",
          category: "conversion",
          action: "advance_conversion",
        }),
      ]);

    expect(plans.map(plan => plan.decisionId)).toEqual([
      "decision:first",
      "decision:second",
    ]);
  });
});
