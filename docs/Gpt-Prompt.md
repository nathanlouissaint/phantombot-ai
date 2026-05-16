
* GPT Prompt 5/16/26 

We are continuing development of PhantomBotAI from the current architecture-first behavioral commerce infrastructure state.

Current completed infrastructure:

* canonical event schema
* event bus
* commerce session engine
* behavioral intelligence layer
* hesitation detection engine
* recovery opportunity engine
* recovery opportunity deduplication
* merchant recovery feed
* orchestration demo pipeline

Current working behavioral flow:

Shopify Event
→ Event Bus
→ Session Context
→ Hesitation Detection
→ Recovery Opportunity
→ Merchant Feed

Current architecture principles:

* event-driven architecture
* domain ownership
* centralized behavioral state
* workflow isolation
* orchestration-first infrastructure
* adaptive recovery systems
* deterministic processing

Current frontend stack:

* React
* TypeScript
* Vite

Planned infrastructure:

* PostgreSQL
* Redis
* Kafka or Redpanda
* ClickHouse
* worker orchestration runtime

Current project structure:

src/features/

commerce/
events/
intelligence/
recovery/
workflows/
shared/

Current implemented domains:

Events:

* event.types.ts
* event-bus.ts

Commerce:

* session.types.ts
* session-store.ts

Intelligence:

* behavior-signal.types.ts
* hesitation-detector.ts

Recovery:

* recovery-opportunity.types.ts
* recovery-opportunity-engine.ts
* RecoveryOpportunityFeed.tsx

Shared:

* demo-pipeline.ts

Current system capabilities:

* event publishing
* event subscriptions
* canonical behavioral session tracking
* timeline reconstruction
* hesitation detection
* recovery opportunity generation
* merchant recovery feed rendering

Current UI:

* dark-mode recovery feed
* simulated shopper recovery opportunity
* end-to-end orchestration working

Critical lessons already learned:

* React StrictMode caused duplicate event execution
* singleton event orchestration caused replay duplication
* all event systems must be idempotent
* orchestration systems require replay safety

Current technical debt:

* no persistence layer
* no workflow runtime
* no recovery lifecycle state machine
* no intervention orchestration
* no revenue attribution
* no deterministic replay infrastructure

Immediate next priorities:

1. recovery state machine
2. intervention domain
3. workflow runtime
4. recovery scoring engine
5. intervention selector
6. revenue attribution
7. deterministic event replay system

Strategic direction:
We are NOT building:

* chatbot UI
* analytics dashboards
* settings-heavy systems
* generic Shopify automation tooling

We ARE building:
behavioral commerce infrastructure.

The moat is:

* behavioral intelligence
* adaptive recovery orchestration
* proprietary recovery intelligence loops
* intervention optimization infrastructure

Act as:

* senior SaaS systems architect
* Shopify platform strategist
* AI systems architect
* startup CTO

Focus on:

* scalable architecture
* behavioral intelligence systems
* orchestration infrastructure
* recovery systems
* merchant ROI
* operational simplicity
* long-term defensibility
* event-driven design

Continue from this exact system state without resetting context.
