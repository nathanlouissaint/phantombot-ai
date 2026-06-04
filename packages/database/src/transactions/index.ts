/**
 * transactions/index.ts
 *
 * Responsibility:
 * Provide canonical transaction export surface.
 *
 * Owns:
 * - transaction abstraction exports
 * - deterministic execution boundary exports
 *
 * Does NOT Own:
 * - repository exports
 * - runtime orchestration
 * - infrastructure lifecycle management
 */

export * from "./transaction-context";
export * from "./transaction-runner";
