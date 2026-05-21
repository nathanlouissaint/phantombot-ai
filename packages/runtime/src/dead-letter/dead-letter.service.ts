/**
 * dead-letter.service.ts
 *
 * Responsibility:
 * Provide poison event quarantine infrastructure.
 *
 * Owns:
 * - failed event quarantine
 * - replay diagnostics
 * - poison event persistence
 * - retry exhaustion tracking
 * - operational recovery durability
 *
 * Does NOT Own:
 * - projection mutations
 * - checkpoint ownership
 * - runtime orchestration
 * - event ingestion
 */

import { sql }
from "../../../database/src/postgres";

export class DeadLetterService {
  async quarantineEvent({
    projectionName,
    eventSequenceId,
    eventPayload,
    failureReason,
    stackTrace,
    retryCount,
  }: {
    projectionName: string;
    eventSequenceId: number;
    eventPayload: unknown;
    failureReason: string;
    stackTrace?: string;
    retryCount: number;
  }): Promise<void> {
    await sql`
      INSERT INTO dead_letter_events (
        projection_name,
        event_sequence_id,
        event_payload,
        failure_reason,
        stack_trace,
        retry_count
      )
      VALUES (
        ${projectionName},
        ${eventSequenceId},
        ${JSON.stringify(eventPayload)},
        ${failureReason},
        ${stackTrace ?? null},
        ${retryCount}
      )
    `;
  }
}

export const deadLetterService =
  new DeadLetterService();