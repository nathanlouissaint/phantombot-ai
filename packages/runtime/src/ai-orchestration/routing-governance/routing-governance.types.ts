/**
 * Phase 8E
 *
 * Purpose:
 * Define deterministic routing governance contracts.
 *
 * Responsibilities:
 * - Represent governance inputs
 * - Represent governance reports
 * - Preserve routing lineage from resolved capabilities
 *
 * Constraints:
 * - No providers
 * - No model selection
 * - No execution
 * - No networking
 * - Replay safe
 */

import type {
  ResolvedCapabilitySet,
} from "../capability-resolution";

import type {
  RoutingDecision,
} from "../model-routing";

export interface RoutingGovernanceInput {
  resolvedCapabilitySet: ResolvedCapabilitySet;

  routingDecision: RoutingDecision;
}

export interface RoutingGovernanceReport {
  taskId: string;

  approved: boolean;

  violations: string[];
}
