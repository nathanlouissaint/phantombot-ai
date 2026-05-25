# PhantomBotAI Runtime Boundaries

## Purpose

This document defines ownership boundaries for PhantomBotAI runtime infrastructure.

PhantomBotAI is not a chatbot SaaS, Shopify AI wrapper, or trigger-action automation tool.

PhantomBotAI is deterministic behavioral orchestration infrastructure for commerce.

The goal of these boundaries is to prevent architecture drift as projection execution, replay systems, distributed coordination, orchestration, and AI adaptation expand.

---

## Core Rule

Deterministic infrastructure owns truth.

AI systems adapt presentation, persuasion, summaries, and recommendations.

AI systems do not own replay state, behavioral truth, checkpoint progression, event ordering, orchestration state, or deterministic scoring.

---

## Layer 1 — Infrastructure Runtime

Owns:

- event ordering
- deterministic execution
- projection execution
- checkpoint progression
- replay infrastructure
- worker leases
- runtime state
- idempotency
- dead-letter handling
- transactional mutation

Does not own:

- persuasion logic
- merchant UI
- AI summaries
- intervention copy
- product recommendation language

Current packages:

```txt
packages/runtime
packages/database