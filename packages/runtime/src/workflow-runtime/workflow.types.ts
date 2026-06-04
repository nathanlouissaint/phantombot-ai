/**
 * workflow.types.ts
 *
 * Responsibility:
 * Define deterministic workflow contracts.
 *
 * Owns:
 * - workflow types
 * - execution plan contracts
 *
 * Does NOT Own:
 * - workflow execution
 * - AI orchestration
 * - persistence
 * - external integrations
 */

export type WorkflowType =
  | "recovery"
  | "conversion"
  | "upsell"
  | "retention";

export interface ExecutionPlan {
  id: string;

  decisionId: string;

  workflowType: WorkflowType;

  steps: string[];

  priority:
    | "low"
    | "medium"
    | "high"
    | "critical";
}