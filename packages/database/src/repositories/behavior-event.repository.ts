/**
 * behavior-event.repository.ts
 *
 * Responsibility:
 * Own deterministic behavior event persistence.
 *
 * Owns:
 * - behavior_events insert semantics
 * - camelCase contract to snake_case schema translation
 * - deterministic sequence ownership handoff
 * - persisted event result mapping
 *
 * Does NOT Own:
 * - HTTP request validation
 * - Redis transport publishing
 * - projection runtime execution
 * - AI orchestration
 *
 * Critical Rules:
 * - sequence_id is database-owned and monotonic
 * - eventType is canonical; event_name must never be used
 * - apps must never write behavior_events directly
 * - persistence schema must not leak into application code
 */

import crypto from "crypto";

import {
  IngestionEventInput,
  PersistedBehaviorEvent,
} from "@phantombot/contracts";

import { sql } from "../postgres";

export class BehaviorEventRepository {
  async persist<TPayload>(
    event: IngestionEventInput<TPayload>
  ): Promise<PersistedBehaviorEvent<TPayload>> {
    const eventId =
      event.eventId ?? crypto.randomUUID();

    const result =
      await sql<PersistedBehaviorEvent<TPayload>[]>`
        INSERT INTO behavior_events (
          event_id,
          shop_id,
          session_id,
          event_type,
          event_version,
          payload,
          source,
          checksum,
          occurred_at
        )

        VALUES (
          ${eventId},
          ${event.shopId},
          ${event.sessionId},
          ${event.eventType},
          ${event.eventVersion ?? 1},
          ${JSON.stringify(event.payload)},
          ${event.source},
          ${event.checksum ?? null},
          ${event.occurredAt}
        )

        RETURNING
          sequence_id as "sequenceId",
          id,
          event_id as "eventId",
          shop_id as "shopId",
          session_id as "sessionId",
          event_type as "eventType",
          event_version as "eventVersion",
          payload,
          source,
          checksum,
          occurred_at as "occurredAt",
          ingested_at as "ingestedAt"
      `;

    return result[0];
  }
}

export const behaviorEventRepository =
  new BehaviorEventRepository();