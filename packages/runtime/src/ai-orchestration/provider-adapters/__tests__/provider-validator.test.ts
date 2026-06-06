import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateProviderRequest,
} from "../provider-validator";

describe(
  "provider-validator",
  () => {
    it(
      "accepts valid provider",
      () => {
        const violations =
          validateProviderRequest({
            taskId: "task-1",

            provider: "OPENAI",

            payload: {},
          });

        expect(
          violations
        ).toHaveLength(0);
      }
    );

    it(
      "detects missing task id",
      () => {
        const violations =
          validateProviderRequest({
            taskId: "",

            provider: "OPENAI",

            payload: {},
          });

        expect(
          violations
        ).toHaveLength(1);
      }
    );
  }
);