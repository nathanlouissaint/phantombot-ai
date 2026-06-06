/**
 * provider-boundary-runtime.ts
 *
 * Responsibility:
 * Provide deterministic provider-boundary enforcement runtime.
 *
 * Owns:
 * - provider-boundary report construction
 * - governance integration
 * - validation aggregation
 * - replay-safe enforcement output
 *
 * Does NOT Own:
 * - provider selection
 * - provider execution
 * - provider SDK imports
 * - prompt execution
 * - model API calls
 *
 * Critical Rules:
 * - runtime must remain deterministic
 * - runtime must remain side-effect free
 * - runtime must not call providers
 * - runtime must not access persistence
 */

import {
  validateProviderBoundaryTargets,
} from "./provider-boundary-validator";

import type {
  ProviderBoundaryRequest,
  ProviderBoundaryReport,
  ProviderBoundaryValidationResult,
} from "./provider-boundary.types";

export function enforceProviderBoundary(
  request: ProviderBoundaryRequest,
): ProviderBoundaryReport {
  const boundaryResult =
    validateProviderBoundaryTargets(
      request.targets,
    );

  const result: ProviderBoundaryValidationResult =
    request.governanceReport.approved
      ? boundaryResult
      : {
          valid: false,
          violations: boundaryResult.violations,
        };

  return {
    checkedTargets: request.targets,

    governanceReport:
      request.governanceReport,

    result,
  };
}
