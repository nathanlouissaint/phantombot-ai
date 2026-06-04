We are continuing work on PhantomBot AI.

Project: PhantomBot AI
Branch: architecture/core-system
Current phase: Phase 4B Final Verification — Runtime Failure Simulation

We are not building a chatbot, Shopify plugin, or GPT wrapper. We are building deterministic AI commerce infrastructure: Stripe + Datadog + OpenAI for commerce operations.

Current architecture:

ReplayExecutionRuntime
-> owns replay execution lifecycle

processReplayBatch
-> owns deterministic replay progression

ProjectionRuntime
-> owns runtime/repository contract translation only

Repositories
-> own persistence semantics and SQL

Database
-> owns durability and transactions

ReplayRecovery
-> owns deterministic recovery planning

ReplayRestartCoordinator
-> owns restart authority from recovery plans

Critical invariants:

* No SQL inside runtime
* No PoolClient inside runtime
* No pg ownership inside runtime
* Runtime consumes repositories only
* Replay remains sequential
* Checkpoint advancement remains atomic
* Lease ownership must match replay ownership
* Recovery must remain deterministic
* Correctness over throughput
* Determinism over scale
* Recovery over features

Recent completed work:

* Removed runtime SQL ownership from projection-runtime.ts
* Moved behavior_events replay loading into behaviorEventRepository
* Added checkpoint resume support to ReplayExecutionRuntime
* Added optional lease ownership verification hook to ReplayExecutionRuntime
* Added ReplayRecoveryPlan and ReplayRecoveryReason types
* Implemented ReplayRecovery
* Implemented ReplayRestartCoordinator
* Added Vitest
* Added tests for recovery planning, restart blocking, and runtime state transitions
* Full uncached typecheck passes
* Runtime tests pass: 3 files, 5 tests

Current verified commands:

pnpm turbo run typecheck --force
pnpm --filter @phantombot/runtime test

Current status:

Phase 4B architecture: complete
Phase 4B verification: in progress
Estimated completion: 98%

Next goal:

Build final Phase 4B failure verification before entering Phase 5.

Focus areas:

1. Failure simulation tests
2. Lease-loss behavior
3. Restart-from-checkpoint verification
4. Zombie replay prevention
5. Runtime interruption correctness
6. Optional RECOVERING runtime state

Do not write product features. Do not start Behavioral Intelligence yet. Audit first, then implement deterministic failure verification.

Start by asking me for the latest file contents of:

packages/runtime/src/workers/runtime/replay-execution-runtime.ts
packages/runtime/src/workers/runtime/replay-runtime-state.ts
packages/runtime/src/workers/runtime/replay-runtime-transition-map.ts
packages/runtime/src/workers/runtime/replay-runtime.types.ts
packages/runtime/src/recovery/replay-recovery.ts
packages/runtime/src/recovery/replay-recovery.types.ts
packages/runtime/src/recovery/replay-restart-coordinator.ts
packages/runtime/src/replay/process-replay-batch.ts
packages/runtime/src/recovery/**tests**/replay-recovery.test.ts
packages/runtime/src/recovery/**tests**/replay-restart-coordinator.test.ts
packages/runtime/src/workers/runtime/**tests**/replay-runtime-state.test.ts


