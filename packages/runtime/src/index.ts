/**
 * index.ts
 *
 * Responsibility:
 * Expose stable runtime package exports.
 *
 * Owns:
 * - runtime export boundaries
 *
 * Does NOT Own:
 * - runtime orchestration
 * - persistence
 * - workflow execution
 */

export * from "./projection-runtime";

export * from "./projections/session-intelligence";