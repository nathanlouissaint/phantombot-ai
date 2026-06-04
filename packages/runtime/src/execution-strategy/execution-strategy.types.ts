/**
 * execution-strategy.types.ts
 *
 * Responsibility:
 * Define deterministic execution strategy contracts.
 *
 * Owns:
 * - execution strategy shape
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 * - delivery channels
 */

export interface ExecutionStrategy {
  id: string;

  workflowId: string;

  strategyType:
    | "recovery"
    | "conversion"
    | "upsell"
    | "retention";

  executionOrder: number;
}
