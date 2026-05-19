/**
 * session-projection.worker.ts
 *
 * Responsibility:
 * Materialize deterministic behavioral session projections.
 *
 * Owns:
 * - session projection updates
 * - behavioral accumulation
 * - session state persistence
 *
 * Does NOT Own:
 * - replay orchestration
 * - checkpoint loading
 * - runtime execution loops
 * - AI intelligence
 *
 * Critical Rules:
 * - projections must remain replayable
 * - projections must remain deterministic
 * - projections must derive only from persisted events
 */

import { sql } from "../../../packages/database/src/postgres";

import {
  ProjectionEvent,
} from "../../../packages/contracts/src/projection.types";

export class SessionProjectionWorker {
  async process(
    event: ProjectionEvent
  ) {
    await sql`
      INSERT INTO behavior_sessions (
        session_id,
        shop_id,
        started_at,
        last_activity_at,
        event_count,
        updated_at
      )

      VALUES (
        ${event.session_id},
        ${event.shop_id},
        ${event.occurred_at},
        ${event.occurred_at},
        1,
        NOW()
      )

      ON CONFLICT (session_id)

      DO UPDATE SET
        event_count =
          behavior_sessions.event_count + 1,

        last_activity_at =
          EXCLUDED.last_activity_at,

        updated_at = NOW()
    `;
  }
}