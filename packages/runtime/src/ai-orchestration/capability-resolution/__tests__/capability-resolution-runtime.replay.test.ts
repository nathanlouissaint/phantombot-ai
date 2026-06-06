/**
 * Phase 8C
 *
 * Replay verification.
 *
 * Ensures capability resolution produces
 * identical outputs for identical inputs.
 *
 * Constraints:
 * - Deterministic
 * - Replay Safe
 * - Serializable
 */

import { describe, expect, it } from "vitest";

import type {
  CapabilityPlan,
} from "../../capability-planning";

import {
  resolveCapabilities,
} from "../capability-resolution-runtime";

describe(
  "resolveCapabilities replay",
  () => {
    it(
      "produces identical output for identical input",
      () => {
        const plan: CapabilityPlan = {
          taskId: "task-1",

          requirements: [
            {
              capability:
                "classification",

              priority: 1,
            },

            {
              capability:
                "reasoning",

              priority: 10,
            },
          ],
        };

        const first =
          resolveCapabilities(plan);

        const second =
          resolveCapabilities(plan);

        expect(
          second,
        ).toEqual(first);
      },
    );
  },
);