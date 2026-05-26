# PHANTOMBOT AI — PHASE 4 CONTINUATION PROMPT

We are continuing the ONEMOGO / PhantomBot AI infrastructure build.

Current branch:

architecture/core-system

Phase 3D has been fully completed.

---

# PHASE 3D COMPLETED

Major completed work:

## Runtime Infrastructure Isolation

Removed all runtime ownership of:
- pg
- PoolClient
- raw SQL mutation
- transaction lifecycle management

Runtime is now fully infrastructure-agnostic.

Verification:

grep -R "from \"pg\"\|PoolClient\|client.query" packages/runtime/src -n

returns empty output.

---

## Canonical Transaction Architecture

Created:

packages/database/src/transactions/

Introduced:
- TransactionContext
- runInTransaction
- deterministic transaction boundaries

Database package now owns:
- transaction lifecycle
- rollback orchestration
- commit orchestration
- deterministic durability semantics

---

## Repository-Oriented Persistence

Created repositories:

packages/database/src/repositories/
├── behavior-event.repository.ts
├── behavior-session.repository.ts
├── projection-checkpoint.repository.ts
├── projection-idempotency.repository.ts
└── dead-letter.repository.ts

Repositories now own:
- replay durability
- checkpoint persistence
- idempotency persistence
- dead-letter persistence
- projection persistence semantics

---

## Transactional Replay Execution

Replay execution now operates atomically:

BEGIN
  projection mutation
  idempotency write
  checkpoint advancement
COMMIT

Replay is now:
- deterministic
- atomic
- replay-safe
- namespace-isolated

---

## Namespace-Aware Replay Isolation

Projection checkpoints now use:

(projection_name, projection_namespace)

instead of:

(projection_name)

This corrected replay namespace collision risk.

---

## PostgreSQL Migration Consolidation

All runtime infrastructure migrations now live under:

infrastructure/postgres/migrations/

Removed fragmented:
- infrastructure/sql
- split schema ownership

---

# CURRENT ARCHITECTURE

contracts
    ↓
database
    ├── repositories
    ├── transaction boundaries
    ├── replay durability
    └── infrastructure ownership
    ↓
runtime
    ├── deterministic orchestration
    ├── replay sequencing
    ├── transaction coordination
    └── infrastructure-agnostic execution
    ↓
workers/apps

---

# CURRENT SYSTEM GUARANTEES

System now guarantees:
- deterministic replay ordering
- atomic replay progression
- namespace-safe checkpoints
- repository-owned persistence
- infrastructure-isolated runtime orchestration
- replay-safe idempotency
- deterministic transaction boundaries

---

# REMAINING WORK

Replay verification runner still exists:

packages/runtime/src/verification/

But package.json script:
- verify:replay

needs restoration.

---

# NEXT PHASE

# Phase 4 — Distributed Runtime Coordination

Objectives:

## 1. Distributed Worker Coordination
Build:
- replay workers
- deterministic lease ownership
- distributed replay execution
- lease failover handling

## 2. Replay Partitioning
Build:
- projection partitioning
- replay concurrency controls
- namespace-aware replay distribution

## 3. Recovery Orchestration
Build:
- checkpoint repair
- worker recovery flows
- lease expiration recovery
- replay continuation semantics

## 4. Operational Replay Tooling
Expand:
- replay verification
- replay diagnostics
- dead-letter recovery
- replay observability

---

# BEFORE WRITING CODE

First inspect:

sed -n '1,320p' packages/runtime/src/leases/worker-lease.service.ts

sed -n '1,320p' packages/runtime/src/leases/lease-heartbeat.ts

tree packages/runtime/src -L 4

cat packages/runtime/package.json

Need a full distributed coordination audit before introducing worker orchestration.