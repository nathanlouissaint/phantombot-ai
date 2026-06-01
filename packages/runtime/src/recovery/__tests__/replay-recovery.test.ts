import {
  describe,
  expect,
  it,
} from "vitest";

import {
  ReplayRecovery,
} from "../replay-recovery";

describe(
  "ReplayRecovery",
  () => {
    it(
      "resumes from checkpoint",
      async () => {
        const recovery =
          new ReplayRecovery();

        const plan =
          await recovery.recover({
            namespace:
              "replay",

            loadCheckpoint:
              async () => 250,

            verifyLeaseOwnership:
              async () => true,
          });

        expect(
          plan.checkpoint
        ).toBe(250);

        expect(
          plan.canResume
        ).toBe(true);

        expect(
          plan.reason
        ).toBe(
          "CHECKPOINT_FOUND"
        );
      }
    );

    it(
      "blocks recovery without lease ownership",
      async () => {
        const recovery =
          new ReplayRecovery();

        const plan =
          await recovery.recover({
            namespace:
              "replay",

            loadCheckpoint:
              async () => 250,

            verifyLeaseOwnership:
              async () => false,
          });

        expect(
          plan.canResume
        ).toBe(false);

        expect(
          plan.reason
        ).toBe(
          "LEASE_NOT_OWNED"
        );
      }
    );

    it(
      "allows startup when no checkpoint exists",
      async () => {
        const recovery =
          new ReplayRecovery();

        const plan =
          await recovery.recover({
            namespace:
              "replay",

            loadCheckpoint:
              async () => null,

            verifyLeaseOwnership:
              async () => true,
          });

        expect(
          plan.checkpoint
        ).toBe(0);

        expect(
          plan.canResume
        ).toBe(true);

        expect(
          plan.reason
        ).toBe(
          "NO_CHECKPOINT"
        );
      }
    );
  }
);