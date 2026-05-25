/**
 * event-transport.types.ts
 *
 * Responsibility:
 * Define canonical transport ownership contracts.
 *
 * Owns:
 * - transport lifecycle abstraction
 * - publisher ownership
 * - consumer ownership
 *
 * Does NOT Own:
 * - Redis implementation details
 * - Kafka implementation details
 * - orchestration systems
 * - replay execution
 *
 * Critical Rules:
 * - transport ownership must remain infrastructure-scoped
 * - transports must remain deterministic
 * - applications must consume transports, not implement them
 */

import {
  EventPublisher,
} from "./event-publisher.types";

import {
  EventConsumer,
} from "./event-consumer.types";

export interface EventTransport {
  readonly publisher: EventPublisher;

  readonly consumer: EventConsumer;
}