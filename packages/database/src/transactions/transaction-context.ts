/**
 * transaction-context.ts
 *
 * Responsibility:
 * Provide canonical deterministic transaction boundary contracts.
 *
 * Owns:
 * - transaction-scoped SQL execution context
 * - infrastructure transaction isolation
 * - replay-safe transactional execution typing
 *
 * Does NOT Own:
 * - runtime orchestration
 * - projection mutation logic
 * - repository semantics
 * - transaction lifecycle ownership
 *
 * Critical Rules:
 * - runtime must NEVER import postgres directly
 * - transaction ownership remains database-scoped
 * - transaction contracts must remain deterministic
 * - infrastructure driver awareness must remain isolated
 */

import {
  TransactionSql,
} from "postgres";

/**
 * TransactionContext
 *
 * Responsibility:
 * Define canonical transaction execution boundary.
 *
 * Critical Rules:
 * - transaction typing must remain infrastructure-owned
 * - runtime systems consume abstractions only
 * - transaction execution must remain replay-safe
 */
export interface TransactionContext {
  readonly tx: TransactionSql<{}>;
}
