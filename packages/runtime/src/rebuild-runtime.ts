/**
 * rebuild-runtime.ts
 *
 * Deterministic projection runtime worker.
 */

import { sql }
from "../../database/src/postgres";

import { ProjectionRuntime }
from "./projection-runtime";

import { workerLeaseService }
from "./leases/worker-lease.service";

import { startLeaseHeartbeat }
from "./leases/lease-heartbeat";

import {
  SessionProjection,
} from "./projections/session/session.projection";

import {
  DEFAULT_PROJECTION_NAMESPACE,
} from "../../contracts/src/projection-namespace.types";

async function startRuntime() {
  const projection =
    new SessionProjection({
      namespace:
        DEFAULT_PROJECTION_NAMESPACE,
    });

  const projectionName =
    projection.constructor.name;

  console.log(
    `[BOOTING PROJECTION] ${projectionName}`
  );

  const acquired =
    await workerLeaseService
      .acquireLease(
        projectionName
      );

  if (!acquired) {
    console.log(
      `[LEASE SKIPPED] ${projectionName}`
    );

    process.exit(0);
  }

  console.log(
    `[LEASE ACQUIRED] ${projectionName}`
  );

  const heartbeat =
    startLeaseHeartbeat(
      projectionName
    );

  const runtime =
    new ProjectionRuntime({
      projectionName,
      namespace:
        DEFAULT_PROJECTION_NAMESPACE,
    });

  const shutdown =
    async (signal: string) => {
      console.log(
        `[SHUTDOWN] ${signal}`
      );

      clearInterval(heartbeat);

      await workerLeaseService
        .releaseLease(
          projectionName
        );

      console.log(
        `[LEASE RELEASED] ${projectionName}`
      );

      process.exit(0);
    };

  process.on(
    "SIGINT",
    async () => {
      await shutdown("SIGINT");
    }
  );

  process.on(
    "SIGTERM",
    async () => {
      await shutdown("SIGTERM");
    }
  );

  while (true) {
    try {
      const checkpoint =
        await runtime
          .loadCheckpoint();

      const events =
        await runtime
          .loadEvents(
            checkpoint
          );

      if (events.length === 0) {
        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1000
            )
        );

        continue;
      }

      for (const event of events) {
        await sql.begin(
          async (tx: any) => {
            const alreadyApplied =
              await runtime
                .hasEventBeenApplied({
                  client: tx,
                  eventSequenceId:
                    event.sequence_id,
                });

            if (alreadyApplied) {
              return;
            }

            await projection.process(
              tx,
              event
            );

            await runtime
              .markEventApplied({
                client: tx,
                eventSequenceId:
                  event.sequence_id,
              });

            await runtime
              .updateCheckpoint({
                client: tx,
                sequence:
                  event.sequence_id,
              });

            console.log(
              `[EVENT PROCESSED] ${event.sequence_id}`
            );
          }
        );
      }
    } catch (error) {
      console.error(
        `[RUNTIME FAILURE]`,
        error
      );

      await shutdown("FAILURE");
    }
  }
}

startRuntime();