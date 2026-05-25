/**
 * ingestion-event.types.ts
 *
 * Responsibility:
 * Define canonical ingestion event contracts for deterministic persistence.
 *
 * Owns:
 * - ingestion event input contract
 * - persisted ingestion event result contract
 * - canonical event field naming
 * - runtime-safe event metadata
 *
 * Does NOT Own:
 * - database implementation
 * - Redis transport implementation
 * - HTTP validation logic
 * - projection mutation logic
 *
 * Critical Rules:
 * - ingestion events must use canonical camelCase runtime fields
 * - persistence layer translates camelCase contracts into snake_case schema
 * - eventType is canonical; event_name must never be used
 * - sequenceId is database-owned and must be monotonic
 */

export interface IngestionEventInput<TPayload = unknown> {
  readonly eventId?: string;
  readonly shopId: string;
  readonly sessionId: string;
  readonly eventType: string;
  readonly eventVersion?: number;
  readonly payload: TPayload;
  readonly source: string;
  readonly checksum?: string | null;
  readonly occurredAt: string;
}

export interface PersistedBehaviorEvent<TPayload = unknown> {
  readonly sequenceId: number;
  readonly id: string;
  readonly eventId: string;
  readonly shopId: string;
  readonly sessionId: string;
  readonly eventType: string;
  readonly eventVersion: number;
  readonly payload: TPayload;
  readonly source: string;
  readonly checksum: string | null;
  readonly occurredAt: string;
  readonly ingestedAt: string;
}