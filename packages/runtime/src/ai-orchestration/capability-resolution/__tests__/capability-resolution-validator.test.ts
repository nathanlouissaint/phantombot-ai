/**
 * Phase 8C
 *
 * Validates capability resolution inputs.
 */

import { describe, expect, it } from "vitest";

import {
  validateCapabilityResolution,
} from "../capability-resolution-validator";

describe(
  "validateCapabilityResolution",
  () => {
    it(
      "returns no violations for valid plans",
      () => {
        const violations =
          validateCapabilityResolution({
            taskId: "task-1",

            requirements: [
              {
                capability:
                  "classification",

                priority: 1,
              },
            ],
          });

        expect(
          violations,
        ).toEqual([]);
      },
    );

    it(
      "detects missing task id",
      () => {
        const violations =
          validateCapabilityResolution({
            taskId: "",

            requirements: [
              {
                capability:
                  "classification",

                priority: 1,
              },
            ],
          });

        expect(
          violations,
        ).toContain(
          "Missing task id",
        );
      },
    );
  },
);