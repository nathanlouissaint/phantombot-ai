# CURRENT.STATE.MD — PHASE 5A BEHAVIORAL INTELLIGENCE CHECKPOINT

## Date: 2026-06-01

## Branch

architecture/core-system

---

# CURRENT STATUS

Completed:

* Phase 1 — Product Foundation
* Phase 2 — Deterministic Runtime Foundation
* Phase 3 — Infrastructure Isolation
* Phase 4A — Runtime Coordination Foundation
* Phase 4B — Deterministic Worker Runtime Foundation
* Phase 4B — Recovery Ownership Hardening
* Phase 4B — Runtime Failure Verification

Current active phase:

* Phase 5A — Behavioral Intelligence Foundation

---

# PHASE 4B FINAL STATUS

Phase 4B is complete.

Verified:

```txt
ReplayExecutionRuntime lifecycle
Replay interruption behavior
Lease-loss interruption
Zombie replay prevention
Checkpoint resume support
ReplayRecovery deterministic planning
ReplayRestartCoordinator restart control
Runtime state transition enforcement
```

Final Phase 4B verification:

```bash
pnpm turbo run typecheck --force
pnpm --filter @phantombot/runtime test
```

Result:

```txt
PASS
```

---

# PHASE 5A WORK COMPLETED

## 1. Session Intelligence Projection Audited

Existing module:

```txt
packages/runtime/src/projections/session-intelligence
```

Files:

```txt
index.ts
session-intelligence.helpers.ts
session-intelligence.projection.ts
session-intelligence.reducer.ts
session-intelligence.types.ts
```

Purpose:

```txt
Raw commerce events
→ deterministic session intelligence state
```

---

## 2. Removed Wall-Clock Determinism Violation

Previous issue:

```ts
startedAt: new Date().toISOString()
lastActivityAt: new Date().toISOString()
```

This violated replay determinism.

Fixed by changing projection initialization to accept deterministic input:

```ts
createInitialState({
  shopId,
  sessionId,
  startedAt,
})
```

Projection no longer generates timestamps.

---

## 3. Added Session Intelligence Tests

Created:

```txt
packages/runtime/src/projections/session-intelligence/__tests__/session-intelligence.projection.test.ts
packages/runtime/src/projections/session-intelligence/__tests__/session-intelligence.reducer.test.ts
packages/runtime/src/projections/session-intelligence/__tests__/session-intelligence.helpers.test.ts
packages/runtime/src/projections/session-intelligence/__tests__/session-intelligence.replay.test.ts
```

Coverage:

```txt
Projection initialization
Reducer mutation
Purchase intent classification
Hesitation score classification
Friction classification
Replay reconstruction determinism
```

---

## 4. Added Opportunity Detection Layer

Created:

```txt
packages/runtime/src/opportunities
```

Files:

```txt
opportunity.types.ts
opportunity-score.ts
recovery-opportunity.types.ts
recovery-opportunity.detector.ts
```

Tests:

```txt
packages/runtime/src/opportunities/__tests__/opportunity-contract.test.ts
packages/runtime/src/opportunities/__tests__/opportunity-score.test.ts
packages/runtime/src/opportunities/__tests__/recovery-opportunity.detector.test.ts
```

Purpose:

```txt
ShopperSessionState
→ deterministic business opportunities
```

Current supported recovery opportunities:

```txt
ABANDONED_CHECKOUT
HIGH_HESITATION
HIGH_INTENT_ABANDONMENT
```

---

## 5. Added Unified Opportunity Contract

Created canonical opportunity shape:

```ts
export interface Opportunity {
  id: string;
  category: OpportunityCategory;
  type: string;
  confidence: number;
  detectedAt: string;
}
```

Categories:

```txt
recovery
conversion
upsell
retention
```

Recovery opportunities now extend the shared contract.

---

## 6. Added Opportunity Scoring Layer

Created:

```txt
packages/runtime/src/opportunities/opportunity-score.ts
```

Purpose:

```txt
Separate opportunity detection from confidence scoring.
```

Current scoring functions:

```ts
scoreAbandonment()
scoreHesitation()
```

This keeps detection logic clean and prepares the system for future conversion, upsell, retention, and winback opportunities.

---

# CURRENT VERIFIED COMMANDS

```bash
pnpm turbo run typecheck --force
pnpm --filter @phantombot/runtime test
```

Latest verified result:

```txt
Typecheck: PASS

Test Files: 11 passed
Tests: 28 passed
```

---

# CURRENT ARCHITECTURE

```txt
Raw Commerce Events
        ↓
Session Intelligence Projection
        ↓
Deterministic Behavioral State
        ↓
Opportunity Detection
        ↓
Opportunity Scoring
        ↓
Unified Opportunity Contract
        ↓
Future Decision Engine
```

---

# CURRENT INVARIANTS

```txt
No wall-clock timestamps inside projections
No AI inside intelligence calculations
No workflows inside opportunity detection
No persistence inside detectors
No runtime orchestration inside projections
No SQL inside runtime
Replay remains deterministic
Opportunity generation remains replay-safe
Confidence scoring remains deterministic
```

---

# NEXT ENGINEERING MOVE

Continue Phase 5A.

Next target:

```txt
Conversion Opportunity Detection
```

Build:

```txt
conversion-opportunity.types.ts
conversion-opportunity.detector.ts
conversion-opportunity.detector.test.ts
```

Goal:

```txt
ShopperSessionState
→ deterministic conversion opportunities
```

Example signals:

```txt
High purchase intent
High cart value
Checkout started
Not converted
Not abandoned
```

Do not build OpenAI yet.

Do not build agents yet.

Do not build workflow execution yet.

Next architecture checkpoint:

```txt
RecoveryOpportunity
ConversionOpportunity
UpsellOpportunity
RetentionOpportunity
→ all extend Opportunity
→ all deterministic
→ all tested
```
