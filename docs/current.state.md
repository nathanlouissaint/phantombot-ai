# PhantomBotAI — Current System State
Date: 2026-05-23

---

# Project Identity

PhantomBotAI is no longer evolving as a traditional Shopify chatbot SaaS.

The platform is becoming:

```txt
AI-native deterministic commerce intelligence infrastructure
```

Current direction:

- deterministic behavioral runtime systems
- replay-safe event orchestration
- behavioral intelligence accumulation
- recovery opportunity generation
- workflow orchestration
- adaptive intervention infrastructure
- distributed runtime coordination
- commerce intelligence projections

The architecture is converging toward concepts found in:

- Temporal
- Kafka Streams
- deterministic workflow runtimes
- event-sourced intelligence systems
- replay-driven orchestration platforms

---

# Strategic System Direction

Canonical system flow:

```txt
shopper interaction
→ behavioral signal collection
→ session intelligence update
→ hesitation analysis
→ recovery opportunity generation
→ workflow orchestration
→ intervention execution
→ outcome tracking
```

The platform is now being architected as:

```txt
behavioral operating system for commerce
```

NOT:
- AI support chatbot
- generic Shopify assistant
- automation dashboard SaaS

---

# Canonical Repository

```txt
phantombot-ai/phantombot-ai
```

---

# Major Infrastructure Progress

# 1. Monorepo Stabilization

Completed:

- pnpm workspace orchestration
- Turbo dependency graph
- workspace governance
- deterministic package compilation

Installed:
- pnpm
- turbo

Created:
- turbo.json
- pnpm-workspace.yaml

---

# 2. Runtime Contract Consolidation

Resolved previous architectural fracture between:

OLD:
```ts
projection.handle()
```

and

NEW:
```ts
projection.process(tx, event)
```

Platform officially standardized on:

```txt
constructor-driven deterministic runtime orchestration
```

---

# 3. Projection Runtime Refactor

ProjectionRuntime upgraded from:

```ts
constructor(
  projectionName: string
)
```

to:

```ts
constructor({
  projectionName,
  namespace,
})
```

Enabled:
- namespace-aware execution
- replay-safe orchestration
- deterministic checkpoint ownership
- multi-tenant replay isolation

---

# 4. Replay Runtime Stabilization

Replay infrastructure now consistently enforces:

- ProjectionNamespace typing
- deterministic replay sequencing
- replay-safe projection rebuilding
- transactional replay progression

Updated:
```txt
packages/runtime/src/replay
├── rebuild-projection.ts
├── run-replay.ts
```

---

# 5. Transactional Runtime Fixes

Critical runtime issue corrected.

OLD:
```ts
client`
`
```

NEW:
```ts
client.query(...)
```

Stabilized:
- transactional execution
- checkpoint correctness
- projection atomicity

---

# 6. Idempotency + Checkpoint Atomicity

Projection execution loop now guarantees:

- transactional mutation
- atomic checkpoint advancement
- replay-safe progression ordering
- idempotent event processing

---

# 7. Namespace Isolation Hardening

Canonical namespace contracts introduced:

```ts
export type ProjectionNamespace =
  | "live"
  | "replay"
  | "experimental";
```

Prevents:
- replay contamination
- invalid runtime drift
- unsafe rebuild execution

---

# 8. TypeScript Runtime Stabilization

Compiler interoperability issues resolved.

Added:

```json
"esModuleInterop": true,
"allowSyntheticDefaultImports": true
```

Stabilized:
- postgres imports
- dotenv imports
- pino/thread-stream
- crypto compatibility

---

# 9. Formal Workspace Contract Package Created

Created:

```txt
packages/contracts
```

This is now the canonical contract ownership layer.

The platform officially moved from:

```txt
scattered runtime types
```

to:

```txt
governed workspace contracts
```

---

# 10. Canonical Commerce Event Contracts Created

Created:

```txt
packages/contracts/src/commerce/commerce-event.types.ts
```

Canonical commerce events now exist:

```txt
SHOPPER_SESSION_STARTED
PRODUCT_VIEWED
PRODUCT_ADDED_TO_CART
PRODUCT_REMOVED_FROM_CART
CHECKOUT_STARTED
CHECKOUT_HESITATED
CHECKOUT_ABANDONED
RECOVERY_CONVERTED
```

These events now define the behavioral language of the platform.

---

# 11. Shopper Intelligence Contracts Created

Created:

```txt
packages/contracts/src/commerce/shopper-session.types.ts
```

Formalized deterministic shopper intelligence state:

```ts
hesitationScore
purchaseIntent
primaryFrictionType
```

This establishes:

```txt
deterministic behavioral truth systems
```

LLMs will NOT own intelligence truth.

---

# 12. Hesitation Intelligence Contracts Created

Created:

```txt
packages/contracts/src/commerce/hesitation.types.ts
```

Defined:
- hesitation signal types
- friction analysis contracts
- behavioral heuristics

Examples:

```txt
checkout_idle
shipping_revisit
coupon_field_interaction
checkout_exit
```

---

# 13. Recovery Opportunity Contracts Created

Created:

```txt
packages/contracts/src/commerce/recovery-opportunity.types.ts
```

Recovery systems now formally model:

```txt
opportunity generation
```

instead of:
- chatbot responses
- random automation
- generic AI outputs

Recovery opportunities now include:
- opportunity type
- confidence
- estimated revenue
- recommended intervention

---

# Current System State

## Runtime Infrastructure
STABILIZED

## Replay Infrastructure
STABILIZED

## Namespace Isolation
WORKING

## Transactional Runtime
WORKING

## Workspace Contracts
WORKING

## Canonical Commerce Events
WORKING

## Shopper Intelligence Contracts
WORKING

## Hesitation Contracts
WORKING

## Recovery Opportunity Contracts
WORKING

## Worker Lease Infrastructure
WORKING

## Idempotency Layer
WORKING

## Frontend Architecture
STILL DRIFTED

---

# Current Architecture Layers

# Contracts Layer

Owns:
- commerce events
- shopper intelligence state
- hesitation contracts
- recovery opportunity contracts

Location:

```txt
packages/contracts
```

---

# Runtime Layer

Owns:
- deterministic mutation
- replay-safe execution
- projection orchestration
- transactional progression

Location:

```txt
packages/runtime
```

---

# Future AI Layer

Will own:
- persuasion adaptation
- intervention personalization
- merchant summaries
- conversational rendering

AI will NOT own:
- behavioral truth
- event validity
- recovery correctness
- deterministic scoring

---

# Current Strategic Direction

The platform is now becoming:

```txt
deterministic behavioral commerce infrastructure
```

This changes:
- engineering standards
- scalability requirements
- infrastructure governance
- competitive positioning
- hiring requirements

---

# Current Immediate Focus

# Phase 2 — Session Intelligence Projection Runtime

Current target:

```txt
packages/runtime/src/projections/session-intelligence
```

Goal:

```txt
commerce events
→ deterministic session projection
→ accumulated shopper intelligence
```

This projection will:
- process canonical commerce events
- update shopper intelligence state
- accumulate behavioral signals
- classify hesitation
- maintain replay-safe deterministic state

---

# Next Major Runtime Build

Upcoming runtime responsibilities:

```txt
SHOPPER_SESSION_STARTED
→ initialize shopper state

PRODUCT_VIEWED
→ increment behavioral counters

PRODUCT_ADDED_TO_CART
→ update purchase intent

CHECKOUT_HESITATED
→ increase hesitation score

CHECKOUT_ABANDONED
→ generate recovery signals
```

---

# Current Immediate Priorities

Priority 1:
- SessionIntelligenceProjection

Priority 2:
- deterministic projection mutation

Priority 3:
- replay-safe intelligence rebuilding

Priority 4:
- hesitation classification engine

Priority 5:
- recovery opportunity generation

Priority 6:
- orchestration runtime

Priority 7:
- adaptive AI intervention layer

---

# Architectural Rules

## Contracts Own Truth

```txt
packages/contracts
```

Owns:
- event schemas
- state contracts
- intelligence contracts
- recovery contracts

---

## Runtime Owns Mutation

```txt
packages/runtime
```

Owns:
- deterministic state transitions
- projection execution
- replay coordination
- transactional progression

---

## AI Owns Adaptation

Future AI systems own:
- persuasion
- tone
- personalization
- merchant-facing communication

AI does NOT own:
- system truth
- scoring
- event ordering
- behavioral correctness

---

# Long-Term Direction

Long-term platform direction:

```txt
AI-native autonomous commerce orchestration
```

Future architecture:

```txt
interaction
→ intelligence
→ workflow
→ automation
→ adaptive rendering
```

The platform moat is now converging around:

- deterministic behavioral intelligence
- replay-safe orchestration
- commerce event infrastructure
- recovery opportunity systems
- adaptive commerce intervention