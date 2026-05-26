/**
 * worker-lease.repository.ts
 *
 * Responsibility:
 * Own deterministic distributed worker lease persistence.
 *
 * Owns:
 * - lease acquisition persistence
 * - lease renewal persistence
 * - lease expiration semantics
 * - ownership durability
 * - lease coordination queries
 *
 * Does NOT Own:
 * - worker lifecycle orchestration
 * - replay execution
 * - projection mutation
 * - runtime coordination
 *
 * Critical Rules:
 * - lease persistence must remain atomic
 * - repository owns all SQL mutation
 * - lease ownership must remain deterministic
 * - expiration semantics must remain centralized
 */

import { sql }
from "../postgres";

const LEASE_DURATION_SECONDS = 30;

export class WorkerLeaseRepository {
  async acquireLease({
    projectionName,
    workerId,
  }: {
    projectionName: string;
    workerId: string;
  }): Promise<boolean> {
    const result = await sql`
      INSERT INTO worker_leases (
        projection_name,
        worker_id,
        lease_expires_at,
        heartbeat_at
      )
      VALUES (
        ${projectionName},
        ${workerId},
        NOW()
          + interval '30 seconds',
        NOW()
      )

      ON CONFLICT (projection_name)

      DO UPDATE
      SET
        worker_id =
          EXCLUDED.worker_id,

        lease_expires_at =
          EXCLUDED.lease_expires_at,

        heartbeat_at =
          EXCLUDED.heartbeat_at,

        updated_at = NOW()

      WHERE
        worker_leases
          .lease_expires_at < NOW()

      RETURNING *
    `;

    return result.length > 0;
  }

  async renewLease({
    projectionName,
    workerId,
  }: {
    projectionName: string;
    workerId: string;
  }): Promise<boolean> {
    const result = await sql`
      UPDATE worker_leases

      SET
        lease_expires_at =
          NOW()
            + interval '30 seconds',

        heartbeat_at = NOW(),

        updated_at = NOW()

      WHERE projection_name =
        ${projectionName}

      AND worker_id =
        ${workerId}

      RETURNING *
    `;

    return result.length > 0;
  }

  async releaseLease({
    projectionName,
    workerId,
  }: {
    projectionName: string;
    workerId: string;
  }): Promise<void> {
    await sql`
      DELETE FROM worker_leases

      WHERE projection_name =
        ${projectionName}

      AND worker_id =
        ${workerId}
    `;
  }
}

export const workerLeaseRepository =
  new WorkerLeaseRepository();