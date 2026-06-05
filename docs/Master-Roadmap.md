# PHANTOMBOT AI — MASTER ROADMAP v3.0

## Infrastructure-First AI Commerce Platform

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
        ↓
Model
        ↓
Response
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
Workflow Runtime
        ↓
Workflow Coordination
        ↓
Workflow Graph
        ↓
Execution Strategy
        ↓
Planning Verification
        ↓
AI Orchestration
        ↓
Merchant Outcomes
```

---

# CORE ENGINEERING PRINCIPLES

## Determinism First

Replay correctness over convenience.

Forbidden inside:

```txt
Replay
Projections
Behavioral Intelligence
Opportunity Detection
Opportunity Scoring
Decision Engine
Workflow Runtime
Workflow Coordinator
Workflow Graph
Execution Strategy
Planning Verification
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

Required invariant:

```txt
Events
        ↓
Replay
        ↓
Same State
        ↓
Same Opportunities
        ↓
Same Decisions
        ↓
Same Plans
        ↓
Same Strategies
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

✓ Phase 4 — Distributed Runtime

✓ Phase 5A — Behavioral Intelligence

✓ Phase 6A — Decision Engine

✓ Phase 6B — Workflow Runtime
```

Current Repository State:

```txt
99 Runtime Files

33 Runtime Directories

Decision Engine

Workflow Runtime

Workflow Coordinator

Workflow Graph

Execution Strategy

Strategy Verification
```

---

# PHASE 1 — PRODUCT FOUNDATION

## Status

```txt
COMPLETE
```

### Delivered

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

### Delivered

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

### Delivered

```txt
Repository Ownership

Transaction Isolation

Namespace Isolation

Persistence Abstractions

Infrastructure Boundary Enforcement
```

---

# PHASE 4 — DISTRIBUTED RUNTIME

## Status

```txt
COMPLETE
```

### Delivered

```txt
ReplayExecutionRuntime

ReplayRestartCoordinator

Worker Leases

Lease Recovery

Replay Interruption Handling

Checkpoint Resume

Runtime State Enforcement

Zombie Replay Prevention

Distributed Coordination
```

---

# PHASE 5A — BEHAVIORAL INTELLIGENCE

## Status

```txt
COMPLETE
```

### Delivered

```txt
Session Intelligence

Intent Classification

Hesitation Classification

Friction Classification

Replay Reconstruction

Deterministic Shopper State
```

### Opportunity Engine

```txt
Recovery Opportunities

Conversion Opportunities

Upsell Opportunities

Retention Opportunities

Opportunity Scoring

Opportunity Aggregation

Replay Verification
```

---

# PHASE 5B — PREDICTIVE INTELLIGENCE

## Status

```txt
PLANNED
```

## Goal

Move from classification to prediction.

### Predictive Systems

```txt
Abandonment Prediction

Conversion Probability

Retention Risk

Revenue Forecasting

Behavioral Trend Analysis
```

### Operational Intelligence

```txt
Anomaly Detection

Behavioral Drift Detection

Merchant Health Signals
```

### Output

```ts
interface PredictiveSignal {
  id: string;

  shopperId: string;

  type:
    | "abandonment_risk"
    | "conversion_probability"
    | "retention_risk"
    | "revenue_forecast";

  confidence: number;

  rationale: string;
}
```

---

# PHASE 6A — DECISION ENGINE

## Status

```txt
COMPLETE
```

### Delivered

```txt
Decision Categories

Decision Actions

Eligibility Evaluation

Priority Assignment

Conflict Resolution

Replay Verification

Deterministic Ordering
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

# PHASE 6B — WORKFLOW RUNTIME

## Status

```txt
COMPLETE
```

### Delivered

#### Workflow Runtime

```txt
Decision → Execution Translation

Execution Plans

Workflow Policies

Workflow Runtime
```

#### Workflow Coordinator

```txt
Workflow Ordering

Workflow Suppression

Workflow Prioritization

Execution Order Assignment
```

#### Workflow Graph

```txt
Workflow Dependencies

Dependency Relationships

Graph Construction
```

#### Execution Strategy

```txt
Urgency Assignment

Execution Group Assignment

Dependency Enrichment

Strategy Metadata
```

#### Strategy Verification

```txt
Strategy Validation

Replay Verification

Deterministic Strategy Guarantees
```

Pipeline:

```txt
Decision[]
        ↓
ExecutionPlan[]
        ↓
CoordinatedWorkflow[]
        ↓
WorkflowGraph
        ↓
ExecutionStrategy[]
```

---

# PHASE 6C — PLANNING INTEGRITY

## Status

```txt
NEXT
```

## Goal

Verify every planning layer before AI orchestration begins.

---

## Deliverables

### Planning Verification

```txt
Decision → Plan Validation

Plan → Workflow Validation

Workflow → Strategy Validation
```

### Dependency Verification

```txt
Graph Consistency

Dependency Validation

Cycle Detection

Missing Node Detection
```

### Replay Verification Expansion

```txt
Same Events

Same Opportunities

Same Decisions

Same Plans

Same Strategies
```

### Deterministic Audit Layer

```txt
Unstable Sort Detection

Orphan Plans

Orphan Workflows

Orphan Strategies

Invalid Dependencies
```

---

## Directory

```txt
packages/runtime/src/planning-verification
```

---

## Contracts

### PlanningVerificationResult

```ts
interface PlanningVerificationResult {
  valid: boolean;

  violations: string[];
}
```

---

## Target Structure

```txt
planning-verification/

├── planning-verification.types.ts

├── decision-plan-validator.ts

├── workflow-validator.ts

├── strategy-validator.ts

├── dependency-validator.ts

├── planning-verification.ts

└── __tests__
    ├── planning-verification.test.ts
    └── planning-verification.replay.test.ts
```

---

# PHASE 7 — AI ORCHESTRATION

## Status

```txt
PLANNED
```

## Goal

Introduce AI only after deterministic systems are complete.

---

## Owns

```txt
OpenAI

Anthropic

Future Models

Model Routing

Prompt Construction

Content Generation
```

---

## Does NOT Own

```txt
Replay

Behavioral Intelligence

Opportunity Detection

Decision Evaluation

Workflow Planning
```

---

## Pipeline

```txt
ExecutionStrategy[]
        ↓
OrchestrationRequest[]
        ↓
Model Runtime
        ↓
Generated Content
```

---

# PHASE 8 — MULTI-TENANT PLATFORM SCALING

## Status

```txt
PLANNED
```

### Deliverables

```txt
Tenant Isolation

Replay Partitioning

Distributed Scheduling

Observability

Telemetry

Operational Diagnostics

Monitoring
```

---

# PHASE 9 — MERCHANT PRODUCTIZATION

## Status

```txt
PLANNED
```

### Deliverables

```txt
Shopify Integration

OAuth

Merchant Onboarding

Operational Dashboards

AI Command Center

Merchant Workspace
```

---

# PHASE 10 — YC READINESS

## Status

```txt
PLANNED
```

### Deliverables

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

# NEXT IMPLEMENTATION

Current Recommendation:

```txt
Phase 6C — Planning Integrity
```

Build first:

```txt
packages/runtime/src/planning-verification
```

Before:

```txt
OpenAI

Anthropic

Model Routing

AI Orchestration
```

Reason:

Deterministic systems should decide:

What should happen

before AI decides:

How it should be communicated