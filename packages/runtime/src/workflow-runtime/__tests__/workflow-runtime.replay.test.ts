/**
 * workflow-runtime.replay.test.ts
 *
 * Responsibility:
 * Verify workflow planning is replay safe.
 *
 * Owns:
 * - deterministic replay assertions
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

describe("workflow runtime replay safety", () => {
  it("produces the same execution plans from the same decisions", () => {
    const decisions: Decision[] = [
      {
        id: "decision:recovery:cart-abandonment",
        opportunityId: "opportunity:recovery:cart-abandonment",
        category: "recovery",
        action: "recover_session",
        type: "cart_abandonment",
        priority: "critical",
        rationale: "Selected recovery decision for cart_abandonment",
      },
      {
        id: "decision:conversion:checkout-intent",
        opportunityId: "opportunity:conversion:checkout-intent",
        category: "conversion",
        action: "advance_conversion",
        type: "checkout_intent",
        priority: "high",
        rationale: "Selected conversion decision for checkout_intent",
      },
      {
        id: "decision:retention:repeat-shopper",
        opportunityId: "opportunity:retention:repeat-shopper",
        category: "retention",
        action: "protect_retention",
        type: "repeat_shopper",
        priority: "medium",
        rationale: "Selected retention decision for repeat_shopper",
      },
    ];

    const firstRun =
      buildExecutionPlans(decisions);

    const secondRun =
      buildExecutionPlans(decisions);

    expect(firstRun).toEqual(secondRun);
  });
});
