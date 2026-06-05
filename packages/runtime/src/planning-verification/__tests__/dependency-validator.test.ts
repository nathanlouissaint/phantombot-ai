import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateDependencies,
} from "../dependency-validator";

describe(
  "dependency validator",
  () => {
    it(
      "detects cycles",
      () => {
        const violations =
          validateDependencies({
            nodes: [
              {
                workflowId: "a",
              },
              {
                workflowId: "b",
              },
            ],

            edges: [
              {
                from: "a",
                to: "b",
              },
              {
                from: "b",
                to: "a",
              },
            ],

            workflows: [],
          });

        expect(
          violations.some(
            violation =>
              violation.includes(
                "Cycle detected",
              ),
          ),
        ).toBe(true);
      },
    );

    it(
      "accepts valid graphs",
      () => {
        const violations =
          validateDependencies({
            nodes: [
              {
                workflowId: "a",
              },
              {
                workflowId: "b",
              },
            ],

            edges: [
              {
                from: "a",
                to: "b",
              },
            ],

            workflows: [],
          });

        expect(
          violations,
        ).toHaveLength(0);
      },
    );
  },
);
