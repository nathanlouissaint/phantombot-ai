/**
 * event-store.service.ts
 *
 * Responsibility:
 * Compose canonical behavior event persistence for ingestion-api.
 *
 * Owns:
 * - application-level persistence orchestration
 * - ingestion service boundary
 *
 * Does NOT Own:
 * - PostgreSQL clients
 * - SQL query construction
 * - Redis clients
 * - deterministic sequence ownership
 * - database schema translation
 *
 * Critical Rules:
 * - apps must consume @phantombot/database repositories
 * - apps must not import raw database clients
 * - eventType is canonical; event_name must never be used
 */

import {
  IngestionEventInput,
  PersistedBehaviorEvent,
} from "@phantombot/contracts";

import {
  behaviorEventRepository,
} from "@phantombot/database";

export class EventStoreService {
  async persist<TPayload>(
    event: IngestionEventInput<TPayload>
  ): Promise<PersistedBehaviorEvent<TPayload>> {
    return behaviorEventRepository.persist(event);
  }
}