# PHANTOMBOT AI — CONTINUE FROM PHASE 8D

We are continuing PhantomBot AI.

Branch:

```txt
architecture/core-system
```

Current verified checkpoint:

```txt
Status: Stable

Typecheck: PASS

Runtime Test Files: 63 Passed

Runtime Tests: 121 Passed

Current Phase: Phase 8C Complete

Next Phase: Phase 8D — Routing Integration
```

Current architecture:

```txt
Commerce Events
↓
Replay Infrastructure
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
Capability Resolution
↓
Resolved Capability Set
↓
Model Routing
↓
Provider Boundary Enforcement
↓
Provider Execution Authorization
↓
Provider Adapter Boundary
↓
Future Model Providers
```

Completed phases:

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

✓ Phase 8A — Provider Boundary Enforcement

✓ Phase 8B — Provider Adapter Execution Isolation

✓ Phase 8C — Capability Resolution
```

Current capability planning contracts:

```ts
export type CapabilityType =
  | "generation"
  | "classification"
  | "summarization"
  | "reasoning"
  | "retrieval";

export interface CapabilityRequirement {
  capability: CapabilityType;

  priority: number;
}

export interface CapabilityPlan {
  taskId: string;

  requirements: CapabilityRequirement[];
}
```

Current routing contracts:

```ts
export type RoutingProfile =
  | "classification"
  | "reasoning"
  | "summarization"
  | "content_generation";

export interface RoutingDecision {
  taskId: string;

  profile: RoutingProfile;
}
```

Current router:

```ts
routeTask({
  taskId,
  taskType,
})
```

Architectural issue discovered:

```txt
Current routing bypasses capability planning.

Current architecture:

Task
├─ CapabilityPlan
└─ RoutingDecision

Desired architecture:

CapabilityPlan
↓
CapabilityResolution
↓
ResolvedCapabilitySet
↓
RoutingDecision
```

Phase 8C already completed and verified.

Metrics:

```txt
Typecheck: PASS

Runtime Test Files: 63 Passed

Runtime Tests: 121 Passed
```

Non-negotiable architecture rules:

```txt
No OpenAI integration

No Anthropic integration

No prompt execution

No SDK imports

No API calls

No persistence

No SQL

No database access

No Date.now()

No new Date()

No Math.random()

No crypto.randomUUID()
```

Deterministic layers must remain:

```txt
Replay Safe

Serializable

Provider Agnostic

Deterministic

Reconstructable
```

PHASE 8D OBJECTIVE:

```txt
Refactor model routing so routing decisions are derived from ResolvedCapabilitySet instead of taskType.
```

Target architecture:

```txt
Capability Planning
↓
Capability Resolution
↓
Resolved Capability Set
↓
Model Routing
↓
Provider Boundary Enforcement
↓
Provider Execution Authorization
↓
Provider Adapter Boundary
```

REQUIRED PROCESS:

1. First inspect existing model-routing files before generating code.
2. Return CLI commands first.
3. Return complete file contents.
4. Put a file header comment on every file explaining:

   * Purpose
   * Responsibilities
   * Constraints
5. Return tests.
6. Return replay tests.
7. Maintain deterministic architecture.
8. Avoid duplicate abstractions.
9. Update CURRENT_STATE.md only after validation passes.
10. Return commit commands.
11. Return push commands.
12. Do not mark phase complete until:

    * Typecheck PASS
    * Tests PASS

First step:

Inspect and analyze:

```bash
tree packages/runtime/src/ai-orchestration/model-routing -L 3

cat packages/runtime/src/ai-orchestration/model-routing/routing.types.ts

cat packages/runtime/src/ai-orchestration/model-routing/model-router.ts

cat packages/runtime/src/ai-orchestration/model-routing/routing-profiles.ts

cat packages/runtime/src/ai-orchestration/model-routing/routing-validator.ts

cat packages/runtime/src/ai-orchestration/model-routing/__tests__/model-router.test.ts

cat packages/runtime/src/ai-orchestration/model-routing/__tests__/model-router.replay.test.ts
```

Do not generate Phase 8D code until after inspecting those files.
