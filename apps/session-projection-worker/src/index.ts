/**
 * index.ts
 *
 * Responsibility:
 * Execute deterministic projection runtime loop.
 *
 * Owns:
 * - runtime execution loop
 * - ordered event consumption
 * - replay-safe worker execution
 * - checkpoint progression
 *
 * Does NOT Own:
 * - business logic
 * - projection persistence
 * - orchestration intelligence
 * - AI systems
 *
 * Critical Rules:
 * - workers process events sequentially
 * - checkpoints advance only after success
 * - replay must remain deterministic
 */

import "dotenv/config";

import {
  ProjectionRuntime,
} from "../../../packages/runtime/src/projection-runtime";

import {
  SessionProjectionWorker,
} from "./session-projection.worker";

const runtime =
  new ProjectionRuntime(
    "session_projection"
  );

const worker =
  new SessionProjectionWorker();

async function start() {
  console.log(
    "[SessionProjectionWorker] Starting..."
  );

  while (true) {
    try {
      const checkpoint =
        await runtime.loadCheckpoint();

      const events =
        await runtime.loadEvents(
          checkpoint
        );

      if (events.length === 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );

        continue;
      }

      for (const event of events) {
        await worker.process(event);

        await runtime.updateCheckpoint(
          event.sequence_id
        );

        console.log(
          `[SessionProjectionWorker] Processed sequence ${event.sequence_id}`
        );
      }
    } catch (error) {
      console.error(
        "[SessionProjectionWorker] Runtime error:",
        error
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
    }
  }
}

start();