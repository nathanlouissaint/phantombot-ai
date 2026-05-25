/**
 * projection-event.types.ts
 *
 * Responsibility:
 * Define canonical event contracts consumed by deterministic projections.
 *
 * Owns:
 * - projection event envelope
 * - ordered event sequencing
 * - replay-safe event metadata
 *
 * Does NOT Own:
 * - Shopify webhook payload structure
 * - raw ingestion events
 * - AI-generated events
 * - transport-specific queue messages
 *
 * Critical Rules:
 * - projection events must be immutable
 * - projection events must be globally ordered per deterministic stream
 * - projections must consume event envelopes, not raw external payloads
 */

import { DeterministicTimestamp } from "./deterministic-time.types";

export type ProjectionEventSequence = number & {
  readonly __brand: "ProjectionEventSequence";
};

export type ProjectionEventId = string & {
  readonly __brand: "ProjectionEventId";
};

export type ProjectionEventType = string & {
  readonly __brand: "ProjectionEventType";
};

export interface ProjectionEvent<TPayload = unknown> {
  readonly id: ProjectionEventId;
  readonly sequence: ProjectionEventSequence;
  readonly type: ProjectionEventType;
  readonly shopId: string;
  readonly occurredAt: DeterministicTimestamp;
  readonly payload: TPayload;
}