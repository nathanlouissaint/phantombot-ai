import "dotenv/config";

import {
  ProjectionRuntime,
} from "../../../packages/runtime/src/projection-runtime";

import {
  SessionProjection,
} from "../../../packages/runtime/src/projections/session/session.projection";

const runtime =
  new ProjectionRuntime(
    "session_projection"
  );

const projection =
  new SessionProjection();

let shuttingDown = false;

process.on(
  "SIGINT",
  async () => {
    console.log(
      "[Runtime] Graceful shutdown..."
    );

    shuttingDown = true;
  }
);

process.on(
  "SIGTERM",
  async () => {
    console.log(
      "[Runtime] Graceful shutdown..."
    );

    shuttingDown = true;
  }
);

async function start() {
  console.log(
    "[SessionProjectionWorker] Starting..."
  );

  while (!shuttingDown) {
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

      await runtime.processBatch(
        events,

        async (tx, event) => {
          await projection.process(
            tx,
            event
          );
        }
      );

      console.log(
        `[SessionProjectionWorker] Processed batch ending at ${events[events.length - 1].sequence_id}`
      );
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

  console.log(
    "[SessionProjectionWorker] Shutdown complete"
  );

  process.exit(0);
}

start();
