/**
 * dependency-validator.ts
 *
 * Responsibility:
 * Validate workflow graph integrity.
 *
 * Detects:
 * - missing nodes
 * - invalid edges
 * - orphan dependencies
 * - dependency cycles
 *
 * Deterministic only.
 */

import type {
  WorkflowGraph,
} from "../workflow-graph/workflow-graph.types";

function detectCycles(
  graph: WorkflowGraph,
): string[] {
  const violations: string[] = [];

  const adjacency =
    new Map<string, string[]>();

  for (const edge of graph.edges) {
    const existing =
      adjacency.get(edge.from) ?? [];

    existing.push(edge.to);

    adjacency.set(
      edge.from,
      existing,
    );
  }

  const visited =
    new Set<string>();

  const active =
    new Set<string>();

  function dfs(
    nodeId: string,
  ): void {
    if (active.has(nodeId)) {
      violations.push(
        `Cycle detected at ${nodeId}`,
      );

      return;
    }

    if (visited.has(nodeId)) {
      return;
    }

    visited.add(nodeId);
    active.add(nodeId);

    const neighbors =
      adjacency.get(nodeId) ?? [];

    for (const neighbor of neighbors) {
      dfs(neighbor);
    }

    active.delete(nodeId);
  }

  for (const node of graph.nodes) {
    dfs(node.workflowId);
  }

  return violations;
}

export function validateDependencies(
  graph: WorkflowGraph,
): string[] {
  const violations: string[] = [];

  const nodeIds = new Set(
    graph.nodes.map(
      node => node.workflowId,
    ),
  );

  for (const edge of graph.edges) {
    if (!nodeIds.has(edge.from)) {
      violations.push(
        `Missing source node ${edge.from}`,
      );
    }

    if (!nodeIds.has(edge.to)) {
      violations.push(
        `Missing target node ${edge.to}`,
      );
    }
  }

  violations.push(
    ...detectCycles(graph),
  );

  return violations;
}
