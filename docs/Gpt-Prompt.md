# PHANTOMBOT AI — PHASE 4B CONTINUATION PROMPT

We are continuing the  PhantomBot AI infrastructure build.

Current branch:

architecture/core-system

---

# CURRENT STATUS

Completed:

✓ Phase 1 — Product Foundation
✓ Phase 2 — Deterministic Runtime Foundation
✓ Phase 3 — Infrastructure Isolation
✓ Phase 4A — Runtime Coordination Foundation

Current active phase:

→ Phase 4B — Deterministic Worker Runtime

---

# MAJOR ARCHITECTURAL CORRECTIONS COMPLETED

## 1. Runtime Infrastructure Isolation

Runtime no longer owns:

* pg
* PoolClient
* raw SQL mutation
* transaction lifecycle
* infrastructure durability semantics

Verification passes:

```bash
grep -R "import { sql }" packages/runtime/src -n
grep -R "PoolClient" packages/runtime/src -n
grep -R "pg" packages/runtime/src -n
```

All return empty output.

---

## 2. Repository-Owned Persistence Architecture

Repositories now own ALL persistence semantics:

```txt
packages/database/src/repositories/
├── behavior-event.repository.ts
├── behavior-session.repository.ts
├── dead-letter.repository.ts
├── projection-checkpoint.repository.ts
├── projection-idempotency.repository.ts
└── worker-lease.repository.ts
```

Repositories own:

* replay durability
* checkpoint persistence
* idempotency
* namespace reset
* verification query persistence
* worker lease durability

Runtime owns ONLY:

* orchestration
* replay sequencing
* lifecycle coordination
* distributed coordination

---

## 3. Transactional Replay Guarantees

Replay progression is atomic:

BEGIN
projection mutation
idempotency persistence
checkpoint advancement
COMMIT

Guarantees:

* deterministic replay progression
* replay-safe checkpoint advancement
* crash-safe replay recovery
* deterministic replay ordering

---

## 4. Critical Lease Coordination Fix Completed

REMOVED:

```ts
process.exit(1)
```

from:

```txt
packages/runtime/src/leases/lease-heartbeat.ts
```

Lease loss no longer hard-crashes workers.

Previous unsafe flow:

```txt
lease lost
→ process.exit(1)
→ replay ownership instability
```

Current safe flow:

```txt
lease lost
→ lifecycle transition
→ graceful drain
→ coordinated shutdown
```

This fixed:

* replay ownership storms
* unsafe failover
* crash-loop instability
* non-deterministic shutdown behavior

---

# CURRENT WORKER COORDINATION ARCHITECTURE

Current runtime worker systems:

```txt
packages/runtime/src/workers/
├── controllers
│   └── lease-coordinator.ts
├── runtime-worker.ts
├── state
│   └── worker-lifecycle.ts
└── types
    └── worker-state.types.ts
```

Worker lifecycle states:

```txt
IDLE
ACQUIRING
ACTIVE
DRAINING
LOST
SHUTDOWN
```

---

# CURRENT SYSTEM GUARANTEES

System now guarantees:

* deterministic replay ordering
* infrastructure-isolated runtime orchestration
* repository-owned persistence semantics
* replay-safe checkpoint advancement
* lifecycle-controlled lease coordination
* graceful ownership foundations
* replay-safe transaction boundaries
* deterministic worker lifecycle authority

---

# CURRENT REPLAY ARCHITECTURE

Replay systems:

```txt
packages/runtime/src/replay/
├── projection-reset.ts
├── rebuild-projection.ts
├── rebuild-runtime.ts
├── replay-controller.ts
└── run-replay.ts
```

Current replay execution:

* sequential
* deterministic
* transactionally atomic
* namespace-isolated

Replay rebuild currently works correctly.

---

# IMPORTANT CURRENT STATE

Replay controller orchestration is NOT fully implemented yet.

Still missing:

* canonical replay worker execution loop
* replay continuation runtime
* graceful replay interruption
* deterministic shutdown ordering
* lifecycle-aware replay execution
* recovery coordination
* replay drain semantics

DO NOT introduce:

* replay partitioning
* parallel replay
* distributed concurrency
* worker balancing
* replay sharding

until:

* worker lifecycle coordination is stable
* replay interruption is deterministic
* graceful drain semantics exist
* replay continuation is correct

Correctness > throughput.

---

# NEXT PHASE

# Phase 4B — Replay Worker Execution Runtime

Objectives:

## 1. Canonical Runtime Worker Loop

Build:

* deterministic replay execution loop
* lifecycle-aware replay progression
* replay interruption handling
* coordinated drain semantics

---

## 2. Replay Continuation Semantics

Build:

* checkpoint-aware continuation
* replay recovery progression
* deterministic replay resume behavior
* replay-safe interruption recovery

---

## 3. Graceful Shutdown Coordination

Build:

* replay drain ordering
* heartbeat shutdown ordering
* lease release coordination
* lifecycle-safe worker termination

---

## 4. Recovery Coordination

Build:

* replay continuation recovery
* worker failover recovery
* checkpoint repair coordination
* deterministic replay restart semantics

---

# IMPORTANT ENGINEERING RULES

### Determinism First

Replay correctness over throughput.

### Runtime Never Owns Infrastructure

No SQL inside runtime.

### Lifecycle Owns Coordination

Heartbeat cannot self-govern.

### Replay Must Remain Sequential

No concurrency yet.

### Correctness Before Scale

Do not optimize throughput before recovery correctness exists.

---

# BEFORE WRITING NEW CODE

First inspect:

```bash
tree packages/runtime/src/workers -L 4

sed -n '1,320p' packages/runtime/src/workers/runtime-worker.ts

sed -n '1,320p' packages/runtime/src/workers/controllers/lease-coordinator.ts

sed -n '1,320p' packages/runtime/src/leases/lease-heartbeat.ts

tree packages/runtime/src/replay -L 5

sed -n '1,320p' packages/runtime/src/replay/rebuild-projection.ts
```

Need full coordination audit before implementing replay execution runtime.

---

# CURRENT POSITIONING

We are NOT building:

* a chatbot
* a Shopify plugin
* a GPT wrapper

We are building:

```txt
deterministic AI commerce infrastructure
```

Target company profile:

```txt
Stripe + Datadog + OpenAI
for commerce operations
```

This is now distributed systems engineering, not application development.
