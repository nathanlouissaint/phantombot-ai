We are continuing work on PhantomBotAI.

Project identity:

PhantomBotAI is NOT:
- a chatbot SaaS
- a Shopify AI wrapper
- a support automation platform
- a trigger-action workflow tool
- an agent framework
- a generic AI automation system

PhantomBotAI is evolving into:

AI-native deterministic behavioral orchestration infrastructure.

The platform direction is converging toward:

behavioral operating system for commerce.

Core flow:

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

Current architecture principle:

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

We have COMPLETED:

# Phase 3A — Canonical Runtime Contract Migration

Completed:
- canonical runtime contracts
- replay-safe runtime typing
- deterministic projection contracts
- namespace-aware replay infrastructure
- replay generic propagation
- runtime translation boundaries
- checkpoint stabilization

Created:

packages/contracts/src/runtime

Files:
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
- packages/contracts/src/projection.types.ts
- packages/contracts/src/index.ts
- packages/runtime/src/projection-runtime.ts
- packages/runtime/src/projections/session/session.projection.ts
- packages/runtime/src/replay/rebuild-projection.ts

Critical architectural rule established:

Database schema uses snake_case.
Runtime contracts use camelCase.
Runtime layer translates between them.

Allowed ONLY in SQL:
- sequence_id
- shop_id
- occurred_at
- last_processed_sequence

NOT allowed in runtime TypeScript:
- event.sequence_id
- event.shop_id
- event.occurred_at
- checkpoint.last_processed_sequence

ProjectionRuntime.loadEvents<TPayload>() was fixed to support:
- ProjectionEvent<TPayload>
- replay-safe generic propagation
- strongly typed deterministic replay

Verified:
- pnpm turbo run typecheck passes
- grep -R "ProjectionEvent<unknown>" packages/runtime/src returns no results

This confirms:
- replay contract drift resolved
- canonical runtime typing stabilized
- deterministic event propagation compiler-enforced

We also removed architectural drift:
- packages/event-schema
- packages/recovery-engine
- packages/session-engine
- packages/shared-types
- packages/workflow-core

Replay ownership is consolidated under:
- packages/runtime/src/replay

Current stable infrastructure packages:
- packages/contracts
- packages/runtime
- packages/database

--------------------------------------------------

# Phase 3B — Event Transport Abstraction

Completed:
- infrastructure-owned transport layer
- Redis transport abstraction
- transport publishing abstraction
- transport consumption abstraction
- transport envelope contracts
- package-level transport ownership

Created:

packages/event-bus

Canonical structure:

packages/event-bus/src
├── event-envelope.types.ts
├── event-publisher.types.ts
├── event-consumer.types.ts
├── event-transport.types.ts
├── redis-event-publisher.ts
├── redis-event-consumer.ts
├── index.ts

Transport ownership now belongs to:
- packages/event-bus

Applications no longer should own:
- Redis publishing
- transport serialization
- transport consumption
- infrastructure transport clients

Critical architectural rule established:

apps compose infrastructure
packages own infrastructure

Workspace-wide typecheck currently passes:
- pnpm turbo run typecheck

--------------------------------------------------

# Current Stable Architecture Boundaries

packages/contracts owns:
- canonical contracts
- runtime types
- replay semantics
- projection contracts
- namespace contracts

packages/runtime owns:
- replay execution
- projection orchestration
- checkpoint progression
- deterministic runtime execution
- idempotency enforcement

packages/database owns:
- SQL ownership
- database clients
- persistence primitives
- transactional infrastructure

packages/event-bus owns:
- transport ownership
- Redis publishing
- Redis consumption
- transport contracts
- event serialization

Applications should ONLY own:
- HTTP routes
- request validation
- composition logic
- orchestration entrypoints

Applications should NOT own:
- Redis clients
- Postgres clients
- transport infrastructure
- persistence primitives

--------------------------------------------------

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

--------------------------------------------------

# Current Workspace Structure

Important packages:

packages/contracts
packages/runtime
packages/database
packages/event-bus

Important apps:

apps/ingestion-api
apps/replay-controller
apps/session-projection-worker

--------------------------------------------------

# NEXT PHASE

# Phase 3C — Ingestion Infrastructure Decoupling

Goal:

Remove infrastructure ownership from:

apps/ingestion-api

Current violations:
- apps/ingestion-api/src/lib/redis.ts
- apps/ingestion-api/src/lib/postgres.ts

Correct architecture:
apps compose packages
packages own infrastructure

Next required inspections:

sed -n '1,260p' apps/ingestion-api/src/lib/redis.ts

sed -n '1,260p' apps/ingestion-api/src/lib/postgres.ts

sed -n '1,320p' apps/ingestion-api/src/services/event-store.service.ts

sed -n '1,320p' apps/ingestion-api/src/routes/ingest.route.ts

sed -n '1,260p' apps/ingestion-api/src/server.ts

Next implementation goals:
- move Redis ownership into packages/event-bus
- move persistence ownership into packages/database
- keep ingestion-api as HTTP composition layer only
- centralize deterministic ingestion boundaries
- enforce package ownership direction

When responding:
- give CLI commands
- give FULL files
- include detailed responsibility comments at top of every file
- preserve deterministic replay guarantees
- preserve package ownership correctness
- avoid abstraction drift
- challenge premature frontend or AI work
- optimize for distributed deterministic infrastructure
- maintain replay-safe architecture
- maintain compiler-enforced boundaries