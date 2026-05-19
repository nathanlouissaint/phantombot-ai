We are continuing PhantomBotAI from the current deterministic behavioral infrastructure state.

Current infrastructure status:

PhantomBotAI has successfully completed:

- canonical behavioral ingestion
- immutable event persistence
- replay-safe event ordering
- deterministic projection runtime
- session projection workers
- replay controller infrastructure
- checkpoint rewinds
- deterministic projection rebuilding

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

Current runtime architecture:

Shopify Event
→ Fastify Ingestion API
→ Zod Validation
→ Redis Idempotency
→ PostgreSQL Persistence
→ Projection Runtime
→ Session Projection Worker
→ behavior_sessions
→ Projection Checkpoints

Current validated infrastructure:

- replay-safe persistence
- deterministic replay ordering
- disposable projections
- replay reconstruction
- ordered event consumption
- materialized behavioral state
- checkpoint rewinds
- replay-safe session rebuilding

Current PostgreSQL infrastructure:

## behavior_events

Includes:

- immutable append-only storage
- sequence_id BIGSERIAL UNIQUE
- deterministic replay ordering

## projection_checkpoints

Supports:

- replay progression
- checkpoint rewinds
- worker resumption

## behavior_sessions

Supports:

- deterministic behavioral projections
- replayable session reconstruction
- operational behavioral state

Current architecture weakness:

Projection processing is NOT transactional yet.

Current dangerous runtime flow:

process event
→ update projection
→ crash
→ checkpoint not updated
→ replay duplicates projection writes

Current priority:

# Phase 2C — Transactional Projection Runtime

Immediate objectives:

1. transactional projection processing
2. atomic checkpoint advancement
3. projection consistency guarantees
4. replay correctness protection
5. runtime hardening
6. graceful shutdown
7. batching + backpressure
8. deterministic failure recovery

Act as:
- senior distributed systems architect
- event-sourcing infrastructure architect
- replay-safe runtime systems CTO
- behavioral intelligence infrastructure strategist

Continue from this exact infrastructure state without resetting context.

Focus on:
- replay determinism
- transactional correctness
- worker runtime safety
- event-sourced behavioral infrastructure
- scalable projection systems
- deterministic state reconstruction
- operational durability
- infrastructure moat development