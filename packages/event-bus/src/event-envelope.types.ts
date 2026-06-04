/**
 * event-envelope.types.ts
 *
 * Responsibility:
 * Define canonical transport event envelope contracts.
 *
 * Owns:
 * - transport-safe event envelopes
 * - event serialization contracts
 * - infrastructure-level event metadata
 * - deterministic transport payload structure
 *
 * Does NOT Own:
 * - business event semantics
 * - projection contracts
 * - replay execution
 * - orchestration coordination
 * - AI systems
 *
 * Critical Rules:
 * - transport envelopes must remain immutable
 * - transport contracts must remain serialization-safe
 * - transport metadata must remain infrastructure-scoped
 * - transport contracts must not own business intelligence
 */

export interface EventEnvelope<TPayload = unknown> {
  readonly id: string;

  readonly type: string;

  readonly stream: string;

  readonly occurredAt: string;

  readonly payload: TPayload;
}