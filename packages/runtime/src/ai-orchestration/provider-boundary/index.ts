/**
 * index.ts
 *
 * Responsibility:
 * Export provider-boundary enforcement contracts and utilities.
 *
 * Owns:
 * - provider-boundary public module surface
 *
 * Does NOT Own:
 * - provider execution
 * - provider implementations
 * - model calls
 */

export * from "./provider-boundary.types";
export * from "./provider-boundary-policy";
export * from "./provider-boundary-validator";
export * from "./provider-boundary-runtime";