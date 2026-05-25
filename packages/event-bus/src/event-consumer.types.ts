/**
 * event-consumer.types.ts
 *
 * Responsibility:
 * Define deterministic transport consumer contracts.
 *
 * Owns:
 * - transport event consumption
 * - infrastructure consumption abstraction
 * - replay-safe transport consumption semantics
 *
 * Does NOT Own:
 * - business intelligence
 * - orchestration systems
 * - replay progression
 * - AI adaptation
 *
 * Critical Rules:
 * - transport consumers must remain deterministic
 * - consumer contracts must remain infrastructure-scoped
 * - consumers must not own orchestration logic
 */

import {
  EventEnvelope,
} from "./event-envelope.types";

export interface EventConsumer {
  subscribe<TPayload>(
    stream: string,
    handler: (
      envelope: EventEnvelope<TPayload>
    ) => Promise<void>
  ): Promise<void>;
}