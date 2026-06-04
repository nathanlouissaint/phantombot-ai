/**
 * workflow-dependencies.ts
 *
 * Responsibility:
 * Define deterministic workflow dependencies.
 *
 * Owns:
 * - dependency rules
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import type {
  CoordinatedWorkflow,
} from "../workflow-coordinator/workflow-coordinator.types";

import type {
  WorkflowEdge,
} from "./workflow-graph.types";

export function buildDependencies(
  workflows: CoordinatedWorkflow[],
): WorkflowEdge[] {
  const edges: WorkflowEdge[] = [];

  const recovery =
    workflows.find(
      workflow =>
        workflow.workflowType === "recovery",
    );

  const conversion =
    workflows.find(
      workflow =>
        workflow.workflowType === "conversion",
    );

  if (
    recovery &&
    conversion
  ) {
    edges.push({
      from: recovery.id,
      to: conversion.id,
    });
  }

  return edges;
}
