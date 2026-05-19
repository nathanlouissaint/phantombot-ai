/**
 * projection.types.ts
 *
 * Responsibility:
 * Define canonical runtime projection contracts.
 *
 * Owns:
 * - projection event contracts
 * - checkpoint contracts
 * - replay-safe runtime typing
 *
 * Does NOT Own:
 * - business logic
 * - orchestration
 * - persistence
 * - worker execution
 *
 * Critical Rules:
 * - projection contracts must remain deterministic
 * - projection contracts must remain canonical
 * - runtime typing must remain infrastructure-owned
 */

export interface ProjectionCheckpoint {
  projection_name: string;

  last_processed_sequence: number;
}

export interface ProjectionEvent {
  sequence_id: number;

  event_id: string;

  shop_id: string;

  session_id: string;

  event_type: string;

  event_version: string;

  payload: Record<string, unknown>;

  source: string;

  occurred_at: string;

  ingested_at: string;
}