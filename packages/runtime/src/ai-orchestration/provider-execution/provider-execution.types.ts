/**
 * provider-execution.types.ts
 *
 * Responsibility:
 * Define deterministic provider execution authorization contracts.
 *
 * Owns:
 * - execution authorization contracts
 * - execution request contracts
 * - execution decision contracts
 * - execution violation contracts
 *
 * Does NOT Own:
 * - provider execution
 * - provider SDK imports
 * - prompt execution
 * - model calls
 * - persistence
 *
 * Critical Rules:
 * - must remain deterministic
 * - must remain replay-safe
 * - must remain provider-agnostic
 */

import type {
  RoutingDecision,
} from "../model-routing";

import type {
  ProviderBoundaryReport,
} from "../provider-boundary";

export interface ProviderExecutionRequest {
  routingDecision: RoutingDecision;

  boundaryReport: ProviderBoundaryReport;
}

export interface ProviderExecutionViolation {
  reason: string;
}

export interface ProviderExecutionValidationResult {
  valid: boolean;

  violations: ProviderExecutionViolation[];
}

export interface ProviderExecutionDecision {
  authorized: boolean;

  violations: ProviderExecutionViolation[];
}