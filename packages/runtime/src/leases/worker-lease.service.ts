/**
 * WorkerLeaseService
 *
 * Responsibility:
 * Provide deterministic distributed worker ownership.
 *
 * Owns:
 * - projection lease acquisition
 * - lease renewal
 * - lease expiration handling
 * - deterministic ownership coordination
 * - worker heartbeat progression
 *
 * Does NOT Own:
 * - projection mutations
 * - checkpoint progression
 * - replay orchestration
 * - business logic
 */

import { randomUUID } from "crypto";

import { sql } from "../../../database/src/postgres";

const LEASE_DURATION_SECONDS = 30;

export class WorkerLeaseService {
  readonly workerId = randomUUID();

  async acquireLease(
    projectionName: string
  ): Promise<boolean> {
    const result = await sql`
      INSERT INTO worker_leases (
        projection_name,
        worker_id,
        lease_expires_at,
        heartbeat_at
      )
      VALUES (
        ${projectionName},
        ${this.workerId},
        NOW() + interval '30 seconds',
        NOW()
      )

      ON CONFLICT (projection_name)

      DO UPDATE
      SET
        worker_id = EXCLUDED.worker_id,

        lease_expires_at =
          EXCLUDED.lease_expires_at,

        heartbeat_at =
          EXCLUDED.heartbeat_at,

        updated_at = NOW()

      WHERE worker_leases.lease_expires_at < NOW()

      RETURNING *
    `;

    return result.length > 0;
  }

  async renewLease(
    projectionName: string
  ): Promise<boolean> {
    const result = await sql`
      UPDATE worker_leases

      SET
        lease_expires_at =
          NOW() + interval '30 seconds',

        heartbeat_at = NOW(),

        updated_at = NOW()

      WHERE projection_name =
        ${projectionName}

      AND worker_id =
        ${this.workerId}

      RETURNING *
    `;

    return result.length > 0;
  }

  async releaseLease(
    projectionName: string
  ): Promise<void> {
    await sql`
      DELETE FROM worker_leases
      WHERE projection_name =
        ${projectionName}

      AND worker_id =
        ${this.workerId}
    `;
  }
}

export const workerLeaseService =
  new WorkerLeaseService();