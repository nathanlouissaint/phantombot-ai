/**
 * Responsibility:
 * Canonical public export surface for database infrastructure.
 *
 * Owns:
 * - database client export
 * - repository export boundaries
 * - persistence infrastructure access
 * - transaction boundary exports
 *
 * Does NOT Own:
 * - runtime projection logic
 * - app composition
 * - transport infrastructure
 */

export { sql }
from "./postgres";

export type {
  DatabaseClient,
}
from "./postgres";

export * from "./transactions";

export * from "./repositories/behavior-event.repository";

export * from "./repositories/projection-checkpoint.repository";
export * from "./repositories/projection-idempotency.repository";
export * from "./repositories/behavior-session.repository";
export * from "./repositories/dead-letter.repository";
export * from "./repositories/worker-lease.repository";