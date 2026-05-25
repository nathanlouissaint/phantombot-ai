/**
 * transaction-runner.ts
 *
 * Responsibility:
 * Own deterministic database transaction orchestration.
 *
 * Owns:
 * - transaction lifecycle management
 * - commit orchestration
 * - rollback orchestration
 * - deterministic transactional execution
 * - infrastructure durability boundaries
 *
 * Does NOT Own:
 * - runtime orchestration
 * - projection sequencing
 * - replay coordination
 * - repository mutation semantics
 *
 * Critical Rules:
 * - runtime systems must NEVER manage transaction lifecycle
 * - rollback semantics remain database-owned
 * - transaction execution must remain deterministic
 * - infrastructure ownership must remain isolated
 */

import {
  sql,
} from "../postgres";

import {
  TransactionContext,
} from "./transaction-context";

/**
 * runInTransaction
 *
 * Responsibility:
 * Execute deterministic transactional workloads.
 *
 * Critical Rules:
 * - transaction lifecycle remains database-owned
 * - rollback semantics remain infrastructure-owned
 * - execution boundaries must remain replay-safe
 */
export async function runInTransaction<T>(
  operation: (
    transaction: TransactionContext
  ) => Promise<T>
): Promise<T> {
  const result = await sql.begin(
    async (tx) => {
      return operation({
        tx,
      });
    }
  );

  return result as T;
}
