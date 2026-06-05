/**
 * orchestration.types.ts
 *
 * Responsibility:
 * Define deterministic orchestration contracts.
 *
 * Owns:
 * - orchestration task shape
 * - orchestration context shape
 * - orchestration result shape
 *
 * Does NOT Own:
 * - model providers
 * - prompts
 * - API integrations
 * - execution
 *
 * Critical Rules:
 * - contracts must remain deterministic
 * - contracts must remain serializable
 * - contracts must remain replay safe
 */

export type OrchestrationTaskType =
  | "recovery"
  | "conversion"
  | "upsell"
  | "retention";

export interface OrchestrationTask {
  id: string;

  workflowId: string;

  taskType: OrchestrationTaskType;

  executionOrder: number;
}

export interface OrchestrationContext {
  workflowId: string;

  strategyId: string;

  executionGroup: string;
}

export interface OrchestrationRequest {
  task: OrchestrationTask;

  context: OrchestrationContext;
}