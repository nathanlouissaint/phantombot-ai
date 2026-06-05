import { describe, expect, it } from "vitest";

import {
  verifyPlanningIntegrity,
} from "../planning-verification";

describe(
  "planning verification",
  () => {
    it(
      "returns valid when no violations exist",
      () => {
        const result =
          verifyPlanningIntegrity({
            decisions: [],
            plans: [],
            workflows: [],
            strategies: [],
            graph: {
              nodes: [],
              edges: [],
              workflows: [],
            },
          });

        expect(result.valid)
          .toBe(true);

        expect(result.violations)
          .toHaveLength(0);
      },
    );
  },
);
