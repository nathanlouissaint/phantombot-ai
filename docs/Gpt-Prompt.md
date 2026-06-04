# PHANTOMBOT AI CONTINUATION PROMPT

You are continuing work on PhantomBot AI.

Project: PhantomBot AI

Branch:

```txt
architecture/core-system
```

Current Phase:

```txt
Phase 6A — Decision Engine Foundation
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
Shopify Plugin
GPT Wrapper
Agent Framework
AI Support Tool
Workflow Builder
```

Target architecture:

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
Projections
Behavioral Intelligence
Opportunity Detection
Opportunity Scoring
Decision Engines
```

Never add:

```txt
OpenAI
Anthropic
Agents
Workflow Execution
Persistence
SQL
```

inside:

```txt
Decision Engine
Opportunity Engine
Behavioral Intelligence
```

Replay must remain:

```txt
Deterministic
Replay Safe
Reconstructable
```

---

# VERIFIED STATUS

Completed:

```txt
✓ Phase 1 — Product Foundation

✓ Phase 2 — Deterministic Runtime Foundation

✓ Phase 3 — Infrastructure Isolation

✓ Phase 4A — Runtime Coordination Foundation

✓ Phase 4B — Deterministic Worker Runtime

✓ Phase 5A — Behavioral Intelligence Foundation
```

Current Phase:

```txt
→ Phase 6A — Decision Engine Foundation
```

---

# VERIFIED TEST STATUS

Latest verified commands:

```bash
pnpm turbo run typecheck --force

pnpm --filter @phantombot/runtime test
```

Result:

```txt
Typecheck: PASS

Test Files: 17 passed
Tests: 50 passed
```

---

# CURRENT ARCHITECTURE

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

(Future)
Workflow Runtime

        ↓

(Future)
OpenAI Integration
```

---

# CURRENT DIRECTORY STRUCTURE

```txt
packages/runtime/src/opportunities
```

Implemented:

```txt
opportunity.types.ts

recovery-opportunity.detector.ts
conversion-opportunity.detector.ts
upsell-opportunity.detector.ts
retention-opportunity.detector.ts

opportunity-score.ts

opportunity-engine.ts
```

Implemented tests:

```txt
conversion-opportunity.detector.test.ts
retention-opportunity.detector.test.ts
upsell-opportunity.detector.test.ts
recovery-opportunity.detector.test.ts
opportunity-engine.test.ts
opportunity-engine.replay.test.ts
```

---

Decision Engine:

```txt
packages/runtime/src/decision-engine
```

Current files:

```txt
decision.types.ts
decision-policy.ts
decision-engine.ts

__tests__/decision-engine.test.ts
```

Current capability:

```txt
Opportunity[]
        ↓
Decision[]
```

---

# CURRENT DECISION CONTRACT

Decision Engine exists but is only a foundation.

Current responsibilities:

```txt
Deterministic Decision Creation
Priority Assignment
Policy Evaluation Foundation
```

Still missing:

```txt
Decision Categories
Decision Actions
Decision Prioritization
Decision Eligibility Rules
Decision Conflict Resolution
Decision Replay Verification
```

---

# NEXT TASK

Continue Phase 6A.

First inspect:

```bash
cat packages/runtime/src/decision-engine/decision.types.ts

cat packages/runtime/src/decision-engine/decision-policy.ts

cat packages/runtime/src/decision-engine/decision-engine.ts

cat packages/runtime/src/decision-engine/__tests__/decision-engine.test.ts
```

Then evolve the Decision Engine into a real deterministic policy layer.

Goals:

```txt
Opportunity[]
        ↓
Policy Evaluation
        ↓
Decision[]
```

Build:

```txt
Decision Categories
Decision Actions
Decision Priorities
Eligibility Rules
Conflict Resolution
Additional Tests
```

Do NOT start:

```txt
Workflow Runtime
OpenAI
Agents
Automation
Execution Plans
Recommendations
```

Maintain all determinism and replay-safety invariants.
