We are continuing PhantomBot AI.

Current branch:

```txt
architecture/core-system
```

Current verified state:

```txt
Typecheck: PASS
Runtime Test Files: 54 Passed
Runtime Tests: 105 Passed
Current Phase: Phase 7G Complete
Next Phase: Phase 8A — Provider Boundary Enforcement
```

Completed architecture:

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

Recently completed:

```txt
Phase 7G — Capability Planning
```

Files added:

```txt
packages/runtime/src/ai-orchestration/capability-planning/capability.types.ts
packages/runtime/src/ai-orchestration/capability-planning/capability-planner.ts
packages/runtime/src/ai-orchestration/capability-planning/capability-validator.ts
packages/runtime/src/ai-orchestration/capability-planning/index.ts
packages/runtime/src/ai-orchestration/capability-planning/__tests__/capability-planner.test.ts
packages/runtime/src/ai-orchestration/capability-planning/__tests__/capability-planner.replay.test.ts
packages/runtime/src/ai-orchestration/capability-planning/__tests__/capability-validator.test.ts
```

Validation passed:

```txt
pnpm turbo run typecheck

pnpm --filter @phantombot/runtime test

Test Files 54 passed
Tests 105 passed
```

Core rules:

```txt
Do not build OpenAI integration.
Do not build Anthropic integration.
Do not execute prompts.
Do not call external model APIs.
Do not add persistence, SQL, database access, or external APIs inside deterministic runtime.
Do not use Date.now(), new Date(), Math.random(), or crypto.randomUUID() inside deterministic layers.
```

Next task:

```txt
Build Phase 8A — Provider Boundary Enforcement
```

Goal:

```txt
Create deterministic enforcement that provider-specific logic cannot leak into replay, behavioral intelligence, opportunity detection, decision engine, workflow runtime, workflow graph, execution strategy, planning verification, capability planning, or model routing.
```

Recommended directory:

```txt
packages/runtime/src/ai-orchestration/provider-boundary
```

Build:

```txt
provider-boundary.types.ts
provider-boundary-policy.ts
provider-boundary-validator.ts
provider-boundary-runtime.ts
index.ts
```

Tests:

```txt
provider-boundary-validator.test.ts
provider-boundary-runtime.test.ts
provider-boundary-runtime.replay.test.ts
```

After implementation, run:

```bash
pnpm turbo run typecheck

pnpm --filter @phantombot/runtime test
```

Expected minimum:

```txt
Typecheck: PASS
Runtime Test Files: >= 57 Passed
Runtime Tests: >= 108 Passed
```

Always provide:

```txt
CLI commands
file contents
tests
expected test counts
architectural reasoning
```
