/**
 * runtime/index.ts
 *
 * Responsibility:
 * Export canonical deterministic runtime contracts.
 *
 * Owns:
 * - runtime contract barrel exports
 * - projection execution contract exposure
 * - replay contract exposure
 * - worker lease contract exposure
 *
 * Does NOT Own:
 * - runtime implementation
 * - database implementation
 * - projection mutation logic
 * - orchestration implementation
 *
 * Critical Rules:
 * - this file must only export contracts
 * - no runtime side effects are allowed
 * - no implementation code belongs here
 */

export * from "./deterministic-time.types";
export * from "./execution-result.types";
export * from "./projection-checkpoint.types";
export * from "./projection-event.types";
export * from "./projection-runtime.types";
export * from "./replay.types";
export * from "./runtime-state.types";
export * from "./worker-lease.types";
export * from "./ingestion-event.types";