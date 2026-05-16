# PhantomBotAI — System Overview

# Core Identity

PhantomBotAI is an AI-native behavioral commerce and revenue recovery platform for Shopify.

PhantomBotAI is NOT:

* a chatbot
* a support widget
* an analytics dashboard
* a generic automation platform

PhantomBotAI is:

* a behavioral commerce operating system
* an adaptive recovery orchestration engine
* an event-driven revenue recovery platform

---

# Core Product Thesis

The system detects:

* shopper hesitation
* trust degradation
* abandoned purchase intent
* behavioral drop-off patterns
* conversion friction

Then:

* generates recovery opportunities
* orchestrates interventions
* adapts recovery workflows
* optimizes recovered revenue

Core flow:

```txt
Shopper Behavior
→ Behavioral Intelligence
→ Recovery Opportunity
→ Workflow Orchestration
→ Adaptive Intervention
→ Recovered Revenue
```

---

# Strategic Direction

Architecture-first system.

NOT UI-first.

Primary priorities:

* event infrastructure
* behavioral intelligence
* orchestration systems
* adaptive recovery logic
* revenue attribution
* scalable workflow execution

Avoid:

* dashboard-heavy development
* settings-first architecture
* generic Shopify app UX
* AI chat gimmicks
* disconnected automation tooling

---

# Current Tech Stack

## Frontend

* React
* TypeScript
* Vite

## Planned Infrastructure

* PostgreSQL
* Redis
* Kafka or Redpanda
* ClickHouse
* Worker-based orchestration runtime

---

# Current Project Structure

```txt
src/features/

commerce/
events/
intelligence/
recovery/
workflows/
shared/
```

---

# Current System Architecture

## Event Infrastructure

Files:

* events/domain/event.types.ts
* events/services/event-bus.ts

Purpose:

* centralized event orchestration
* behavioral signal propagation
* workflow triggering foundation

Capabilities:

* event publishing
* event subscriptions
* canonical event schema
* orchestration entrypoint

Current event categories:

### Commerce Events

* shopper.page_viewed
* shopper.product_viewed
* shopper.cart_updated
* shopper.checkout_started
* shopper.checkout_abandoned

### Behavioral Events

* behavior.hesitation_detected
* behavior.intent_increased
* behavior.trust_degraded

### Recovery Events

* recovery.opportunity_created
* recovery.workflow_triggered
* recovery.intervention_rendered
* recovery.revenue_recovered

---

# Commerce Session Engine

Files:

* commerce/domain/session.types.ts
* commerce/services/session-store.ts

Purpose:

* centralized behavioral memory
* session reconstruction
* shopper state accumulation

Capabilities:

* cart tracking
* product tracking
* engagement tracking
* attribution storage
* session timeline history
* intent accumulation

Session tracks:

* anonymous shopper identity
* customer identity
* attribution source
* cart value
* checkout progress
* behavioral scores
* engagement depth
* timeline reconstruction

---

# Behavioral Intelligence Layer

Files:

* intelligence/domain/behavior-signal.types.ts
* intelligence/services/hesitation-detector.ts

Purpose:

* transform shopper behavior into intelligence

Capabilities:

* hesitation detection
* behavioral signal generation
* confidence scoring
* purchase intent scoring

Current signal types:

* hesitation
* trust_breakdown
* purchase_intent
* comparison_behavior

Current intelligence logic:

* high engagement
* cart creation
* checkout progression
* stalled purchase flow

---

# Recovery Opportunity Engine

Files:

* recovery/domain/recovery-opportunity.types.ts
* recovery/services/recovery-opportunity-engine.ts

Purpose:

* convert intelligence into merchant recovery actions

Capabilities:

* opportunity generation
* opportunity deduplication
* priority assignment
* revenue-at-risk calculation

Current output:
merchant-facing recovery feed.

---

# Merchant Recovery Feed

Files:

* recovery/components/RecoveryOpportunityFeed.tsx

Purpose:

* operational recovery cockpit
* merchant observability layer

Displays:

* revenue at risk
* recovery status
* priority level
* behavioral reasoning

Important:
This is NOT the product moat.

The moat is:
behavioral intelligence infrastructure.

---

# Demo Behavioral Pipeline

Files:

* shared/demo-pipeline.ts

Purpose:

* orchestration simulation
* behavioral flow testing
* event replay simulation

Current pipeline:

```txt
Shopify Event
→ Event Bus
→ Session Context
→ Hesitation Detection
→ Recovery Opportunity
→ Merchant Feed
```

Capabilities:

* pipeline bootstrap
* simulated shopper events
* orchestration verification

---

# Current Working System

Current UI:

* dark-mode merchant feed
* live behavioral simulation
* recovery opportunity rendering

Current behavior:

* simulated shopper activity
* hesitation detection
* revenue opportunity generation
* merchant recovery feed rendering

System currently functioning end-to-end.

---

# Architecture Principles

## Event-Driven Architecture

All intelligence originates from events.

Everything downstream depends on:

* event consistency
* orchestration integrity
* deterministic processing

---

## Domain Ownership

Each domain owns:

* its state
* its orchestration
* its lifecycle
* its logic

Avoid:

* shared mutable chaos
* random utility abstractions
* cross-domain coupling

---

## Centralized Behavioral State

The commerce session model acts as:

* behavioral memory
* orchestration context
* AI context substrate
* recovery intelligence foundation

---

## Adaptive Recovery Systems

Future system direction:

* adaptive intervention selection
* behavioral optimization
* AI-assisted orchestration
* reinforcement learning loops

---

## Workflow Isolation

Workflows must remain:

* composable
* isolated
* replayable
* deterministic

---

# Current Lessons Learned

## React Strict Mode Duplication

Observed:
duplicate recovery opportunities.

Cause:
useEffect double execution.

Impact:
duplicate event simulation.

Resolution:
removed React.StrictMode.

Lesson:
all event systems must be idempotent.

---

## Event Replay Issues

Observed:
duplicate subscribers via HMR.

Cause:
singleton in-memory orchestration.

Lesson:
event systems require replay safety and reset boundaries.

---

# Current Technical Debt

Not yet implemented:

## Persistence

* PostgreSQL storage
* Redis session cache
* durable event storage

## Recovery Infrastructure

* recovery state machine
* intervention lifecycle
* orchestration runtime

## Intelligence Infrastructure

* recovery scoring engine
* intervention selector
* adaptive optimization
* AI feedback loops

## Reliability Infrastructure

* deterministic replay
* event reset controls
* workflow retries
* replay-safe orchestration

## Analytics Infrastructure

* revenue attribution
* intervention performance scoring
* conversion lift tracking

---

# Immediate Build Priorities

1. recovery state machine
2. intervention domain
3. workflow runtime
4. recovery scoring engine
5. intervention selector
6. revenue attribution
7. deterministic replay system

---

# Long-Term Platform Architecture

Target architecture:

```txt
Event Stream
→ Session Intelligence
→ Behavioral Models
→ Opportunity Engine
→ Workflow Runtime
→ Adaptive Intervention Layer
→ Revenue Attribution
→ Optimization Feedback Loop
```

---

# Future Competitive Moat

The moat is NOT:

* UI
* dashboards
* AI chat
* automation templates

The moat IS:

* behavioral commerce intelligence
* recovery orchestration infrastructure
* adaptive intervention optimization
* proprietary recovery intelligence graph

Future proprietary loop:

```txt
Behavior Pattern
→ Intervention
→ Recovery Outcome
→ Revenue Result
→ Optimization Feedback
```

This becomes:

* AI training infrastructure
* merchant retention engine
* conversion optimization moat

---

# Strategic Warning

DO NOT become:
"Klaviyo + AI"

That market is commoditized.

Build:
behavioral recovery infrastructure.

That is the category opportunity.

---

# Current Milestone Status

Completed milestone:

```txt
Shopify Event
→ Session Context
→ Hesitation Detection
→ Recovery Opportunity
→ Merchant Feed
```

System operational end-to-end.

Architecture foundation established.
