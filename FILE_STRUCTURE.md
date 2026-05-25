.
├── app
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── features
│   │   │   ├── commerce
│   │   │   │   ├── domain
│   │   │   │   │   └── session.types.ts
│   │   │   │   └── services
│   │   │   │       └── session-store.ts
│   │   │   ├── events
│   │   │   │   ├── domain
│   │   │   │   │   └── event.types.ts
│   │   │   │   ├── services
│   │   │   │   │   └── event-bus.ts
│   │   │   │   └── utils
│   │   │   │       └── event-replay.ts
│   │   │   ├── intelligence
│   │   │   │   ├── domain
│   │   │   │   │   └── behavior-signal.types.ts
│   │   │   │   └── services
│   │   │   │       ├── hesitation-detector.ts
│   │   │   │       ├── intervention-selector.ts
│   │   │   │       └── recovery-score-engine.ts
│   │   │   ├── recovery
│   │   │   │   ├── components
│   │   │   │   │   └── RecoveryOpportunityFeed.tsx
│   │   │   │   ├── domain
│   │   │   │   │   ├── intervention.types.ts
│   │   │   │   │   ├── recovery-opportunity.types.ts
│   │   │   │   │   └── recovery-state-machine.ts
│   │   │   │   └── services
│   │   │   │       ├── intervention-engine.ts
│   │   │   │       ├── recovery-opportunity-engine.ts
│   │   │   │       └── revenue-attribution.ts
│   │   │   ├── shared
│   │   │   │   ├── config
│   │   │   │   │   └── recovery.config.ts
│   │   │   │   └── demo-pipeline.ts
│   │   │   └── workflows
│   │   │       ├── domain
│   │   │       │   └── workflow.types.ts
│   │   │       └── services
│   │   │           ├── workflow-orchestrator.ts
│   │   │           └── workflow-runtime.ts
│   │   ├── index.css
│   │   └── main.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── docs
│   ├── cloud-architecture.md
│   ├── current.state.md
│   ├── go-to-market.md
│   ├── Gpt-Prompt.md
│   ├── linkedin-content-plan.md
│   ├── marketing-angles.md
│   ├── mvp-roadmap.md
│   ├── pricing-strategy.md
│   ├── product-strategy.md
│   ├── shopify-strategy.md
│   └── system-design.md
├── FILE_STRUCTURE.md
├── README.md
└── src
    └── features
        └── commerce
            ├── domain
            │   └── session.types.ts
            └── services
                └── session-store.ts

31 directories, 54 files
