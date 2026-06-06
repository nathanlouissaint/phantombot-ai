import { describe, expect, it } from "vitest";

import {
  authorizeProviderExecution,
} from "../provider-execution-runtime";

describe(
  "provider execution runtime replay",
  () => {
    it(
      "produces identical decisions for identical inputs",
      () => {
        const request = {
          routingDecision: {
            taskId: "task-1",
            profile: "reasoning" as const,
          },
          boundaryReport: {
            checkedTargets: [],
            result: {
              valid: true,
              violations: [],
            },
          },
        };

        const live =
          authorizeProviderExecution(
            request
          );

        const replay =
          authorizeProviderExecution(
            request
          );

        expect(replay).toEqual(live);
      }
    );
  }
);