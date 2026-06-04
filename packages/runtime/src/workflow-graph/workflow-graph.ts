/**
 * workflow-graph.ts
 *
 * Responsibility:
 * Build deterministic workflow graphs.
 *
 * Owns:
 * - graph construction
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import type {
  CoordinatedWorkflow,
} from "../workflow-coordinator/workflow-coordinator.types";

import type {
  WorkflowGraph,
} from "./workflow-graph.types";

import {
  buildDependencies,
} from "./workflow-dependencies";

export function buildWorkflowGraph(
  workflows: CoordinatedWorkflow[],
): WorkflowGraph {
  return {
    nodes:
      workflows.map(
        workflow => ({
          workflowId:
            workflow.id,
        }),
      ),

    edges:
      buildDependencies(workflows),

    workflows,
  };
}
