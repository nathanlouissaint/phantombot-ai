/**
 * Phase 6C
 *
 * Planning Integrity Contracts.
 *
 * Defines validation results produced by
 * deterministic planning verification.
 */

export interface PlanningVerificationResult {
  valid: boolean;

  violations: string[];
}