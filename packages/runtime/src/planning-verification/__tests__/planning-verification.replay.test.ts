import { describe, expect, it } from "vitest";

import {
  verifyPlanningIntegrity,
} from "../planning-verification";

describe(
  "planning verification replay",
  () => {
    it(
      "produces identical results for identical input",
      () => {
        const input = {
          decisions: [],
          plans: [],
          workflows: [],
          strategies: [],
          graph: {
            nodes: [],
            edges: [],
            workflows: [],
          },
        };

        const first =
          verifyPlanningIntegrity(input);

        const second =
          verifyPlanningIntegrity(input);

        expect(first)
          .toEqual(second);
      },
    );
  },
);
