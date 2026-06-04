import { describe, expect, it } from "vitest";

import { ReplayRuntimeStateStore } from "../replay-runtime-state";

describe(
  "ReplayRuntimeStateStore",
  () => {
    it(
      "allows valid transitions",
      () => {
        const store =
          new ReplayRuntimeStateStore();

        store.transitionTo(
          "RUNNING"
        );

        expect(
          store.getState()
        ).toBe(
          "RUNNING"
        );
      }
    );

    it(
      "rejects invalid transitions",
      () => {
        const store =
          new ReplayRuntimeStateStore();

        expect(() =>
          store.transitionTo(
            "STOPPED"
          )
        ).toThrow();
      }
    );
  }
);