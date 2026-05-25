# Phase 3C — Deterministic Ingestion Foundation Complete

## Date
2026-05-25

---

# Summary

Phase 3C completed the transition from:
- pseudo-monorepo architecture
- app-owned infrastructure
- non-deterministic ingestion persistence
- weak replay guarantees

into:
- deterministic replay-safe event persistence
- canonical ingestion contracts
- compiler-enforced package boundaries
- true infrastructure ownership layering

This is the first version of the platform with genuinely scalable infrastructure semantics.

---

# Major Architectural Milestones

## 1. Deterministic Event Sequencing

Introduced canonical replay-safe ordering:

```sql
sequence_id BIGSERIAL PRIMARY KEY
```

inside:

```txt
infrastructure/postgres/init.sql
```

This sequence now acts as the:
- global replay cursor
- deterministic projection ordering source
- canonical runtime progression primitive

Replay ordering no longer depends on:
- UUIDs
- timestamps
- ingestion timing
- undefined SQL ordering

This is now deterministic infrastructure.

---

# 2. Canonical Ingestion Contracts

Created:

```txt
packages/contracts/src/runtime/ingestion-event.types.ts
```

Introduced:
- `IngestionEventInput`
- `PersistedBehaviorEvent`

This standardized:
- event ingestion structure
- persistence payload contracts
- replay-safe metadata ownership
- canonical naming conventions

Critical correction:
- `event_name` was removed
- `eventType` became canonical

This eliminated ingestion schema drift.

---

# 3. Canonical Repository Ownership

Created:

```txt
packages/database/src/repositories/behavior-event.repository.ts
```

Responsibilities:
- deterministic event persistence
- schema translation
- sequence ownership handoff
- replay-safe insert semantics

Infrastructure ownership moved into packages.

Apps no longer write directly to:
- PostgreSQL
- SQL primitives
- persistence infrastructure

---

# 4. App Infrastructure Leakage Removed

Deleted:

```txt
apps/ingestion-api/src/lib/postgres.ts
apps/ingestion-api/src/lib/redis.ts
```

Correct ownership model is now:

```txt
apps
  compose

packages
  own infrastructure
```

This corrected:
- hidden coupling
- infrastructure duplication
- transport leakage
- persistence ownership violations

---

# 5. ingestion-api Refactor Complete

`ingestion-api` is now:
- HTTP composition only
- request validation only
- infrastructure orchestration only

The app no longer owns:
- Redis clients
- Postgres clients
- SQL semantics
- persistence boundaries

This matches the intended deterministic architecture model.

---

# 6. Real Monorepo Compiler Architecture

Implemented:
- TypeScript project references
- compiler-enforced package dependency graph
- workspace package ownership

Created:
- root `tsconfig.json`
- package `references`
- proper composite build structure

Compiler is now enforcing:
- package layering
- dependency boundaries
- workspace correctness

This transitions the project from:
- path alias simulation
into:
- real monorepo infrastructure architecture

---

# 7. Deterministic Replay Integrity Improved

Corrected architectural contradiction:

Before:
- runtime expected deterministic ordering
- schema did NOT guarantee deterministic ordering

Now:
- replay runtime ordering is aligned with database guarantees

This substantially improves:
- replay correctness
- projection consistency
- future distributed orchestration reliability

---

# Current System State

Current architecture status:

```txt
FOUNDATIONALLY STABLE
```

System now has:
- deterministic replay ordering
- canonical ingestion contracts
- compiler-enforced package ownership
- replay-safe persistence semantics
- repository infrastructure boundaries
- true monorepo layering
- deterministic event progression

This is the first version of the platform capable of safely scaling distributed replay infrastructure.

---

# Remaining Architectural Violations

## Runtime Infrastructure Leakage

Still unresolved:

```txt
packages/runtime
  imports PoolClient directly
```

Current runtime remains partially infrastructure-aware.

This violates:
- database ownership boundaries
- deterministic layering rules

---

# Next Phase

# Phase 3D — Runtime Infrastructure Isolation

## Objectives

### Remove PostgreSQL Driver Awareness From Runtime

Runtime should consume:
- transaction abstractions
- deterministic execution boundaries
- repository interfaces

Runtime must NOT consume:
- `pg`
- `PoolClient`
- raw infrastructure drivers

---

## Planned Deliverables

### 1. Canonical Transaction Boundary Abstractions

Move transaction ownership into:
- `@phantombot/database`

Runtime should consume deterministic transaction interfaces only.

---

### 2. Projection Runtime Decoupling

Refactor:
- `projection-runtime.ts`
- idempotency services
- replay services

to eliminate:
- direct SQL client awareness
- infrastructure driver coupling

---

### 3. Repository-Oriented Runtime Execution

Introduce:
- replay repositories
- checkpoint repositories
- deterministic persistence interfaces

---

### 4. Runtime Infrastructure Isolation

Target architecture:

```txt
contracts
    ↓
database
    ↓
runtime
    ↓
workers/apps
```

NOT:

```txt
runtime
  ↔ postgres
```

---

# Current Risk Assessment

## Low Risk Areas
- ingestion persistence
- deterministic ordering
- package ownership
- compiler graph integrity
- repository boundaries

## Medium Risk Areas
- runtime infrastructure coupling
- transaction ownership leakage
- replay execution abstraction depth

## High Priority Next Work
- runtime/database boundary isolation
- deterministic transaction orchestration
- repository-driven replay execution

---

# Important Architecture Milestone

Phase 3C marks the transition from:
- startup-grade code organization

to:

- platform-grade infrastructure architecture

The system now has:
- enforceable ownership
- deterministic replay guarantees
- scalable monorepo layering
- canonical ingestion semantics

This is one of the most important architectural transitions completed so far.