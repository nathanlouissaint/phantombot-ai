/**
 * ingest.route.ts
 *
 * Responsibility:
 * Provide HTTP ingestion route composition.
 *
 * Owns:
 * - request validation
 * - HTTP response shaping
 * - ingestion service invocation
 *
 * Does NOT Own:
 * - database persistence
 * - Redis publishing
 * - event sequencing
 * - projection runtime execution
 *
 * Critical Rules:
 * - route input must be validated before persistence
 * - eventType is canonical; event_name must never be accepted
 * - apps compose infrastructure packages only
 */

import { FastifyInstance } from "fastify";
import { z } from "zod";

import { EventStoreService } from "../services/event-store.service";

const eventStore =
  new EventStoreService();

const ingestEventSchema =
  z.object({
    eventId: z.string().optional(),

    shopId: z.string().min(1),

    sessionId: z.string().min(1),

    eventType: z.string().min(1),

    eventVersion: z.number().int().positive().optional(),

    payload: z.unknown(),

    source: z.string().min(1),

    checksum: z.string().nullable().optional(),

    occurredAt: z.string().min(1),
  });

export async function ingestRoute(
  server: FastifyInstance
) {
  server.post(
    "/ingest",

    async (request, reply) => {
      try {
        const event =
          ingestEventSchema.parse(request.body);

        const persistedEvent =
          await eventStore.persist(event);

        return reply.send({
          success: true,
          eventId: persistedEvent.eventId,
          sequenceId: persistedEvent.sequenceId,
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