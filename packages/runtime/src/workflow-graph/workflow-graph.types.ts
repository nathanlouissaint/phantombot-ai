/**
 * workflow-graph.types.ts
 *
 * Responsibility:
 * Define workflow graph contracts.
 *
 * Owns:
 * - graph nodes
 * - graph edges
 * - workflow graph
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 * - persistence
 */

import type {
  CoordinatedWorkflow,
} from "../workflow-coordinator/workflow-coordinator.types";

export interface WorkflowNode {
  workflowId: string;
}

export interface WorkflowEdge {
  from: string;
  to: string;
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  workflows: CoordinatedWorkflow[];
}
