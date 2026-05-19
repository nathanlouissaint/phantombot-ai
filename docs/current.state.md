# PhantomBotAI — Current Infrastructure State
## Date: 5/19/2026

---

# Strategic Position

PhantomBotAI has officially transitioned from:

frontend behavioral orchestration prototype

to:

deterministic replay-safe behavioral infrastructure.

The company is NO LONGER building:

- chatbot tooling
- generic Shopify automation
- frontend orchestration software
- dashboard-first infrastructure
- shallow AI wrappers

The company IS building:

behavioral intelligence infrastructure.

Core moat direction:

- replay-safe orchestration
- immutable behavioral history
- deterministic replay systems
- behavioral state reconstruction
- recovery intelligence infrastructure
- event-sourced behavioral accumulation
- intervention optimization systems

---

# Current Operational Infrastructure

## Runtime Stack

Operational infrastructure:

- Docker
- PostgreSQL
- Redis
- Fastify
- TypeScript
- Zod
- tsx runtime

Operational containers:

- phantom-postgres
- phantom-redis

Infrastructure isolation:

- local postgres: 5432
- PhantomBotAI postgres: 5433

---

# Current Runtime Environment

## Root .env

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=phantom
POSTGRES_PASSWORD=phantom
POSTGRES_DB=phantombotai
```

Infrastructure runtime configuration is now:

- centralized
- deterministic
- environment-owned

Critical lesson learned:

Distributed infrastructure cannot rely on:
- implicit defaults
- silent fallbacks
- hidden runtime assumptions

---

# Canonical Behavioral Ingestion — COMPLETE

Current operational ingestion flow:

Shopify Event
→ Fastify Ingestion API
→ Zod Validation
→ Redis Idempotency
→ PostgreSQL Persistence
→ Replay Protection

Validated capabilities:

- canonical event ingestion
- immutable event persistence
- replay-safe ingestion
- deterministic event handling
- idempotent processing
- backend-owned orchestration boundaries

---

# Current PostgreSQL Infrastructure

## behavior_events

Immutable append-only behavioral event store.

Current capabilities:

- canonical persistence
- replay-safe storage
- immutable history
- ordered event replay

Critical upgrade completed:

```sql
sequence_id BIGSERIAL UNIQUE
```

This now provides:

- deterministic replay ordering
- projection replay sequencing
- worker progression anchors
- canonical replay order

---

## projection_checkpoints

Projection runtime progression tracking.

Current capabilities:

- replay checkpoints
- projection progression
- replay rewind support
- deterministic worker resumption

Validated:

- checkpoint rewinds
- replay resets
- deterministic progression

---

## behavior_sessions

Materialized behavioral session projections.

Current capabilities:

- deterministic session reconstruction
- replayable behavioral state
- event accumulation
- operational behavioral state materialization

Current projected fields:

- session_id
- shop_id
- started_at
- last_activity_at
- event_count
- cart_state
- engagement_state
- recovery_state
- abandonment_score

---

# Projection Runtime Infrastructure — COMPLETE

## Projection Runtime

Location:

```txt
packages/runtime/src/projection-runtime.ts
```

Current responsibilities:

- checkpoint loading
- ordered event loading
- replay-safe event progression
- deterministic runtime execution

Validated capabilities:

- ordered replay consumption
- deterministic checkpoint advancement
- replay-safe progression

---

# Session Projection Worker — COMPLETE

Location:

```txt
apps/session-projection-worker
```

Current responsibilities:

- session projection materialization
- deterministic event accumulation
- replay-safe behavioral reconstruction

Validated runtime:

```txt
behavior_events
→ ordered replay
→ session projection worker
→ behavior_sessions
→ checkpoint advancement
```

Validated successful replay:

```txt
Processed sequence 1
```

Validated reconstructed session:

```txt
session_abc
event_count = 1
```

---

# Replay Infrastructure — COMPLETE

## Replay Controller

Location:

```txt
apps/replay-controller
```

Current capabilities:

- projection resets
- checkpoint rewinds
- deterministic replay preparation
- disposable projection infrastructure

Validated replay flow:

```txt
Reset projections
→ reset checkpoints
→ rerun worker
→ rebuild projections
→ reconstruct behavioral state
```

This validates:

- replay-safe reconstruction
- immutable source-of-truth architecture
- deterministic projection rebuilding
- disposable projections

---

# Major Infrastructure Lessons Learned

## 1. Infrastructure Isolation

Critical issue encountered:

local PostgreSQL collisions.

Resolution:

- dedicated runtime ports
- isolated infrastructure runtime
- explicit container mapping

Final mapping:

- local postgres: 5432
- PhantomBotAI postgres: 5433

---

## 2. Environment Ownership

Critical issue encountered:

runtime authentication drift caused by implicit defaults.

Resolution:

- centralized .env
- explicit infrastructure configuration
- removal of silent runtime fallbacks

---

## 3. Idempotent Infrastructure

Critical issue encountered:

non-idempotent migrations.

Resolution:

Use:

```sql
IF NOT EXISTS
```

for:
- tables
- indexes
- schema evolution

Infrastructure migrations must remain:
- rerunnable
- recoverable
- replay-safe

---

# Current Critical Architecture Weakness

## NON-TRANSACTIONAL PROJECTION PROCESSING

Current dangerous runtime flow:

```txt
process event
→ write projection
→ crash
→ checkpoint not updated
→ replay reprocesses event
→ projection drift occurs
```

Current risk:

- double counting
- projection corruption
- replay drift
- nondeterministic state accumulation

This is the next major infrastructure priority.

---

# NEXT ACTIVE BUILD PHASE

# Phase 2C — Transactional Projection Runtime

Immediate objectives:

1. transactional projection processing
2. atomic checkpoint advancement
3. replay correctness guarantees
4. projection consistency protection
5. runtime failure recovery
6. graceful worker shutdown
7. projection batching
8. backpressure handling

---

# Planned Runtime Upgrade

Current flow:

```txt
process event
→ update projection
→ update checkpoint
```

Target flow:

```txt
BEGIN TRANSACTION
→ process projection
→ update checkpoint
COMMIT
```

Goal:

projection updates + checkpoint advancement become atomic.

This is required before:
- scaling workers
- behavioral accumulation
- recovery intelligence
- orchestration systems

---

# Future Infrastructure Roadmap

After transactional projections:

## Phase 2D

Build:

- behavioral accumulation engine
- abandonment scoring
- engagement state machines
- recovery opportunity projections
- intervention timing infrastructure

---

## Phase 2E

ONLY AFTER runtime correctness stabilizes:

Build:

- adaptive recovery intelligence
- AI optimization systems
- intervention sequencing
- recovery experimentation
- behavioral optimization loops

---

# Strategic Infrastructure Position

PhantomBotAI is now architected as:

deterministic behavioral runtime infrastructure.

The infrastructure moat is now centered around:

- behavioral replay intelligence
- deterministic reconstruction
- event-sourced behavioral history
- replay-safe orchestration
- proprietary behavioral state accumulation
- recovery intelligence infrastructure

This is now infrastructure-first company architecture.