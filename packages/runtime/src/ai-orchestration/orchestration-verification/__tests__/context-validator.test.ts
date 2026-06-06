import { describe, expect, it } from "vitest";
import { validateContexts } from "../context-validator";

describe("context-validator", () => {
  it("detects orphan context", () => {
    const violations = validateContexts(
      [],
      [
        {
          contextId: "ctx-1",
          taskId: "task-1",
        },
      ]
    );

    expect(violations).toHaveLength(1);
  });
});