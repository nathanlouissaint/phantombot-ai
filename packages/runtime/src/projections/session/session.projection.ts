/**
 * session.projection.ts
 *
 * Responsibility:
 * Provide deterministic behavioral session projection mutation.
 *
 * Owns:
 * - session projection state mutation
 * - deterministic session accumulation
 * - replay-safe behavioral aggregation
 * - namespace-aware projection persistence orchestration
 *
 * Does NOT Own:
 * - SQL ownership
 * - transaction lifecycle ownership
 * - replay orchestration
 * - infrastructure semantics
 *
 * Critical Rules:
 * - projections must remain deterministic
 * - projections must remain replay-safe
 * - projections must remain infrastructure-agnostic
 * - persistence ownership remains repository-scoped
 */

import {
  behaviorSessionRepository,
  TransactionContext,
} from "@phantombot/database";

import {
  ProjectionEvent,
  DEFAULT_PROJECTION_NAMESPACE,
  ProjectionNamespace,
} from "@phantombot/contracts";

export interface SessionProjectionPayload {
  readonly sessionId: string;
}

export class SessionProjection {
  constructor(
    private namespace: ProjectionNamespace =
      DEFAULT_PROJECTION_NAMESPACE
  ) {}

  async apply({
    transaction,
    event,
  }: {
    transaction: TransactionContext;
    event: ProjectionEvent<SessionProjectionPayload>;
  }): Promise<void> {
    const sessionId =
      event.payload.sessionId;

    await behaviorSessionRepository
      .upsertSession({
        transaction,

        sessionId,

        shopId:
          event.shopId,

        occurredAt:
          event.occurredAt,

        namespace:
          this.namespace,
      });
  }
}
