/**
 * task-definition.types.ts
 *
 * Responsibility:
 * Define deterministic AI task contracts.
 *
 * Does NOT Own:
 * - prompts
 * - providers
 * - execution
 */

export interface TaskDefinition {
  id: string;

  taskId: string;

  workflowId: string;

  taskType: string;

  objective: string;
}