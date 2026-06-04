/**
 * redis-event-consumer.ts
 *
 * Responsibility:
 * Provide Redis-backed deterministic event consumption.
 *
 * Owns:
 * - Redis stream consumption
 * - transport deserialization
 * - deterministic event consumption
 *
 * Does NOT Own:
 * - replay orchestration
 * - business intelligence
 * - workflow systems
 * - AI adaptation
 *
 * Critical Rules:
 * - transport consumption must remain deterministic
 * - transport deserialization must remain stable
 * - transport systems must remain infrastructure-owned
 */

import Redis
from "ioredis";

import {
  EventEnvelope,
} from "./event-envelope.types";

import {
  EventConsumer,
} from "./event-consumer.types";

export class RedisEventConsumer
implements EventConsumer {
  constructor(
    private readonly redis: Redis
  ) {}

  async subscribe<TPayload>(
    stream: string,
    handler: (
      envelope: EventEnvelope<TPayload>
    ) => Promise<void>
  ): Promise<void> {
    while (true) {
      const response =
        await this.redis.xread(
          "BLOCK",
          0,

          "STREAMS",

          stream,
          "$"
        );

      if (!response) {
        continue;
      }

      const [, entries] =
        response[0];

      for (const [, fields] of entries) {
        const raw =
          fields[1];

    const envelope =
  JSON.parse(
    raw
  ) as EventEnvelope<TPayload>;

        await handler(
          envelope
        );
      }
    }
  }
}