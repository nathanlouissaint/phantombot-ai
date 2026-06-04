/**
 * workflow-coordinator.replay.test.ts
 *
 * Responsibility:
 * Verify deterministic workflow coordination.
 *
 * Owns:
 * - replay safety assertions
 *
 * Does NOT Own:
 * - workflow execution
 * - orchestration
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  ExecutionPlan,
} from "../../workflow-runtime/workflow.types";

import {
  coordinateWorkflows,
} from "../workflow-coordinator";

describe(
  "workflow coordinator replay safety",
  () => {
    it(
      "returns identical coordination results",
      () => {
        const plans: ExecutionPlan[] = [
          {
            id: "plan:1",
            decisionId: "decision:1",
            workflowType: "recovery",
            priority: "critical",
            steps: [],
          },
        ];

        expect(
          coordinateWorkflows(plans),
        ).toEqual(
          coordinateWorkflows(plans),
        );
      },
    );
  },
);
