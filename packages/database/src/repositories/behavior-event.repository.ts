/**
 * behavior-event.repository.ts
 *
 * Responsibility:
 * Own deterministic behavior event persistence.
 *
 * Owns:
 * - behavior_events insert semantics
 * - behavior_events read semantics
 * - deterministic event ordering queries
 * - camelCase contract ↔ snake_case schema translation
 * - deterministic sequence ownership handoff
 * - persisted event result mapping
 *
 * Does NOT Own:
 * - HTTP request validation
 * - Redis transport publishing
 * - projection runtime execution
 * - replay orchestration
 * - AI orchestration
 *
 * Critical Rules:
 * - sequence_id is database-owned and monotonic
 * - event ordering must always be sequence_id ASC
 * - eventType is canonical; event_name must never be used
 * - apps must never write behavior_events directly
 * - persistence schema must not leak into application code
 */

import crypto from "crypto";

import {
  IngestionEventInput,
  PersistedBehaviorEvent,
  ProjectionEvent,
} from "@phantombot/contracts";

import { sql } from "../postgres";

export class BehaviorEventRepository {
  /**
   * persist
   *
   * Responsibility:
   * Persist canonical behavior events.
   */
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

  /**
   * loadEvents
   *
   * Responsibility:
   * Load deterministic replay events.
   *
   * Critical Rules:
   * - ordering must always be sequence_id ASC
   * - replay must remain deterministic
   * - repository owns SQL semantics
   */
  async loadEvents<TPayload>({
    lastSequence,
    batchSize,
  }: {
    lastSequence: number;
    batchSize: number;
  }): Promise<ProjectionEvent<TPayload>[]> {
    return sql<
      ProjectionEvent<TPayload>[]
    >`
      SELECT
        sequence_id as "sequence",

        event_id as "id",

        event_type as "type",

        shop_id as "shopId",

        occurred_at as "occurredAt",

        payload

      FROM behavior_events

      WHERE sequence_id >
        ${lastSequence}

      ORDER BY sequence_id ASC

      LIMIT ${batchSize}
    `;
  }
}

export const behaviorEventRepository =
  new BehaviorEventRepository();