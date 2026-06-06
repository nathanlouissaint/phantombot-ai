/*
Verifies routing validation.
*/

import { describe, expect, it } from "vitest";

import { validateRoutingDecision } from "../routing-validator";

describe("routing-validator", () => {
  it("detects missing task id", () => {
    const violations =
      validateRoutingDecision({
        taskId: "",
        profile: "reasoning",
      });

    expect(violations.length).toBe(1);
  });
});