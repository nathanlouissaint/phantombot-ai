import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  ReplayRestartCoordinator,
} from "../replay-restart-coordinator";

describe(
  "ReplayRestartCoordinator",
  () => {
    it(
      "blocks invalid restart",
      async () => {
        const runtime = {
          start: vi.fn(),
        };

        const coordinator =
          new ReplayRestartCoordinator(
            runtime as any
          );

        await expect(
          coordinator.restart({
            namespace:
              "replay",

            checkpoint: 0,

            canResume:
              false,

            reason:
              "LEASE_NOT_OWNED",
          })
        ).rejects.toThrow();
      }
    );

    it(
      "starts runtime from recovery checkpoint",
      async () => {
        const runtime = {
          start: vi.fn(),
        };

        const coordinator =
          new ReplayRestartCoordinator(
            runtime as any
          );

        await coordinator.restart({
          namespace:
            "replay",

          checkpoint:
            250,

          canResume:
            true,

          reason:
            "CHECKPOINT_FOUND",
        });

        expect(
          runtime.start
        ).toHaveBeenCalledWith({
          namespace:
            "replay",

          checkpoint:
            250,
        });
      }
    );
  }
);