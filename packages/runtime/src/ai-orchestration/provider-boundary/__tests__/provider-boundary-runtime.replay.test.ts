import { describe, expect, it } from "vitest";

import {
  enforceProviderBoundary,
} from "../provider-boundary-runtime";

describe(
  "provider boundary runtime replay",
  () => {
    it(
      "produces deterministic reports",
      () => {
        const input = {
          targets: [
            {
              layer:
                "model-routing" as const,

              modulePath:
                "router.ts",

              imports: [],

              symbols: [
                "RoutingDecision",
              ],
            },
          ],

          governanceReport: {
            taskId: "task-1",

            approved: true,

            violations: [],
          },
        };

        const first =
          enforceProviderBoundary(
            input,
          );

        const second =
          enforceProviderBoundary(
            input,
          );

        expect(first)
          .toEqual(second);
      },
    );
  },
);
