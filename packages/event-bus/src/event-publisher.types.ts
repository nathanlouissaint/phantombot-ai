/**
 * event-publisher.types.ts
 *
 * Responsibility:
 * Define deterministic transport publishing contracts.
 *
 * Owns:
 * - event publishing abstraction
 * - transport publishing ownership
 * - infrastructure publishing contracts
 *
 * Does NOT Own:
 * - queue implementation
 * - business orchestration
 * - retry orchestration
 * - projection replay
 *
 * Critical Rules:
 * - publishers must remain transport-agnostic
 * - publishing contracts must remain deterministic
 * - transport abstractions must remain infrastructure-owned
 */

import {
  EventEnvelope,
} from "./event-envelope.types";

export interface EventPublisher {
  publish<TPayload>(
    envelope: EventEnvelope<TPayload>
  ): Promise<void>;
}