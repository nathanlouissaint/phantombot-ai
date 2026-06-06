# PHANTOMBOT AI — CURRENT STATE

Last Updated: Phase 7G Complete

---

# PROJECT

Name:

PhantomBot AI

Vision:

The deterministic AI operating system for commerce.

---

# VERIFIED CHECKPOINT

```txt
Branch: architecture/core-system

Status: Stable

Typecheck: PASS

Runtime Test Files: 54 Passed

Runtime Tests: 105 Passed

Current Phase: Phase 7G Complete

Next Phase: Phase 8A — Provider Boundary Enforcement
```

These values must never decrease.

---

# CORE THESIS

Most AI systems:

```txt
Prompt
↓
Model
↓
Response
```

PhantomBot AI:

```txt
Commerce Events
↓
Replay Infrastructure
↓
Behavioral Intelligence
↓
Opportunity Detection
↓
Decision Engine
↓
Workflow Runtime
↓
Workflow Coordinator
↓
Workflow Graph
↓
Execution Strategy
↓
Planning Verification
↓
AI Orchestration Boundary
↓
Capability Planning
↓
Model Routing
↓
Provider Adapters
↓
Future Model Providers
↓
Merchant Outcomes
```

---

# NON-NEGOTIABLE RULES

Forbidden inside deterministic runtime layers:

```txt
Replay
Behavioral Intelligence
Opportunity Detection
Opportunity Scoring
Decision Engine
Workflow Runtime
Workflow Coordinator
Workflow Graph
Execution Strategy
Planning Verification
Capability Planning
Model Routing
```

Forbidden APIs:

```txt
Date.now()
new Date()
Math.random()
crypto.randomUUID()
```

Also forbidden inside deterministic runtime:

```txt
OpenAI
Anthropic
Persistence
SQL
Database Access
External APIs
Prompt Execution
Model Calls
```

---

# REQUIRED REPLAY INVARIANT

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
↓
Same Tasks
↓
Same Context
↓
Same Capability Plans
↓
Same Routing Decisions
```

All planning and orchestration boundary layers must remain:

```txt
Deterministic
Replay Safe
Serializable
Reconstructable
Provider Agnostic
```

---

# COMPLETED PHASES

```txt
✓ Phase 1 — Product Foundation

✓ Phase 2 — Deterministic Runtime Foundation

✓ Phase 3 — Infrastructure Isolation

✓ Phase 4A — Runtime Coordination Foundation

✓ Phase 4B — Deterministic Worker Runtime

✓ Phase 5A — Behavioral Intelligence Foundation

✓ Phase 6A — Decision Engine

✓ Phase 6B — Workflow Runtime

✓ Workflow Coordinator

✓ Workflow Graph

✓ Execution Strategy

✓ Strategy Verification

✓ Phase 6C — Planning Integrity

✓ Phase 7A — Orchestration Contracts

✓ Phase 7B — Task Definitions

✓ Phase 7C — Execution Context

✓ Phase 7D — Model Routing Contracts

✓ Phase 7E — Orchestration Verification

✓ Phase 7F — Provider Adapter Foundation

✓ Phase 7G — Capability Planning
```

---

# CURRENT PIPELINE

```txt
Commerce Events
↓
Replay Infrastructure
↓
Session Intelligence Projection
↓
Deterministic Shopper State
↓
Opportunity Detection
↓
Decision Engine
↓
Workflow Runtime
↓
Workflow Coordinator
↓
Workflow Graph
↓
Execution Strategy
↓
Planning Verification
↓
Orchestration Task Runtime
↓
Execution Context Runtime
↓
Capability Planning
↓
Model Routing
↓
Provider Adapter Boundary
↓
Future Model Providers
```

---

# PHASE 7G — CAPABILITY PLANNING

Status:

```txt
COMPLETE
```

Directory:

```txt
packages/runtime/src/ai-orchestration/capability-planning
```

Delivered:

```txt
✓ Provider-Independent Capability Contracts

✓ Capability Requirement Definitions

✓ Capability Plan Construction

✓ Capability Plan Validation

✓ Replay-Safe Capability Planning

✓ Deterministic Task-to-Capability Mapping
```

Files:

```txt
capability.types.ts

capability-planner.ts

capability-validator.ts

index.ts
```

Tests:

```txt
capability-planner.test.ts

capability-planner.replay.test.ts

capability-validator.test.ts
```

Produces:

```txt
CapabilityRequirement[]

CapabilityPlan
```

Architectural Purpose:

```txt
Translate orchestration tasks into provider-independent capability requirements before model routing occurs.
```

Pipeline Addition:

```txt
OrchestrationTask
↓
ExecutionContext
↓
CapabilityPlan
↓
RoutingDecision
↓
ProviderAdapter
```

---

# AI ORCHESTRATION STATUS

Directory:

```txt
packages/runtime/src/ai-orchestration
```

Status:

```txt
BOUNDARY COMPLETE THROUGH CAPABILITY PLANNING
```

Completed:

```txt
✓ Orchestration Contracts

✓ Task Definitions

✓ Execution Context Runtime

✓ Model Routing

✓ Orchestration Verification

✓ Provider Adapter Foundation

✓ Capability Planning
```

Current AI Orchestration Subsystems:

```txt
orchestration-contracts.ts
orchestration-policy.ts
orchestration-runtime.ts
orchestration.types.ts

task-definition.types.ts
task-definition-policy.ts
task-definition-runtime.ts

execution-context.types.ts
execution-context-runtime.ts
execution-context-validator.ts

capability-planning/

model-routing/

orchestration-verification/

provider-adapters/
```

---

# CURRENT VERIFIED METRICS

Typecheck:

```txt
PASS
```

Runtime Test Files:

```txt
54 Passed
```

Runtime Tests:

```txt
105 Passed
```

Validation Commands:

```bash
pnpm turbo run typecheck

pnpm --filter @phantombot/runtime test
```

Latest Verified Output:

```txt
Test Files 54 passed (54)

Tests 105 passed (105)
```

---

# NEXT PHASE

```txt
Phase 8A — Provider Boundary Enforcement
```

Goal:

```txt
Formally enforce that provider-specific logic cannot leak into deterministic runtime, planning, routing, or capability layers.
```

Build Next:

```txt
packages/runtime/src/ai-orchestration/provider-boundary
```

Recommended Files:

```txt
provider-boundary.types.ts

provider-boundary-policy.ts

provider-boundary-validator.ts

provider-boundary-runtime.ts

index.ts
```

Recommended Tests:

```txt
provider-boundary-validator.test.ts

provider-boundary-runtime.test.ts

provider-boundary-runtime.replay.test.ts
```

Do NOT Build Yet:

```txt
OpenAI Adapter

Anthropic Adapter

Prompt Execution

External Model Calls

Content Generation

Provider API Clients
```

---

# CURRENT ARCHITECTURE SNAPSHOT

```txt
Replay
↓
Session Intelligence
↓
Opportunity Engine
↓
Decision Engine
↓
Workflow Runtime
↓
Workflow Coordinator
↓
Workflow Graph
↓
Execution Strategy
↓
Planning Verification
↓
AI Orchestration Boundary
↓
Execution Context
↓
Capability Planning
↓
Model Routing
↓
Provider Adapter Boundary
↓
Future Model Providers
```

Verified State:

```txt
Branch: architecture/core-system

Typecheck: PASS

Runtime Test Files: 54

Runtime Tests: 105

Current Phase: Phase 7G Complete

Next Phase: Phase 8A — Provider Boundary Enforcement

Status: Stable
```
