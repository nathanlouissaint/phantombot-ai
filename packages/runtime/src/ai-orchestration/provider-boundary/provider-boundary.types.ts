/**
 * provider-boundary.types.ts
 *
 * Responsibility:
 * Define deterministic provider-boundary enforcement contracts.
 *
 * Owns:
 * - provider boundary inspection targets
 * - provider boundary violation contracts
 * - provider boundary validation results
 * - provider boundary governance integration
 *
 * Does NOT Own:
 * - provider adapter execution
 * - provider SDK imports
 * - prompt execution
 * - external model calls
 * - persistence
 *
 * Critical Rules:
 * - provider-specific values are only allowed at the provider adapter boundary
 * - deterministic layers must stay provider-agnostic
 * - all validation must remain replay-safe
 * - governance lineage must be preserved
 */

import type {
  RoutingGovernanceReport,
} from "../routing-governance";

export type ProviderBoundaryLayer =
  | "replay"
  | "behavioral-intelligence"
  | "opportunity-detection"
  | "opportunity-scoring"
  | "decision-engine"
  | "workflow-runtime"
  | "workflow-coordinator"
  | "workflow-graph"
  | "execution-strategy"
  | "planning-verification"
  | "orchestration-runtime"
  | "execution-context"
  | "capability-planning"
  | "model-routing";

export type ProviderBoundaryViolationKind =
  | "provider-name-leak"
  | "provider-sdk-leak"
  | "provider-api-leak"
  | "prompt-execution-leak"
  | "external-call-leak"
  | "persistence-leak"
  | "nondeterministic-api-leak";

export interface ProviderBoundaryInspectionTarget {
  layer: ProviderBoundaryLayer;

  modulePath: string;

  imports: string[];

  symbols: string[];
}

export interface ProviderBoundaryViolation {
  layer: ProviderBoundaryLayer;

  modulePath: string;

  kind: ProviderBoundaryViolationKind;

  matchedValue: string;

  reason: string;
}

export interface ProviderBoundaryValidationResult {
  valid: boolean;

  violations: ProviderBoundaryViolation[];
}

/**
 * Phase 8F
 *
 * Purpose:
 * Carry routing-governance lineage into
 * provider-boundary enforcement.
 */
export interface ProviderBoundaryRequest {
  targets: ProviderBoundaryInspectionTarget[];

  governanceReport: RoutingGovernanceReport;
}

/**
 * Phase 8F
 *
 * Purpose:
 * Preserve governance lineage through
 * provider-boundary enforcement.
 */
export interface ProviderBoundaryReport {
  checkedTargets: ProviderBoundaryInspectionTarget[];

  governanceReport: RoutingGovernanceReport;

  result: ProviderBoundaryValidationResult;
}