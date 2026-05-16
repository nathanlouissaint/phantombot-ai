# Cloud Architecture

## MVP Stack

Frontend:
- Remix
- React
- Tailwind

Backend:
- Node.js

Database:
- PostgreSQL

Queue:
- Redis

Hosting:
- Vercel / Fly.io / Render

Monitoring:
- Sentry
- PostHog

AI:
- OpenAI / OpenRouter

---

# Shopify Infrastructure

## APIs

- Shopify Admin API
- Shopify Storefront API
- Shopify Webhooks

---

# Webhooks

Initial webhook set:

- orders/create
- carts/update
- checkouts/update
- customers/create
- app/uninstalled

---

# Data Flow

Shopify
→ event ingestion
→ intelligence pipeline
→ recovery engine
→ orchestration
→ merchant UI

---

# Long-Term Scale Architecture

Load balancer
→ API layer
→ queue workers
→ orchestration services
→ intelligence services
→ recovery services
→ automation services

---

# Scaling Priorities

Priority 1:
- webhook reliability

Priority 2:
- queue durability

Priority 3:
- event processing speed

Priority 4:
- AI cost optimization

Priority 5:
- tenant isolation