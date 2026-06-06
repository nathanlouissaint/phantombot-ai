import { describe, expect, it } from "vitest";
import { validateRouting } from "../routing-validator";

describe("routing-validator", () => {
  it("detects orphan route", () => {
    const violations = validateRouting(
      [],
      [
        {
          routeId: "route-1",
          contextId: "ctx-1",
        },
      ]
    );

    expect(violations).toHaveLength(1);
  });
});