import crypto from "crypto";

import { sql } from "../lib/postgres";

export class EventStoreService {
  async persist(event: any) {
    const eventId =
      crypto.randomUUID();

    const result = await sql`
      INSERT INTO behavior_events (
        event_id,
        event_name,
        shop_id,
        session_id,
        payload,
        occurred_at
      )

      VALUES (
        ${eventId},
        ${event.event_name},
        ${event.shop_id},
        ${event.session_id},
        ${JSON.stringify(event)},
        ${event.timestamp}
      )

      RETURNING *
    `;

    return result[0];
  }
}
