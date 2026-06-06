import {
  describe,
  expect,
  it,
} from "vitest";

import {
  PROVIDER_REGISTRY,
} from "../provider-registry";

describe(
  "provider-registry",
  () => {
    it(
      "contains supported providers",
      () => {
        expect(
          PROVIDER_REGISTRY.OPENAI
        ).toBe("OPENAI");

        expect(
          PROVIDER_REGISTRY.ANTHROPIC
        ).toBe("ANTHROPIC");

        expect(
          PROVIDER_REGISTRY.CUSTOM
        ).toBe("CUSTOM");
      }
    );
  }
);