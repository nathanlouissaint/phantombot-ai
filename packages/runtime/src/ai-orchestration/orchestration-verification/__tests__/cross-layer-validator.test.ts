import { describe, expect, it } from "vitest";

import { validateLineage } from "../cross-layer-validator";

describe("cross-layer-validator", () => {
  it("detects missing route", () => {
    const violations = validateLineage(
      [
        {
          taskId: "task-1",
          strategyId: "strategy-1",
        },
      ],
      [
        {
          contextId: "ctx-1",
          taskId: "task-1",
        },
      ],
      []
    );

    expect(violations).toHaveLength(1);
  });
});