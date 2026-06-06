/**
 * Phase 8C
 *
 * Verifies deterministic capability
 * resolution behavior.
 */

import { describe, expect, it } from "vitest";

import {
  resolveCapabilities,
} from "../capability-resolution-runtime";

describe(
  "resolveCapabilities",
  () => {
    it(
      "orders capabilities deterministically",
      () => {
        const result =
          resolveCapabilities({
            taskId: "task-1",

            requirements: [
              {
                capability:
                  "reasoning",

                priority: 10,
              },

              {
                capability:
                  "classification",

                priority: 1,
              },
            ],
          });

        expect(
          result.capabilities,
        ).toEqual([
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
        ]);
      },
    );
  },
);