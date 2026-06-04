# PHANTOMBOT AI — MASTER ROADMAP

## Infrastructure-First AI Commerce Platform

### Version 2.2

### Updated: June 2026

---

# VISION

PhantomBot AI is being built as:

```txt
The deterministic AI operating system for commerce.
```

Not:

```txt
Chatbot
Shopify Widget
GPT Wrapper
Support Bot
Workflow Builder
```

PhantomBot AI is infrastructure.

The platform exists to provide:

```txt
Deterministic Behavioral Intelligence
Distributed Runtime Coordination
Replay-Safe AI Execution
Commerce Opportunity Detection
Operational Commerce Automation
```

---

# PLATFORM THESIS

Most AI commerce systems are built around:

```txt
Prompt
→ Model
→ Response
```

PhantomBot AI is built around:

```txt
Commerce Events
        ↓
Deterministic Replay
        ↓
Behavioral Intelligence
        ↓
Opportunity Detection
        ↓
Decision Engine
        ↓
Workflow Execution
        ↓
Merchant Outcomes
```

---

# CORE ENGINEERING PRINCIPLES

## Determinism First

Replay correctness over convenience.

Forbidden inside:

```txt
projections
intelligence
scoring
opportunity detection
decision engines
```

Forbidden APIs:

```txt
Date.now()
new Date()
Math.random()
crypto.randomUUID()
```

---

## Replay Safety

Every behavioral state must be reconstructable.

```txt
Events
→ Replay
→ Same State
→ Same Opportunities
→ Same Decisions
```

---

## Infrastructure Ownership

Runtime never owns:

```txt
SQL
Database Connections
Pool Clients
Persistence Semantics
```

Repositories own persistence.

---

## Atomic Progression

Checkpoint progression must remain atomic.

---

## Namespace Isolation

Replay execution must remain isolated.

---

## Operational Reliability

AI systems must behave like infrastructure.

Not demos.

---

# CURRENT VERIFIED STATUS

Completed:

```txt
✓ Phase 1 — Product Foundation

✓ Phase 2 — Deterministic Runtime Foundation

✓ Phase 3 — Infrastructure Isolation

✓ Phase 4A — Runtime Coordination Foundation

✓ Phase 4B — Deterministic Worker Runtime

✓ Phase 5A — Behavioral Intelligence Foundation

✓ Phase 6A — Decision Engine Foundation

→ Phase 6B — Workflow Runtime
```

---

# CURRENT VERIFIED TEST STATUS

```txt
Typecheck: PASS

Test Files: 18 Passed
Tests: 55 Passed
```

Verified Commands:

```bash
pnpm turbo run typecheck --force

pnpm --filter @phantombot/runtime test
```

---

# CURRENT SYSTEM ARCHITECTURE

```txt
Raw Commerce Events
        ↓
Replay Infrastructure
        ↓
Session Intelligence Projection
        ↓
Deterministic Shopper State
        ↓

Recovery Opportunities
Conversion Opportunities
Upsell Opportunities
Retention Opportunities

        ↓

Opportunity Scoring

        ↓

Opportunity Engine

        ↓

Decision Engine

        ↓

Workflow Runtime (Next)

        ↓

OpenAI / Anthropic

        ↓

Merchant Outcomes
```

---

# PHASE 1 — PRODUCT FOUNDATION

## Status

```txt
COMPLETE
```

## Outcome

Merchant-facing product shell established.

Completed:

```txt
Merchant Dashboard
Command Center
Operational Workspace
Inbox Foundation
Design System Foundation
```

---

# PHASE 2 — DETERMINISTIC RUNTIME FOUNDATION

## Status

```txt
COMPLETE
```

## Outcome

Replay-safe runtime established.

Completed:

```txt
Event Ingestion Contracts
Replay Ordering
Event Sequencing
Replay Verification
Projection Architecture
Deterministic Runtime Foundation
```

---

# PHASE 3 — INFRASTRUCTURE ISOLATION

## Status

```txt
COMPLETE
```

## Outcome

Runtime no longer owns infrastructure.

Completed:

```txt
Repository Ownership
Transaction Isolation
Namespace Isolation
Persistence Abstractions
Migration Consolidation
Infrastructure Boundary Enforcement
```

---

# PHASE 4A — RUNTIME COORDINATION FOUNDATION

## Status

```txt
COMPLETE
```

## Outcome

Replay execution became coordinated.

Completed:

```txt
Runtime Coordination
Replay Lifecycle Management
Checkpoint Coordination
Replay Ownership Foundation
```

---

# PHASE 4B — DETERMINISTIC WORKER RUNTIME

## Status

```txt
COMPLETE
```

## Outcome

Distributed replay execution became durable.

Completed:

```txt
ReplayExecutionRuntime
ReplayRestartCoordinator
Worker Leases
Lease Recovery
Replay Interruption Handling
Checkpoint Resume
Runtime State Enforcement
Zombie Replay Prevention
```

---

# PHASE 5A — BEHAVIORAL INTELLIGENCE FOUNDATION

## Status

```txt
COMPLETE
```

## Goal

Transform replayed commerce behavior into deterministic business intelligence.

---

## Delivered

### Session Intelligence

```txt
Intent Classification
Hesitation Classification
Friction Classification
Replay Reconstruction
Deterministic State Generation
```

Directory:

```txt
packages/runtime/src/projections/session-intelligence
```

---

### Opportunity Layer

Directory:

```txt
packages/runtime/src/opportunities
```

Delivered:

```txt
Opportunity Contract
Opportunity Scoring Layer

Recovery Opportunities
Conversion Opportunities
Upsell Opportunities
Retention Opportunities

Opportunity Aggregation Engine
Replay Determinism Verification
```

---

## Phase 5A Completion Criteria

Completed:

```txt
✓ Recovery Opportunities

✓ Conversion Opportunities

✓ Upsell Opportunities

✓ Retention Opportunities

✓ Deterministic

✓ Replay Safe

✓ Fully Tested
```

---

# PHASE 5B — PREDICTIVE INTELLIGENCE

## Status

```txt
PLANNED
```

## Goal

Move beyond classification into prediction.

---

## Deliverables

### Predictive Systems

```txt
Abandonment Prediction
Conversion Probability
Revenue Forecasting
Behavioral Trend Analysis
```

### Operational Intelligence

```txt
Anomaly Detection
Behavioral Drift Detection
Merchant Health Signals
```

## Outcome

Platform becomes predictive.

---

# PHASE 6A — DECISION ENGINE FOUNDATION

## Status

```txt
COMPLETE
```

## Goal

Transform opportunities into deterministic decisions.

---

## Build

```txt
packages/runtime/src/decision-engine
```

Delivered:

```txt
decision.types.ts

decision-eligibility.ts
decision-priority.ts
decision-conflicts.ts

decision-policy.ts
decision-engine.ts

decision-engine.test.ts
decision-engine.replay.test.ts
```

---

## Delivered Capabilities

### Decision Contracts

```txt
Decision Categories
Decision Actions
Decision Priorities
Deterministic Decision Contracts
```

### Decision Evaluation

```txt
Eligibility Evaluation
Action Selection
Priority Assignment
Conflict Resolution
```

### Replay Guarantees

```txt
Deterministic Ordering
Replay Verification
Replay-Safe Decision Generation
```

Pipeline:

```txt
Opportunity[]
        ↓
Eligibility Evaluation
        ↓
Action Selection
        ↓
Priority Assignment
        ↓
Conflict Resolution
        ↓
Decision[]
```

---

## Rules

Decision Engine may own:

```txt
Decision Evaluation
Decision Policies
Priority Assignment
Action Selection
Conflict Resolution
Decision Contracts
```

Decision Engine may NOT own:

```txt
Workflow Execution
OpenAI
Persistence
Runtime Coordination
```

---

## Phase 6A Completion Criteria

Completed:

```txt
✓ Decision Categories

✓ Decision Actions

✓ Eligibility Evaluation

✓ Deterministic Priority Assignment

✓ Conflict Resolution

✓ Replay Verification

✓ Deterministic Ordering

✓ Replay-Safe Decision Generation

✓ Fully Tested
```

---

# PHASE 6B — WORKFLOW RUNTIME

## Status

```txt
ACTIVE NEXT
```

## Goal

Execute deterministic decisions.

---

## Deliverables

```txt
Workflow Contracts
Execution Plans
Workflow Runtime

Decision → Execution Translation

Recovery Workflows
Conversion Workflows
Upsell Workflows
Retention Workflows
```

Pipeline:

```txt
Decision
        ↓
Execution Plan
        ↓
Workflow Runtime
```

---

## Rules

Workflow Runtime may own:

```txt
Execution Plans
Workflow Contracts
Workflow State
Workflow Evaluation
Workflow Coordination
```

Workflow Runtime may NOT own:

```txt
Opportunity Detection
Behavioral Intelligence
Decision Evaluation
OpenAI Reasoning
Persistence Ownership
```

---

# PHASE 6C — AI ORCHESTRATION

## Status

```txt
PLANNED
```

## Goal

Introduce LLM assistance after deterministic systems exist.

---

## Integrations

```txt
OpenAI
Anthropic
Future Models
```

Used for:

```txt
Content Generation
Reasoning Assistance
Communication
```

Never for:

```txt
Replay Logic
Deterministic State
Opportunity Detection
Decision Determination
```

---

# PHASE 7 — MULTI-TENANT PLATFORM SCALING

## Status

```txt
PLANNED
```

Deliverables:

```txt
Tenant Isolation
Replay Partitioning
Distributed Execution
Telemetry
Observability
Monitoring
Operational Diagnostics
```

---

# PHASE 8 — MERCHANT PRODUCTIZATION

## Status

```txt
PLANNED
```

Deliverables:

```txt
Shopify Integration
OAuth
Merchant Onboarding
Operational Dashboards
AI Command Center
Merchant Workspace
```

---

# PHASE 9 — YC READINESS

## Status

```txt
PLANNED
```

Deliverables:

```txt
Architecture Documentation
Infrastructure Diagrams
Replay Demonstrations
Scalability Benchmarks
Investor Narrative
Technical Whitepaper
Demo Environment
```

---

# INFRASTRUCTURE ROADMAP

Terraform remains intentionally excluded from current implementation phases.

Terraform enters after platform architecture stabilizes.

Future ownership:

```txt
Infrastructure Provisioning
Cloud Resources
Networking
Secrets
Deployment Pipelines
Environment Management
```

Terraform is NOT part of:

```txt
Replay Runtime
Behavioral Intelligence
Opportunity Detection
Decision Systems
```

---

# FINAL TARGET

Build:

```txt
Stripe + Datadog + OpenAI
for commerce operations.
```

Not:

```txt
Chatbot
Support Widget
GPT Wrapper
Shopify Plugin
```

Execution order:

```txt
Infrastructure First

Behavioral Intelligence Second

Decision Systems Third

Workflow Runtime Fourth

AI Orchestration Fifth

Scale Last
```
