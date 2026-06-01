# CURRENT.STATE.MD — PHASE 4B RECOVERY HARDENING UPDATE

## Date: 2026-06-01

## Branch: architecture/core-system

---

# CURRENT STATUS

Completed:

✓ Phase 1 — Product Foundation
✓ Phase 2 — Deterministic Runtime Foundation
✓ Phase 3 — Infrastructure Isolation
✓ Phase 4A — Runtime Coordination Foundation
✓ Phase 4B — Deterministic Worker Runtime Foundation
✓ Phase 4B — Recovery Ownership Hardening

Current active phase:

→ Phase 4B Final Verification — Runtime Failure Simulation

---

# MAJOR ARCHITECTURAL WORK COMPLETED

## 1. Runtime SQL Ownership Removed

`ProjectionRuntime` no longer imports or owns SQL.

Previous violation:

```txt
packages/runtime/src/projection-runtime.ts
→ imported sql
→ queried behavior_events directly
```

Corrected architecture:

```txt
ProjectionRuntime
  -> behaviorEventRepository
    -> SQL
```

Runtime now consumes repository contracts only.

Verified:

```bash
grep -R "sql<" packages/runtime/src -n
```

Result:

```txt
No runtime SQL ownership remains.
```

---

## 2. Behavior Event Repository Expanded

`behavior-event.repository.ts` now owns deterministic behavior event reads and writes.

Repository owns:

* behavior_events insert semantics
* behavior_events read semantics
* deterministic replay event loading
* sequence_id ordering
* schema-to-contract mapping

Critical guarantee:

```txt
Replay event ordering is repository-owned and sequence_id ASC.
```

---

## 3. Replay Runtime Resume Support Added

`ReplayExecutionRuntime.start()` now accepts a durable replay checkpoint.

New capability:

```ts
runtime.start({
  namespace,
  checkpoint,
});
```

This allows replay recovery to resume from a durable checkpoint instead of always starting from zero.

---

## 4. Lease Fencing Hook Added

`ReplayExecutionRuntime.start()` now supports an optional lease verification hook:

```ts
verifyLeaseOwnership?: () => Promise<boolean>;
```

Before each replay batch, runtime can verify lease ownership.

If ownership is lost:

```txt
lease mismatch
→ runtime interrupt
→ DRAINING
→ INTERRUPTED
```

This prevents zombie workers from continuing replay after lease loss.

---

## 5. Recovery Planning Introduced

Created:

```txt
packages/runtime/src/recovery/replay-recovery.types.ts
packages/runtime/src/recovery/replay-recovery.ts
```

`ReplayRecovery` now owns deterministic recovery planning.

It produces:

```txt
ReplayRecoveryPlan
```

Recovery plan supports:

* no checkpoint
* checkpoint found
* lease not owned

Recovery does not execute replay. It only produces a plan.

---

## 6. Restart Coordination Introduced

Implemented:

```txt
packages/runtime/src/recovery/replay-restart-coordinator.ts
```

`ReplayRestartCoordinator` now owns restart authority.

It:

* consumes `ReplayRecoveryPlan`
* refuses unsafe restart
* starts `ReplayExecutionRuntime` from the recovered checkpoint

This separates:

```txt
Recovery planning
```

from:

```txt
Runtime restart execution
```

---

# CURRENT VERIFIED TEST COVERAGE

Created:

```txt
packages/runtime/src/recovery/__tests__/replay-recovery.test.ts
packages/runtime/src/recovery/__tests__/replay-restart-coordinator.test.ts
packages/runtime/src/workers/runtime/__tests__/replay-runtime-state.test.ts
```

Verified:

```bash
pnpm --filter @phantombot/runtime test
```

Result:

```txt
Test Files  3 passed
Tests       5 passed
```

Coverage now proves:

* recovery resumes from checkpoint
* recovery blocks without lease ownership
* restart coordinator rejects unsafe restart
* runtime state allows valid transitions
* runtime state rejects invalid transitions

---

# CURRENT TYPECHECK STATUS

Verified:

```bash
pnpm turbo run typecheck --force
```

Result:

```txt
Tasks: 5 successful, 5 total
Cached: 0 cached, 5 total
```

Full uncached typecheck passes.

---

# CURRENT ARCHITECTURE STATUS

```txt
Runtime isolation            PASS
Repository ownership         PASS
Replay execution lifecycle   PASS
Replay progression ownership PASS
Checkpoint resume support    PASS
Lease fencing hook           PASS
Recovery planning            PASS
Restart coordination         PASS
State transition tests       PASS
Recovery tests               PASS
Typecheck                    PASS
```

---

# REMAINING PHASE 4B WORK

Phase 4B is architecturally complete but still requires failure verification before formal exit.

Remaining:

## 1. Runtime Failure Simulation

Build tests for:

* crash before checkpoint commit
* crash after checkpoint commit
* lease loss before batch
* lease loss during replay
* worker restart from checkpoint
* dual worker startup protection

## 2. Recovery State Modeling

Consider adding:

```txt
RECOVERING
```

to replay runtime states so fresh startup and recovery startup are operationally distinguishable.

Current states:

```txt
IDLE
RUNNING
DRAINING
INTERRUPTED
STOPPED
```

Potential future states:

```txt
IDLE
RECOVERING
RUNNING
DRAINING
INTERRUPTED
STOPPED
```

## 3. Lease Ownership Proof

Current lease fencing hook exists, but needs deeper tests proving zombie worker prevention.

---

# PHASE 4B EXIT CRITERIA

Phase 4B can be formally closed when:

```txt
✓ Runtime has no SQL ownership
✓ Runtime has no PoolClient usage
✓ Runtime has no pg imports
✓ Replay resumes from checkpoint
✓ Recovery plan generation is deterministic
✓ Restart coordinator refuses unsafe restart
✓ Runtime interrupts on lease loss
✓ State transition tests pass
✓ Recovery tests pass
✓ Failure simulation tests pass
✓ Full uncached typecheck passes
```

Current status:

```txt
Phase 4B architecture: COMPLETE
Phase 4B verification: IN PROGRESS
```

Estimated completion:

```txt
98%
```

---

# NEXT ENGINEERING MOVE

Do not start Behavioral Intelligence yet.

Next checkpoint:

```txt
Phase 4B Final Verification — Failure Simulation
```

Build deterministic tests for:

```txt
lease loss
worker restart
checkpoint recovery
invalid state transitions
zombie replay prevention
```

Only after that should Phase 5 begin.
