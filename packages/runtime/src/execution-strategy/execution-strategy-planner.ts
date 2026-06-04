/**
 * execution-strategy-planner.ts
 *
 * Responsibility:
 * Build enriched execution strategies.
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
  determineExecutionGroup,
  determineStrategyType,
  determineUrgency,
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

      urgency:
        determineUrgency(workflow),

      executionGroup:
        determineExecutionGroup(workflow),

      dependencyCount:
        graph.edges.filter(
          edge =>
            edge.to === workflow.id,
        ).length,
    }),
  );
}
