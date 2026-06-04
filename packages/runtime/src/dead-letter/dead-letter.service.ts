/**
 * dead-letter.service.ts
 *
 * Responsibility:
 * Provide poison event quarantine orchestration.
 *
 * Owns:
 * - failed event quarantine coordination
 * - replay diagnostics orchestration
 * - retry exhaustion coordination
 * - operational recovery orchestration
 *
 * Does NOT Own:
 * - SQL persistence
 * - dead-letter mutation storage
 * - projection mutations
 * - checkpoint ownership
 * - infrastructure durability
 *
 * Critical Rules:
 * - runtime must remain infrastructure-agnostic
 * - runtime must never own SQL mutation
 * - persistence semantics belong to repositories only
 * - dead-letter coordination must remain deterministic
 */

import {
  deadLetterRepository,
} from "@phantombot/database";

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
    await deadLetterRepository
      .quarantineEvent({
        projectionName,
        eventSequenceId,
        eventPayload,
        failureReason,
        stackTrace,
        retryCount,
      });
  }
}

export const deadLetterService =
  new DeadLetterService();