/**
 * runtime-state.types.ts
 *
 * Responsibility:
 * Define canonical runtime lifecycle state contracts.
 *
 * Owns:
 * - runtime lifecycle state
 * - worker runtime status
 * - projection runtime status
 *
 * Does NOT Own:
 * - process management
 * - deployment health checks
 * - observability dashboards
 * - alerting systems
 *
 * Critical Rules:
 * - runtime state must be explicit
 * - shutdown state must be visible before execution stops
 * - unhealthy runtime state must not silently continue processing
 */

export type RuntimeLifecycleState =
  | "starting"
  | "running"
  | "draining"
  | "stopped"
  | "failed";

export interface RuntimeState {
  readonly state: RuntimeLifecycleState;
  readonly reason?: string;
}