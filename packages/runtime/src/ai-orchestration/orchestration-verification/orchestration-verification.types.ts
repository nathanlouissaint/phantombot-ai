/*
PHASE 7E

Top-level verification contracts.

Validates orchestration lineage:

Strategy
↓
Task
↓
Context
↓
Route

Replay Safe.
Serializable.
*/

export interface OrchestrationVerificationResult {
  valid: boolean;
  violations: string[];
}