/**
 * Responsibility:
 * Canonical public export surface for database infrastructure.
 *
 * Owns:
 * - database client export
 * - repository export boundaries
 * - persistence infrastructure access
 *
 * Does NOT Own:
 * - runtime projection logic
 * - app composition
 * - transport infrastructure
 */

export { sql } from "./postgres";
export type { DatabaseClient } from "./postgres";

export * from "./repositories/behavior-event.repository";