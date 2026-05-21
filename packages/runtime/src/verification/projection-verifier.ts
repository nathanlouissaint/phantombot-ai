/**
 * projection-verifier.ts
 *
 * Responsibility:
 * Provide deterministic replay verification.
 *
 * Owns:
 * - projection hashing
 * - deterministic replay verification
 * - projection drift detection
 * - replay correctness validation
 * - semantic state comparison
 *
 * Does NOT Own:
 * - projection mutation
 * - runtime orchestration
 * - replay execution
 * - checkpoint ownership
 *
 * Critical Rules:
 * - verification must compare semantic state
 * - infrastructure metadata must NOT affect hashes
 * - serialization must remain deterministic
 * - replay verification must remain namespace-agnostic
 */

import crypto from "crypto";

import { sql }
from "../../../database/src/postgres";

export class ProjectionVerifier {
  async loadProjectionState(
    namespace: string
  ) {
    return sql`
      SELECT
        projection_namespace,
        session_id,
        shop_id,
        started_at,
        last_activity_at,
        event_count
      FROM behavior_sessions
      WHERE projection_namespace =
        ${namespace}
      ORDER BY session_id ASC
    `;
  }

  async generateProjectionHash(
    namespace: string
  ) {
    const rows =
      await this.loadProjectionState(
        namespace
      );

    /**
     * Deterministic semantic normalization.
     *
     * Critical:
     * projection_namespace is intentionally
     * excluded because replay verification
     * validates behavioral equivalence,
     * NOT infrastructure isolation metadata.
     */
    const normalized =
      rows.map((row: any) => ({
        session_id:
          row.session_id,

        shop_id:
          row.shop_id,

        started_at:
          new Date(
            row.started_at
          ).toISOString(),

        last_activity_at:
          new Date(
            row.last_activity_at
          ).toISOString(),

        event_count:
          Number(
            row.event_count
          ),
      }));

    /**
     * Deterministic serialization.
     */
    const serialized =
      JSON.stringify(normalized);

    /**
     * Deterministic projection hash.
     */
    const hash =
      crypto
        .createHash("sha256")
        .update(serialized)
        .digest("hex");

    return {
      rows: normalized,
      serialized,
      hash,
    };
  }

  async verifyReplayDeterminism() {
    const live =
      await this.generateProjectionHash(
        "live"
      );

    const replay =
      await this.generateProjectionHash(
        "replay"
      );

    console.log(
      "\n[LIVE HASH]"
    );

    console.log(
      live.hash
    );

    console.log(
      "\n[REPLAY HASH]"
    );

    console.log(
      replay.hash
    );

    console.log(
      "\n[LIVE ROWS]"
    );

    console.dir(
      live.rows,
      { depth: null }
    );

    console.log(
      "\n[REPLAY ROWS]"
    );

    console.dir(
      replay.rows,
      { depth: null }
    );

    return (
      live.hash ===
      replay.hash
    );
  }
}

export const projectionVerifier =
  new ProjectionVerifier();