/**
 * provider-boundary-validator.ts
 *
 * Responsibility:
 * Validate deterministic layers against provider-boundary policy.
 *
 * Owns:
 * - deterministic target inspection
 * - provider leak detection
 * - violation construction
 *
 * Does NOT Own:
 * - filesystem scanning
 * - AST parsing
 * - provider execution
 * - external model calls
 *
 * Critical Rules:
 * - validation must be pure
 * - validation must be deterministic
 * - validation must be replay-safe
 */

import {
  PROVIDER_BOUNDARY_FORBIDDEN_PATTERNS,
} from "./provider-boundary-policy";

import type {
  ProviderBoundaryInspectionTarget,
  ProviderBoundaryValidationResult,
  ProviderBoundaryViolation,
} from "./provider-boundary.types";

function normalize(value: string): string {
  return value.toLowerCase();
}

function inspectValue(
  target: ProviderBoundaryInspectionTarget,
  value: string
): ProviderBoundaryViolation[] {
  const normalizedValue = normalize(value);

  return PROVIDER_BOUNDARY_FORBIDDEN_PATTERNS.flatMap((pattern) =>
    pattern.values
      .filter((forbiddenValue) =>
        normalizedValue.includes(
          normalize(forbiddenValue)
        )
      )
      .map((matchedValue) => ({
        layer: target.layer,
        modulePath: target.modulePath,
        kind: pattern.kind,
        matchedValue,
        reason: pattern.reason,
      }))
  );
}

export function validateProviderBoundaryTarget(
  target: ProviderBoundaryInspectionTarget
): ProviderBoundaryValidationResult {
  const valuesToInspect = [
    target.modulePath,
    ...target.imports,
    ...target.symbols,
  ];

  const violations = valuesToInspect.flatMap((value) =>
    inspectValue(target, value)
  );

  return {
    valid: violations.length === 0,
    violations,
  };
}

export function validateProviderBoundaryTargets(
  targets: ProviderBoundaryInspectionTarget[]
): ProviderBoundaryValidationResult {
  const violations = targets.flatMap((target) =>
    validateProviderBoundaryTarget(target).violations
  );

  return {
    valid: violations.length === 0,
    violations,
  };
}