/**
 * Phase 8E
 *
 * Purpose:
 * Validate routing decisions against resolved capabilities.
 *
 * Responsibilities:
 * - Verify task identity consistency
 * - Verify routing profile approval
 * - Verify capability-to-routing compatibility
 *
 * Constraints:
 * - No provider selection
 * - No model selection
 * - No prompt execution
 * - No API calls
 * - Deterministic output ordering
 */

import {
  ROUTING_PROFILES,
} from "../model-routing";

import type {
  RoutingGovernanceInput,
} from "./routing-governance.types";

import {
  APPROVED_ROUTING_PROFILES,
} from "./routing-governance-policy";

export function validateRoutingGovernance(
  input: RoutingGovernanceInput,
): string[] {
  const violations: string[] = [];

  const {
    resolvedCapabilitySet,
    routingDecision,
  } = input;

  if (!resolvedCapabilitySet.taskId) {
    violations.push(
      "Missing resolved capability task id",
    );
  }

  if (!routingDecision.taskId) {
    violations.push(
      "Missing routing decision task id",
    );
  }

  if (
    resolvedCapabilitySet.taskId &&
    routingDecision.taskId &&
    resolvedCapabilitySet.taskId !==
      routingDecision.taskId
  ) {
    violations.push(
      "Routing decision task id does not match resolved capability task id",
    );
  }

  if (
    resolvedCapabilitySet.capabilities.length === 0
  ) {
    violations.push(
      "Resolved capability set requires at least one capability",
    );
  }

  if (
    !APPROVED_ROUTING_PROFILES.includes(
      routingDecision.profile,
    )
  ) {
    violations.push(
      `Unapproved routing profile: ${routingDecision.profile}`,
    );
  }

  const primaryCapability =
    resolvedCapabilitySet.capabilities[0];

  if (primaryCapability) {
    const expectedProfile =
      ROUTING_PROFILES[
        primaryCapability.capability
      ];

    if (
      expectedProfile !== routingDecision.profile
    ) {
      violations.push(
        `Routing profile ${routingDecision.profile} does not match resolved capability ${primaryCapability.capability}`,
      );
    }
  }

  return violations;
}
