/**
 * projection-namespace.types.ts
 *
 * Responsibility:
 * Define projection namespace contracts.
 *
 * Owns:
 * - projection namespace values
 * - replay isolation typing
 * - projection environment boundaries
 *
 * Does NOT Own:
 * - projection mutations
 * - runtime orchestration
 * - database persistence
 */

export type ProjectionNamespace =
  | "live"
  | "replay"
  | "experimental";

export const DEFAULT_PROJECTION_NAMESPACE:
  ProjectionNamespace = "live";