/**
 * session-intelligence.types.ts
 *
 * Responsibility:
 * Define internal projection-specific intelligence types.
 *
 * Owns:
 * - projection mutation context
 * - projection event narrowing
 * - deterministic intelligence computation contracts
 *
 * Does NOT Own:
 * - database persistence
 * - replay orchestration
 * - AI generation
 * - workflow execution
 */

import {
  CommerceEventEnvelope,
} from "@phantombot/contracts";

export interface SessionProjectionMutationResult {
  shouldIncrementHesitation: boolean;
  shouldIncreaseIntent: boolean;
  shouldMarkAbandoned: boolean;
  shouldMarkConverted: boolean;
}

export type SessionProjectionEvent =
  CommerceEventEnvelope<Record<string, unknown>>;