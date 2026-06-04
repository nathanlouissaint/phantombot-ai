/**
 * execution-strategy-planner.ts
 *
 * Responsibility:
 * Build execution strategies from workflow graphs.
 *
 * Owns:
 * - strategy planning
 *
 * Does NOT Own:
 * - execution
 * - delivery
 */

import type {
  WorkflowGraph,
} from "../workflow-graph/workflow-graph.types";

import type {
  ExecutionStrategy,
} from "./execution-strategy.types";

import {
  determineStrategyType,
} from "./strategy-policy";

export function buildExecutionStrategies(
  graph: WorkflowGraph,
): ExecutionStrategy[] {
  return graph.workflows.map(
    workflow => ({
      id:
        `strategy:${workflow.id}`,

      workflowId:
        workflow.id,

      strategyType:
        determineStrategyType(workflow),

      executionOrder:
        workflow.executionOrder,
    }),
  );
}
