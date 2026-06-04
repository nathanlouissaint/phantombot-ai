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

export type StrategyUrgency =
  | "immediate"
  | "scheduled";

export type ExecutionGroup =
  | "customer_recovery"
  | "customer_conversion"
  | "customer_retention"
  | "customer_growth";

export interface ExecutionStrategy {
  id: string;

  workflowId: string;

  strategyType:
    | "recovery"
    | "conversion"
    | "upsell"
    | "retention";

  executionOrder: number;

  urgency: StrategyUrgency;

  executionGroup: ExecutionGroup;

  dependencyCount: number;
}
