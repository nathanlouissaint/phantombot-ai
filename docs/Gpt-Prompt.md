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

We already completed:

1. Runtime contract system creation under:

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

2. Removed fake architecture packages:
- packages/event-schema
- packages/recovery-engine
- packages/session-engine
- packages/shared-types
- packages/workflow-core

3. Removed empty runtime folders:
- packages/runtime/src/checkpoints
- packages/runtime/src/transactions
- packages/runtime/src/batching
- packages/runtime/src/shutdown

4. Removed duplicate replay file:
- packages/runtime/src/rebuild-runtime.ts

Replay ownership is now consolidated under:
- packages/runtime/src/replay

5. Updated:
- packages/contracts/src/projection.types.ts
- packages/contracts/src/index.ts
- packages/runtime/src/projection-runtime.ts
- packages/runtime/src/projections/session/session.projection.ts
- packages/runtime/src/replay/rebuild-projection.ts

6. Established rule:

Database schema uses snake_case.
Runtime contracts use camelCase.
Runtime layer translates between them.

Allowed:
SQL strings may use:
- sequence_id
- shop_id
- occurred_at
- last_processed_sequence

NOT allowed in runtime TypeScript:
- event.sequence_id
- event.shop_id
- event.occurred_at
- checkpoint.last_processed_sequence

7. Session projection now uses:
- ProjectionEvent<TPayload>
- event.payload.sessionId
- event.shopId
- event.occurredAt

8. Replay rebuild now uses:
- projection.apply(event)
- event.sequence
- typed replay event loading

Current likely next step:

Run:

pnpm turbo run typecheck

If errors appear:
fix ONLY canonical runtime contract migration issues.

Then run:

grep -R "sequence_id\|shop_id\|occurred_at\|session_id\|last_processed_sequence" packages/runtime/src

Goal:
No snake_case runtime object access in TypeScript logic.

Current runtime structure:

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

After runtime typecheck fully passes:

Next phase:
Phase 3B — Event Transport Abstraction.

Goal:
Stop apps from owning infrastructure clients.

Current violations:
- apps/ingestion-api/src/lib/postgres.ts
- apps/ingestion-api/src/lib/redis.ts

Correct architecture:
Apps compose packages.
Packages own infrastructure primitives.

Next likely work:
- inspect ingestion-api
- inspect packages/event-bus
- create minimal event transport contracts
- move Redis ownership into packages/event-bus
- keep Postgres ownership inside packages/database
- keep ingestion-api as HTTP composition layer only

When responding:
- give CLI commands
- give full files
- include detailed responsibility comments at top of every file
- preserve deterministic replay guarantees
- maintain strict package ownership
- avoid architectural drift
- challenge premature frontend or AI work
- optimize for distributed orchestration infrastructure
```