/**
 * replay-execution-runtime.test.ts
 *
 * Responsibility:
 * Verify deterministic replay runtime failure behavior.
 *
 * Owns:
 * - lease loss verification
 * - interruption verification
 * - zombie replay prevention
 * - runtime state verification
 *
 * Does NOT Own:
 * - replay execution logic
 * - checkpoint persistence
 * - recovery planning
 */

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  ReplayExecutionRuntime,
} from "../replay-execution-runtime";

vi.mock(
  "../../../replay/process-replay-batch",
  () => ({
    processReplayBatch:
      vi.fn(),
  })
);

import {
  processReplayBatch,
} from "../../../replay/process-replay-batch";

describe(
  "ReplayExecutionRuntime",
  () => {
    it(
      "interrupts when lease ownership is lost",
      async () => {
        const runtime =
          new ReplayExecutionRuntime();

        await runtime.start({
          namespace:
            "replay",

          verifyLeaseOwnership:
            async () => false,
        });

        expect(
          runtime.getState()
        ).toBe(
          "INTERRUPTED"
        );
      }
    );

    it(
      "stops when replay completes",
      async () => {
        vi.mocked(
          processReplayBatch
        ).mockResolvedValue({
          checkpoint:
            500,

          completed:
            true,
        });

        const runtime =
          new ReplayExecutionRuntime();

        await runtime.start({
          namespace:
            "replay",
        });

        expect(
          runtime.getState()
        ).toBe(
          "STOPPED"
        );
      }
    );

    it(
      "prevents zombie replay after lease loss",
      async () => {
        const runtime =
          new ReplayExecutionRuntime();

        let invocationCount =
          0;

        vi.mocked(
          processReplayBatch
        ).mockImplementation(
          async () => {
            invocationCount++;

            return {
              checkpoint:
                invocationCount,

              completed:
                false,
            };
          }
        );

        await runtime.start({
          namespace:
            "replay",

          verifyLeaseOwnership:
            async () =>
              invocationCount === 0,
        });

        expect(
          invocationCount
        ).toBe(1);

        expect(
          runtime.getState()
        ).toBe(
          "INTERRUPTED"
        );
      }
    );
  }
);