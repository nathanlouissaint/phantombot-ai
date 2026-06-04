# PHANTOMBOT AI CONTINUATION PROMPT

You are continuing work on PhantomBot AI.

Project:

```txt
PhantomBot AI
```

Branch:

```txt
architecture/core-system
```

Roadmap Version:

```txt
v2.2
```

Current Phase:

```txt
Phase 6B — Workflow Runtime
```

---

# PROJECT VISION

PhantomBot AI is being built as:

```txt
The deterministic AI operating system for commerce.
```

Not:

```txt
Chatbot
Shopify Widget
GPT Wrapper
Agent Framework
Support Bot
Workflow Builder
```

PhantomBot AI is infrastructure.

Core platform pipeline:

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
AI Orchestration
        ↓
Merchant Outcomes
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
Workflow Runtime
        ↓
Merchant Outcomes
```

---

# CRITICAL ENGINEERING RULES

Never violate:

```txt
No Date.now()
No new Date()
No Math.random()
No crypto.randomUUID()
```

inside:

```txt
Replay
Projections
Behavioral Intelligence
Opportunity Detection
Opportunity Scoring
Decision Engine
Workflow Runtime
```

Never introduce:

```txt
OpenAI
Anthropic
Agents
Persistence
SQL
Database Access
```

inside:

```txt
Behavioral Intelligence
Opportunity Engine
Decision Engine
Workflow Runtime
```

Replay must remain:

```txt
Deterministic
Replay Safe
Reconstructable
```

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
Same Execution Plans
```

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
```

Current Phase:

```txt
→ Phase 6B — Workflow Runtime
```

---

# CURRENT VERIFIED BASELINE

Verified Commands:

```bash
pnpm turbo run typecheck --force

pnpm --filter @phantombot/runtime test
```

Current verified results:

```txt
Typecheck: PASS

Test Files: 18 Passed

Tests: 55 Passed
```

These values must never decrease.

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

Workflow Runtime (Current Phase)

        ↓

AI Orchestration (Future)

        ↓

Merchant Outcomes
```

---

# CURRENT RUNTIME STRUCTURE

```txt
packages/runtime/src

├── projections
│   ├── session
│   └── session-intelligence

├── opportunities
│   ├── conversion
│   ├── recovery
│   ├── retention
│   ├── upsell
│   └── opportunity-engine

├── decision-engine
│   ├── decision.types.ts
│   ├── decision-eligibility.ts
│   ├── decision-priority.ts
│   ├── decision-conflicts.ts
│   ├── decision-policy.ts
│   └── decision-engine.ts

├── replay
├── recovery
├── workers
└── verification
```

---

# PHASE 6A DELIVERED

Directory:

```txt
packages/runtime/src/decision-engine
```

Implemented:

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

Capabilities:

```txt
Decision Categories

Decision Actions

Eligibility Evaluation

Priority Assignment

Conflict Resolution

Replay Verification

Deterministic Ordering

Replay-Safe Decision Generation
```

---

# DECISION ENGINE OUTPUT CONTRACT

Current output:

```txt
Decision
```

Shape:

```ts
{
  id: string;

  opportunityId: string;

  category:
    "recovery"
    | "conversion"
    | "upsell"
    | "retention";

  action:
    | "recover_session"
    | "advance_conversion"
    | "present_upsell"
    | "protect_retention";

  type: string;

  priority:
    | "low"
    | "medium"
    | "high"
    | "critical";

  rationale: string;
}
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

# CURRENT CONFLICT POLICY

Current suppression rule:

```txt
critical recovery

suppresses

upsell decisions
```

Priority ranking:

```txt
critical
high
medium
low
```

Category ranking:

```txt
recovery
retention
conversion
upsell
```

---

# ARCHITECTURAL RULE

Each phase may consume outputs from the previous phase.

Each phase may NOT redesign previous phases.

Phase 6B consumes:

```txt
Decision[]
```

Phase 6B does NOT redesign:

```txt
Behavioral Intelligence

Opportunity Engine

Decision Engine
```

---

# PHASE 6B — WORKFLOW RUNTIME

Goal:

```txt
Transform Decisions into deterministic execution plans.
```

Pipeline:

```txt
Decision[]
        ↓
Workflow Planner
        ↓
ExecutionPlan[]
        ↓
Workflow Runtime
```

---

# PHASE 6B NON-GOALS

Do NOT build:

```txt
Workflow Execution

Email Sending

SMS Sending

Shopify Actions

OpenAI Calls

Anthropic Calls

Background Jobs

Persistence

API Integrations

External APIs

Automation
```

Phase 6B is planning only.

---

# PHASE 6B TARGET CONTRACT

Input:

```txt
Decision[]
```

Output:

```txt
ExecutionPlan[]
```

ExecutionPlan:

```ts
{
  id: string;

  decisionId: string;

  workflowType: string;

  steps: string[];

  priority:
    | "low"
    | "medium"
    | "high"
    | "critical";
}
```

Example:

```txt
Decision

recover_session

↓

ExecutionPlan

workflowType:
recovery

steps:

[
  "identify_shopper",
  "prepare_recovery_action"
]
```

No execution.

Only planning.

Execution plans must remain:

```txt
Deterministic
Replay Safe
Serializable
```

---

# PHASE 6B DELIVERABLES

Build:

```txt
Workflow Contracts

Execution Plan Contracts

Decision → Execution Translation

Workflow Policy Layer

Workflow Runtime

Replay Verification
```

---

# PHASE 6B TARGET STRUCTURE

Create under:

```txt
packages/runtime/src/workflow-runtime
```

Expected foundation:

```txt
workflow.types.ts

execution-plan.ts

workflow-policy.ts

workflow-runtime.ts

__tests__/
workflow-runtime.test.ts
workflow-runtime.replay.test.ts
```

---

# WORKFLOW RUNTIME MAY OWN

```txt
Execution Plans

Workflow Policies

Workflow Evaluation

Workflow State

Workflow Coordination
```

---

# WORKFLOW RUNTIME MAY NOT OWN

```txt
Opportunity Detection

Behavioral Intelligence

Decision Evaluation

OpenAI

Anthropic

Persistence

SQL

Database Access

External APIs
```

---

# FIRST TASK

Before implementing Phase 6B:

1. Inspect the current repository state.

Run:

```bash
find packages/runtime/src -type f | sort

tree packages/runtime/src -L 4

pnpm turbo run typecheck --force

pnpm --filter @phantombot/runtime test
```

2. Inspect Decision Engine contracts.

Run:

```bash
cat packages/runtime/src/decision-engine/decision.types.ts

cat packages/runtime/src/decision-engine/decision-engine.ts

cat packages/runtime/src/decision-engine/decision-policy.ts
```

3. If workflow-runtime does not exist:

Create only the minimal foundation.

Design:

```txt
workflow.types.ts

execution-plan.ts

workflow-policy.ts

workflow-runtime.ts

workflow-runtime.test.ts

workflow-runtime.replay.test.ts
```

4. Maintain:

```txt
Determinism

Replay Safety

Serializable Contracts
```

5. Run:

```bash
pnpm turbo run typecheck --force

pnpm --filter @phantombot/runtime test
```

6. Report:

```txt
Files Added

Contracts Added

Tests Added

Updated Test Count
```

Do not redesign completed phases.

Extend the architecture forward from the current verified state only.
