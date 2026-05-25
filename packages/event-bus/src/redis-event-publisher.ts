/**
 * redis-event-publisher.ts
 *
 * Responsibility:
 * Provide Redis-backed deterministic event publishing.
 *
 * Owns:
 * - Redis stream publishing
 * - transport serialization
 * - deterministic event publishing
 *
 * Does NOT Own:
 * - business event generation
 * - orchestration coordination
 * - replay progression
 * - AI systems
 *
 * Critical Rules:
 * - publishing must remain deterministic
 * - transport serialization must remain stable
 * - infrastructure ownership must remain package-scoped
 */

import Redis
from "ioredis";

import {
  EventEnvelope,
} from "./event-envelope.types";

import {
  EventPublisher,
} from "./event-publisher.types";

export class RedisEventPublisher
implements EventPublisher {
  constructor(
    private readonly redis: Redis
  ) {}

  async publish<TPayload>(
    envelope: EventEnvelope<TPayload>
  ): Promise<void> {
    await this.redis.xadd(
      envelope.stream,
      "*",

      "event",
      JSON.stringify(envelope)
    );
  }
}