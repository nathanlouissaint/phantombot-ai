import {
  describe,
  expect,
  it,
} from "vitest";

import {
  executeAdapter,
} from "../provider-adapter";

import type {
  ProviderAdapter,
} from "../provider.types";

describe(
  "provider-adapter",
  () => {
    it(
      "executes adapter contract",
      async () => {
        const adapter: ProviderAdapter =
          {
            provider: "CUSTOM",

            async execute(
              request
            ) {
              return {
                taskId:
                  request.taskId,

                provider:
                  request.provider,

                result: {},
              };
            },
          };

        const result =
          await executeAdapter(
            adapter,
            {
              taskId: "task-1",

              provider:
                "CUSTOM",

              payload: {},
            }
          );

        expect(
          result.taskId
        ).toBe("task-1");
      }
    );
  }
);