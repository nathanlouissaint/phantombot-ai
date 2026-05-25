/**
 * index.ts
 *
 * Responsibility:
 * Expose public session intelligence projection exports.
 *
 * Owns:
 * - projection export boundaries
 *
 * Does NOT Own:
 * - runtime execution
 * - orchestration
 * - persistence
 */

export * from "./session-intelligence.projection";
export * from "./session-intelligence.reducer";
export * from "./session-intelligence.helpers";
export * from "./session-intelligence.types";