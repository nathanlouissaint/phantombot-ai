/**
 * Phase 8C
 *
 * Purpose:
 * Transform capability plans into
 * deterministic resolved capability sets.
 *
 * Responsibilities:
 * - Define resolved capability contracts
 * - Remain provider agnostic
 * - Remain replay safe
 *
 * Constraints:
 * - No providers
 * - No models
 * - No execution
 * - No networking
 */

import type {
  CapabilityType,
} from "../capability-planning";

export interface ResolvedCapability {
  capability: CapabilityType;

  priority: number;
}

export interface ResolvedCapabilitySet {
  taskId: string;

  capabilities: ResolvedCapability[];
}