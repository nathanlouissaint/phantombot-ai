/**
 * dead-letter.repository.ts
 *
 * Responsibility:
 * Own poison event quarantine persistence.
 *
 * Owns:
 * - dead-letter persistence
 * - replay diagnostics durability
 * - poison event storage
 *
 * Does NOT Own:
 * - runtime orchestration
 * - retry coordination
 * - projection mutation
 */

import {
  sql,
} from "../postgres";

export class DeadLetterRepository {
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

export const deadLetterRepository =
  new DeadLetterRepository();
