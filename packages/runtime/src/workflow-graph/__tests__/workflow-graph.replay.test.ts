/**
 * workflow-graph.replay.test.ts
 *
 * Responsibility:
 * Verify workflow graph replay safety.
 *
 * Owns:
 * - deterministic graph assertions
 *
 * Does NOT Own:
 * - execution
 * - orchestration
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CoordinatedWorkflow,
} from "../../workflow-coordinator/workflow-coordinator.types";

import {
  buildWorkflowGraph,
} from "../workflow-graph";

describe(
  "workflow graph replay safety",
  () => {
    it(
      "builds identical graphs",
      () => {
        const workflows: CoordinatedWorkflow[] = [
          {
            id: "recovery",
            decisionId: "decision:1",
            workflowType: "recovery",
            priority: "critical",
            steps: [],
            executionOrder: 0,
          },
        ];

        expect(
          buildWorkflowGraph(workflows),
        ).toEqual(
          buildWorkflowGraph(workflows),
        );
      },
    );
  },
);
