# PHANTOMBOT AI — PHASE 3D CONTINUATION PROMPT

We are continuing the ONEMOGO / PhantomBot AI infrastructure build.

Current branch:

```txt
architecture/core-system
```

We just completed:

# Phase 3C — Deterministic Ingestion Foundation

Major completed work:

- Added deterministic replay-safe sequencing using:

```sql
sequence_id BIGSERIAL PRIMARY KEY
```

- Introduced canonical ingestion contracts:

```txt
packages/contracts/src/runtime/ingestion-event.types.ts
```

with:
- IngestionEventInput
- PersistedBehaviorEvent

- Removed ingestion schema drift:
  - removed `event_name`
  - standardized `eventType`

- Created canonical persistence repository:

```txt
packages/database/src/repositories/behavior-event.repository.ts
```

- Removed app-owned infrastructure:
  - deleted ingestion-api/src/lib/postgres.ts
  - deleted ingestion-api/src/lib/redis.ts

- Refactored ingestion-api into:
  - HTTP composition only
  - validation only
  - infrastructure orchestration only

- Implemented real monorepo TypeScript architecture:
  - project references
  - composite builds
  - root tsconfig.json
  - compiler-enforced package ownership

- Verified:
  - `pnpm tsc -b`
  - `pnpm turbo run typecheck`

both pass successfully.

---

# Current Architecture

Current layering:

```txt
contracts
    ↓
database
    ↓
runtime
    ↓
workers/apps
```

System is now:
- replay-safe
- deterministically ordered
- compiler-enforced
- repository-driven
- infrastructure-layered

---

# CRITICAL REMAINING VIOLATION

Runtime still imports:

```ts
import { PoolClient } from "pg";
```

inside:

```txt
packages/runtime/src/projection-runtime.ts
packages/runtime/src/idempotency/projection-idempotency.service.ts
```

This violates deterministic infrastructure ownership.

Runtime must NOT own:
- pg
- PoolClient
- raw SQL drivers
- infrastructure primitives

---

# NEXT PHASE

# Phase 3D — Runtime Infrastructure Isolation

Objectives:

## 1. Remove PostgreSQL Awareness From Runtime

Move:
- transaction ownership
- transaction orchestration
- client lifecycle

into:
- @phantombot/database

Runtime should consume:
- transaction abstractions
- deterministic repositories
- execution boundaries only

---

## 2. Introduce Canonical Transaction Interfaces

Need abstractions for:
- replay transactions
- projection transactions
- checkpoint advancement
- idempotency writes

Likely files:

```txt
packages/database/src/transactions/
packages/database/src/repositories/
```

---

## 3. Refactor Runtime Services

Targets:

```txt
packages/runtime/src/projection-runtime.ts
packages/runtime/src/idempotency/projection-idempotency.service.ts
packages/runtime/src/dead-letter/dead-letter.service.ts
```

Goal:
- remove PoolClient imports entirely
- replace with deterministic repository interfaces

---

# IMPORTANT ARCHITECTURE RULES

Critical constraints:

- projections remain deterministic
- runtime remains side-effect free
- runtime must not own infrastructure
- repositories own persistence semantics
- database package owns transactions
- apps compose infrastructure only

---

# BEFORE WRITING CODE

First inspect:

```bash
sed -n '1,320p' packages/runtime/src/projection-runtime.ts

sed -n '1,260p' packages/runtime/src/idempotency/projection-idempotency.service.ts

sed -n '1,260p' packages/database/src/transactions.ts

tree packages/database/src -L 4
```

Need a full transaction ownership audit before introducing runtime abstraction boundaries.

Continue from there.