import { describe, expect, it } from "vitest";
import { validateTasks } from "../task-validator";

describe("task-validator", () => {
  it("detects orphan task", () => {
    const violations = validateTasks(
      [],
      [
        {
          taskId: "task-1",
          strategyId: "strategy-1",
        },
      ]
    );

    expect(violations).toHaveLength(1);
  });
});