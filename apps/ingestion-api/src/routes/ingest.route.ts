import { FastifyInstance } from "fastify";

import { EventStoreService } from "../services/event-store.service";

const eventStore =
  new EventStoreService();

export async function ingestRoute(
  server: FastifyInstance
) {
  server.post(
    "/ingest",

    async (request, reply) => {
      try {
        const body =
          request.body as any;

        const event =
          await eventStore.persist(body);

        return reply.send({
          success: true,
          event_id: event.event_id,
        });
      } catch (error) {
        server.log.error(error);

        return reply.status(500).send({
          success: false,
          error: "ingestion_failed",
        });
      }
    }
  );
}
