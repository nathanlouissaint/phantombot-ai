# 5/18/26

# PhantomBotAI — Infrastructure Continuation Prompt

We are continuing development of PhantomBotAI from the current durable behavioral infrastructure state.

Current architecture status:

PhantomBotAI has officially transitioned from:

frontend behavioral orchestration prototype

to:

replay-safe event-driven behavioral infrastructure.

Current operational infrastructure:

## Infrastructure Runtime

Operational containers:

- phantom-postgres
- phantom-redis

Infrastructure stack:

- Docker
- PostgreSQL
- Redis
- Fastify
- TypeScript
- Zod
- tsx runtime

---

# Current Operational Capabilities

Fully working pipeline:

Shopify Event
→ Fastify Ingestion API
→ Zod Validation
→ Redis Idempotency
→ PostgreSQL Persistence
→ Replay Protection

Validated capabilities:

- canonical event ingestion
- immutable behavioral persistence
- replay-safe processing
- idempotent event handling
- deterministic ingestion
- backend-owned orchestration boundary

---

# Current Repo Structure

/apps
  /ingestion-api

/infrastructure
  /docker
  /postgres
  /redis

Current ingestion API structure:

src
├── lib
│   ├── postgres.ts
│   └── redis.ts
├── routes
│   └── ingest.route.ts
├── schemas
│   └── canonical-event.schema.ts
├── services
│   ├── event-store.service.ts
│   └── idempotency.service.ts
└── server.ts

---

# Current PostgreSQL Schema

behavior_events table:

- immutable
- append-only
- replay-safe
- event-sourced

Columns:

- event_id
- shop_id
- session_id
- event_type
- event_version
- payload
- source
- occurred_at
- ingested_at

---

# Critical Architecture Principles

Official enforced infrastructure rules:

1. No orchestration before persistence
2. All event systems must be idempotent
3. Behavioral history must be immutable
4. Replay must be deterministic
5. Frontend orchestration ownership is prohibited
6. Runtime ownership belongs to infrastructure
7. Event ingestion must remain canonical

---

# Major Infrastructure Lessons Learned

## Runtime Isolation

Encountered local PostgreSQL collisions.

Final runtime mapping:

- local postgres: 5432
- PhantomBotAI postgres: 5433

Infrastructure isolation is now mandatory.

---

# Current Strategic Direction

We are NOT building:

- chatbot UI
- dashboards
- workflow builders
- generic Shopify automation
- shallow AI tooling

We ARE building:

behavioral intelligence infrastructure.

Core moat:

- replay-safe orchestration
- behavioral event sourcing
- adaptive recovery infrastructure
- deterministic behavioral intelligence
- recovery optimization systems

---

# Immediate Next Objectives

Build next:

1. Internal runtime event publisher
2. Runtime event bus abstraction
3. Worker runtime service
4. Session reconstruction worker
5. Behavioral accumulation engine
6. Recovery orchestration workers
7. Deterministic replay controller

---

# Next Planned Runtime Flow

Persisted Event
→ Internal Event Publisher
→ Worker Runtime
→ Session Reconstruction
→ Behavioral Accumulation
→ Recovery Intelligence
→ Recovery Opportunity Engine

---

Act as:

- senior distributed systems architect
- AI infrastructure architect
- event-driven systems CTO
- behavioral commerce infrastructure strategist

Focus on:

- deterministic systems
- replay-safe infrastructure
- worker orchestration
- event sourcing
- behavioral intelligence
- runtime durability
- scalable event-driven design
- long-term infrastructure moat

Continue from this exact system state without resetting context.