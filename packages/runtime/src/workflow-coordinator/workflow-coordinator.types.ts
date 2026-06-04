/**
 * workflow-coordinator.types.ts
 *
 * Responsibility:
 * Define deterministic workflow coordination contracts.
 *
 * Owns:
 * - coordinated workflow shape
 * - workflow ordering metadata
 *
 * Does NOT Own:
 * - execution
 * - persistence
 * - orchestration
 */

import type {
  ExecutionPlan,
} from "../workflow-runtime/workflow.types";

export interface CoordinatedWorkflow
  extends ExecutionPlan {

  executionOrder: number;
}
