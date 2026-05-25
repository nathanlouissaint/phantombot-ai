# PhantomBotAI — Current System State

Date: 2026-05-25

---

# Project Identity

PhantomBotAI is evolving into:

```txt
AI-native deterministic behavioral orchestration infrastructure
```

The platform is NOT:

- chatbot SaaS
- Shopify AI wrapper
- support automation tool
- trigger-action workflow builder
- agent framework
- generic automation engine

The architecture direction is converging toward:

```txt
behavioral operating system for commerce
```

---

# Core Platform Flow

```txt
shopper interaction
→ behavioral signal collection
→ deterministic event ingestion
→ ordered event transport
→ behavioral accumulation
→ hesitation analysis
→ orchestration coordination
→ intervention execution
→ replay-safe outcome tracking
→ adaptive optimization
```

---

# Current Architecture Principle

Deterministic infrastructure owns truth.

AI systems do NOT own:

- event ordering
- replay semantics
- deterministic scoring
- checkpoint ownership
- orchestration state
- transport sequencing
- runtime mutation correctness

AI systems may later own:

- adaptive persuasion
- conversational rendering
- merchant summaries
- intervention optimization
- personalization systems

---

# Current Completed Phases

---

# Phase 3A — Canonical Runtime Contract Migration

COMPLETED

## Achievements

### Canonical Runtime Contracts Created

Created:

```txt
packages/contracts/src/runtime
```

Files:

```txt
deterministic-time.types.ts
execution-result.types.ts
projection-checkpoint.types.ts
projection-event.types.ts
projection-runtime.types.ts
replay.types.ts
runtime-state.types.ts
worker-lease.types.ts
index.ts
```

These now define canonical deterministic runtime ownership.

---

### Projection Contract Drift Removed

Updated:

```txt
packages/contracts/src/projection.types.ts
```

It no longer owns:

```txt
ProjectionEvent
ProjectionCheckpoint
```

Runtime contracts now own replay/event semantics.

---

### Runtime Contract Export Stabilized

Updated:

```txt
packages/contracts/src/index.ts
```

Exports now include:

- runtime contracts
- projection contracts
- namespace contracts
- commerce contracts

---

### Runtime Migration Completed

Updated:

```txt
packages/runtime/src/projection-runtime.ts
packages/runtime/src/projections/session/session.projection.ts
packages/runtime/src/replay/rebuild-projection.ts
```

---

### Established Critical Rule

```txt
Database schema = snake_case
Runtime contracts = camelCase
Runtime layer translates between them
```

Allowed in SQL:

```txt
sequence_id
shop_id
occurred_at
last_processed_sequence
```

NOT allowed in runtime object access:

```ts
event.sequence_id
event.shop_id
event.occurred_at
checkpoint.last_processed_sequence
```

---

### Replay Typing Stabilized

ProjectionRuntime.loadEvents() now supports:

```ts
ProjectionEvent<TPayload>
```

Replay generic propagation now works correctly.

Verified:

```bash
grep -R "ProjectionEvent<unknown>" packages/runtime/src
```

Result:

```txt
No results
```

This confirms:
- replay contract drift resolved
- canonical runtime typing stabilized
- deterministic event propagation compiler-enforced

---

### Full Runtime Typecheck Passed

Verified:

```bash
pnpm turbo run typecheck
```

Result:

```txt
workspace-wide typecheck passed
```

---

# Phase 3B — Event Transport Abstraction

COMPLETED

## Objective

Move infrastructure transport ownership out of apps.

Correct architecture:

```txt
apps compose infrastructure
packages own infrastructure
```

---

## Event Bus Package Created

Created:

```txt
packages/event-bus
```

Canonical structure:

```txt
packages/event-bus/src
├── event-envelope.types.ts
├── event-publisher.types.ts
├── event-consumer.types.ts
├── event-transport.types.ts
├── redis-event-publisher.ts
├── redis-event-consumer.ts
├── index.ts
```

---

## Transport Contracts Created

Infrastructure ownership now exists for:

- event envelopes
- transport publishing
- transport consumption
- Redis stream abstraction
- transport serialization
- deterministic transport semantics

---

## Critical Architectural Rule Established

Applications must NOT own:

- Redis transport implementation
- transport serialization
- infrastructure publishing
- infrastructure consumption

Applications ONLY compose infrastructure.

---

## Redis Transport Layer Stabilized

Implemented:

```txt
RedisEventPublisher
RedisEventConsumer
```

Current implementation supports:

- deterministic Redis publishing
- deterministic Redis stream consumption
- transport-safe serialization
- typed event envelopes

---

## Workspace Integrity Verified

Verified:

```bash
pnpm turbo run typecheck
```

Result:

```txt
All packages typecheck successfully
```

---

# Current Workspace State

Current stable packages:

```txt
packages/contracts
packages/runtime
packages/database
packages/event-bus
```

These now form the deterministic infrastructure core.

---

# Current Architecture Boundaries

---

## packages/contracts owns

- canonical contracts
- runtime types
- replay semantics
- projection contracts
- namespace contracts

---

## packages/runtime owns

- replay execution
- projection orchestration
- checkpoint progression
- deterministic runtime execution
- idempotency enforcement

---

## packages/database owns

- SQL ownership
- database clients
- persistence primitives
- transactional infrastructure

---

## packages/event-bus owns

- transport ownership
- Redis publishing
- Redis consumption
- transport contracts
- event serialization

---

## apps own ONLY composition

Apps should ONLY own:

- HTTP routes
- request validation
- composition logic
- orchestration entrypoints

Apps should NOT own infrastructure primitives.

---

# Current Architectural Rules

DO NOT BUILD:

- frontend systems
- merchant UX
- AI orchestration
- workflow engines
- LangChain abstractions
- trigger-action systems
- agent frameworks
- automation DSLs

Focus ONLY on:

- deterministic runtime infrastructure
- replay-safe systems
- distributed orchestration primitives
- transport correctness
- checkpoint correctness
- behavioral accumulation infrastructure
- compiler-enforced contracts

---

# Next Phase

# Phase 3C — Ingestion Infrastructure Decoupling

## Goal

Remove infrastructure ownership from:

```txt
apps/ingestion-api
```

Current violations:

```txt
apps/ingestion-api/src/lib/redis.ts
apps/ingestion-api/src/lib/postgres.ts
```

Correct direction:

```txt
apps compose packages
packages own infrastructure
```

---

# Planned Work

Inspect:

```txt
apps/ingestion-api/src/lib/redis.ts
apps/ingestion-api/src/lib/postgres.ts
apps/ingestion-api/src/services/event-store.service.ts
apps/ingestion-api/src/routes/ingest.route.ts
apps/ingestion-api/src/server.ts
```

Then:

- move Redis ownership into packages/event-bus
- move persistence ownership into packages/database
- keep ingestion-api as HTTP composition layer only
- centralize deterministic ingestion boundaries

---

# Current Strategic Position

The platform has now transitioned from:

```txt
prototype application architecture
```

toward:

```txt
distributed deterministic orchestration infrastructure
```

The current priority is NOT features.

The current priority is:

- deterministic infrastructure correctness
- transport abstraction
- replay guarantees
- orchestration stability
- package ownership enforcement
- distributed runtime foundations