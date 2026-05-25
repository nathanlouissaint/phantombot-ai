# PhantomBotAI — Current System State

Date: 2026-05-24

---

# Project Identity

PhantomBotAI is evolving into:

```txt
AI-native deterministic behavioral orchestration infrastructure
```

The platform is NOT:

- a chatbot SaaS
- a Shopify AI wrapper
- a support automation platform
- a trigger-action automation tool

The architecture is converging toward:

```txt
behavioral operating system for commerce
```

---

# Core Platform Flow

```txt
shopper interaction
→ behavioral signal collection
→ deterministic event ingestion
→ session intelligence accumulation
→ hesitation analysis
→ recovery opportunity generation
→ orchestration coordination
→ intervention execution
→ outcome tracking
→ adaptive rendering
```

---

# Current Architecture Principle

Deterministic infrastructure owns truth.

AI systems do NOT own:

- behavioral truth
- event ordering
- replay semantics
- deterministic scoring
- checkpoint ownership
- orchestration state

AI systems will later own:

- persuasion adaptation
- intervention personalization
- merchant summaries
- conversational rendering
- adaptive messaging
- optimization suggestions

---

# Current Phase

```txt
Phase 3A — Canonical Runtime Contract Migration
```

Current focus:

```txt
packages/contracts/src/runtime
packages/runtime/src
```

Goal:

Make `@phantombot/contracts` the single canonical source of runtime truth.

---

# Completed Recently

## 1. Cleaned Architectural Drift

Removed premature/fake package abstractions:

```txt
packages/event-schema
packages/recovery-engine
packages/session-engine
packages/shared-types
packages/workflow-core
```

Removed empty runtime folders:

```txt
packages/runtime/src/checkpoints
packages/runtime/src/transactions
packages/runtime/src/batching
packages/runtime/src/shutdown
```

Removed duplicate replay root file:

```txt
packages/runtime/src/rebuild-runtime.ts
```

Replay ownership is now consolidated under:

```txt
packages/runtime/src/replay
```

---

## 2. Runtime Contract System Created

Created:

```txt
packages/contracts/src/runtime
```

Runtime contract files:

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

These now define canonical deterministic runtime contracts.

---

## 3. Projection Contract Conflict Resolved

Updated:

```txt
packages/contracts/src/projection.types.ts
```

It no longer owns:

```txt
ProjectionEvent
ProjectionCheckpoint
```

Those now belong under:

```txt
packages/contracts/src/runtime
```

`projection.types.ts` now only owns projection-level mutation/reducer contracts.

---

## 4. Contracts Export Stabilized

Updated:

```txt
packages/contracts/src/index.ts
```

It now exports:

```txt
commerce contracts
projection contracts
projection namespace contracts
runtime contracts
```

---

## 5. Runtime Contract Migration Started

Updated:

```txt
packages/runtime/src/projection-runtime.ts
```

Key changes:

- maps SQL snake_case columns into camelCase runtime contracts
- `last_processed_sequence` maps to `lastProcessedSequence`
- `sequence_id` maps to `sequence`
- `event_id` maps to `id`
- `event_type` maps to `type`
- `shop_id` maps to `shopId`
- `occurred_at` maps to `occurredAt`

Rule established:

```txt
Database schema = snake_case
Runtime contracts = camelCase
Runtime layer translates between them
```

---

## 6. Session Projection Migrated

Updated:

```txt
packages/runtime/src/projections/session/session.projection.ts
```

Key changes:

- uses canonical `ProjectionEvent<TPayload>`
- reads session ID from `event.payload.sessionId`
- uses `event.shopId`
- uses `event.occurredAt`
- exports `SessionProjectionPayload`

Current payload contract:

```ts
export interface SessionProjectionPayload {
  readonly sessionId: string;
}
```

---

## 7. Replay Rebuild Migrated

Updated:

```txt
packages/runtime/src/replay/rebuild-projection.ts
```

Key changes:

- uses `projection.apply(event)`
- uses `event.sequence`
- typed replay event loading with `SessionProjectionPayload`
- removed legacy `process()` usage
- removed legacy `event.sequence_id`

---

# Current Known State

Contracts typecheck passed:

```bash
pnpm --filter @phantombot/contracts typecheck
```

Runtime migration was in progress after fixing:

```txt
projection-runtime.ts
session.projection.ts
rebuild-projection.ts
```

Next command to run:

```bash
pnpm turbo run typecheck
```

Expected next result:

Either full pass or one remaining runtime typing issue from the canonical event migration.

---

# Current Runtime Structure

Expected important runtime structure:

```txt
packages/runtime/src
├── batch-loader.ts
├── checkpoint-manager.ts
├── dead-letter
│   └── dead-letter.service.ts
├── graceful-shutdown.ts
├── idempotency
│   └── projection-idempotency.service.ts
├── index.ts
├── leases
│   ├── lease-heartbeat.ts
│   └── worker-lease.service.ts
├── projection-registry.ts
├── projection-runtime.ts
├── projections
│   ├── session
│   │   └── session.projection.ts
│   └── session-intelligence
│       ├── index.ts
│       ├── session-intelligence.helpers.ts
│       ├── session-intelligence.projection.ts
│       ├── session-intelligence.reducer.ts
│       └── session-intelligence.types.ts
├── replay
│   ├── projection-reset.ts
│   ├── rebuild-projection.ts
│   ├── rebuild-runtime.ts
│   ├── replay-controller.ts
│   └── run-replay.ts
├── runtime
│   └── retry-policy.ts
├── transactional-runner.ts
├── verification
│   ├── projection-verifier.ts
│   └── run-verification.ts
└── worker-state.ts
```

---

# Current Architectural Rules

Do NOT build:

- frontend systems
- merchant UX
- AI orchestration
- automation DSLs
- agent frameworks
- generic workflow engines
- LangChain abstractions
- trigger-action systems

Focus ONLY on:

- deterministic runtime correctness
- replay-safe infrastructure
- governed runtime contracts
- orchestration primitives
- behavioral intelligence accumulation
- projection execution infrastructure
- distributed runtime foundations

---

# Current Issues To Fix Next

## 1. Run Typecheck

```bash
pnpm turbo run typecheck
```

If errors remain, fix only canonical runtime contract migration issues.

---

## 2. Search For Legacy Runtime Shapes

```bash
grep -R "sequence_id\|shop_id\|occurred_at\|session_id\|last_processed_sequence" packages/runtime/src
```

Expected:

SQL strings may still contain snake_case.

TypeScript event object access should NOT use snake_case.

Allowed:

```sql
sequence_id
shop_id
occurred_at
last_processed_sequence
```

Not allowed:

```ts
event.sequence_id
event.shop_id
event.occurred_at
checkpoint.last_processed_sequence
```

---

## 3. Verify No Local Projection Contract Drift

```bash
find packages/runtime/src -name "projection.types.ts"
```

Expected:

```txt
No result
```

Runtime must not define projection contracts.

---

## 4. Confirm Runtime Imports Canonical Contracts

```bash
grep -R "@phantombot/contracts" packages/runtime/src
```

Runtime should consume contracts from:

```txt
@phantombot/contracts
```

---

# Next Phase After Typecheck Passes

```txt
Phase 3B — Event Transport Abstraction
```

Goal:

Stop apps from owning infrastructure clients.

Current violation:

```txt
apps/ingestion-api/src/lib/postgres.ts
apps/ingestion-api/src/lib/redis.ts
```

Correct direction:

```txt
apps compose packages
packages own infrastructure primitives
```

Next packages involved:

```txt
packages/event-bus
packages/database
apps/ingestion-api
```

Build next:

```txt
packages/event-bus/src
```

Likely files:

```txt
event-envelope.types.ts
event-publisher.types.ts
event-consumer.types.ts
event-transport.types.ts
redis-event-publisher.ts
redis-event-consumer.ts
index.ts
```

But do NOT overbuild. Create only the transport abstraction needed to remove Redis ownership from ingestion app.

---

# Strategic Reminder

The platform is currently transitioning from:

```txt
runtime stabilization
```

toward:

```txt
deterministic distributed infrastructure
```

Do not chase features.

Do not polish dashboard.

Do not add AI.

Do not add workflow DSLs.

First make deterministic infrastructure compiler-enforced.

---

# GPT Prompt For New Tab

```md
We are continuing work on PhantomBotAI.

Project identity:

PhantomBotAI is NOT:
- a chatbot SaaS
- a Shopify AI wrapper
- a trigger-action automation platform
- a support automation system

PhantomBotAI is evolving into:

AI-native deterministic behavioral orchestration infrastructure.

The platform direction is converging toward:

behavioral operating system for commerce.

Core flow:

shopper interaction
→ behavioral signal collection
→ deterministic event ingestion
→ session intelligence accumulation
→ hesitation analysis
→ recovery opportunity generation
→ orchestration coordination
→ intervention execution
→ outcome tracking
→ adaptive rendering

Current architecture principle:

Deterministic infrastructure owns truth.

AI systems do NOT own:
- behavioral truth
- event ordering
- replay semantics
- deterministic scoring
- checkpoint ownership
- orchestration state

AI systems will later own:
- persuasion adaptation
- intervention personalization
- merchant summaries
- conversational rendering
- adaptive messaging
- optimization suggestions

Current phase:

Phase 3A — Canonical Runtime Contract Migration.

We just created canonical runtime contracts under:

packages/contracts/src/runtime

Files created:
- deterministic-time.types.ts
- execution-result.types.ts
- projection-checkpoint.types.ts
- projection-event.types.ts
- projection-runtime.types.ts
- replay.types.ts
- runtime-state.types.ts
- worker-lease.types.ts
- index.ts

We updated:

packages/contracts/src/projection.types.ts

It no longer owns ProjectionEvent or ProjectionCheckpoint. Those now belong under packages/contracts/src/runtime.

We updated:

packages/contracts/src/index.ts

It now exports commerce, projection, projection namespace, and runtime contracts.

We cleaned architectural drift by removing premature fake packages:
- packages/event-schema
- packages/recovery-engine
- packages/session-engine
- packages/shared-types
- packages/workflow-core

We removed empty runtime folders:
- packages/runtime/src/checkpoints
- packages/runtime/src/transactions
- packages/runtime/src/batching
- packages/runtime/src/shutdown

We removed duplicate replay file:
- packages/runtime/src/rebuild-runtime.ts

Replay ownership is now under:
- packages/runtime/src/replay

We updated:
- packages/runtime/src/projection-runtime.ts
- packages/runtime/src/projections/session/session.projection.ts
- packages/runtime/src/replay/rebuild-projection.ts

Important established rule:

Database schema uses snake_case.
Runtime contracts use camelCase.
Runtime layer translates between them.

Allowed:
SQL strings can use sequence_id, shop_id, occurred_at, last_processed_sequence.

Not allowed:
TypeScript object access like event.sequence_id, event.shop_id, event.occurred_at, checkpoint.last_processed_sequence.

Current next step:

Run:

pnpm turbo run typecheck

If errors appear, fix only canonical runtime contract migration issues.

Then run:

grep -R "sequence_id\|shop_id\|occurred_at\|session_id\|last_processed_sequence" packages/runtime/src

Goal:

No legacy snake_case object access in TypeScript runtime logic.

Current architectural rules:

DO NOT build:
- frontend systems
- merchant UX
- AI orchestration
- automation DSLs
- agent frameworks
- generic workflow engines
- LangChain abstractions
- trigger-action systems

Focus ONLY on:
- deterministic runtime correctness
- replay-safe infrastructure
- governed runtime contracts
- orchestration primitives
- behavioral intelligence accumulation
- projection execution infrastructure
- distributed runtime foundations

After typecheck passes, next phase is:

Phase 3B — Event Transport Abstraction.

Goal:

Stop apps from owning infrastructure clients.

Current violation:
- apps/ingestion-api/src/lib/postgres.ts
- apps/ingestion-api/src/lib/redis.ts

Correct direction:

Apps compose packages.
Packages own infrastructure primitives.

Next likely work:
- inspect ingestion-api files
- inspect packages/event-bus
- create minimal event-bus contracts
- move Redis transport ownership into packages/event-bus
- keep database ownership inside packages/database
- keep ingestion API as HTTP composition layer only

When responding:
- give CLI commands
- give full files
- include responsibility comments at top of every file
- preserve deterministic replay guarantees
- maintain strict package ownership
- avoid architectural drift
- challenge any premature frontend, AI, or product work
```