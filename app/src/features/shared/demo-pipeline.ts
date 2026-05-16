// Connects event ingestion, session context, hesitation detection,
// and recovery opportunity creation.

import { v4 as uuid } from "uuid";

import type { PhantomEvent } from "../events/domain/event.types";

import {
  publishEvent,
  subscribeToEvent,
} from "../events/services/event-bus";

import {
  updateSessionFromEvent,
} from "../commerce/services/session-store";

import {
  detectHesitation,
} from "../intelligence/services/hesitation-detector";

import {
  createRecoveryOpportunity,
  getRecoveryOpportunities,
} from "../recovery/services/recovery-opportunity-engine";

let pipelineBootstrapped = false;

export function bootstrapDemoPipeline() {
  if (pipelineBootstrapped) {
    return;
  }

  pipelineBootstrapped = true;

  subscribeToEvent(
    "shopper.product_viewed",
    handleCommerceEvent
  );

  subscribeToEvent(
    "shopper.cart_updated",
    handleCommerceEvent
  );

  subscribeToEvent(
    "shopper.checkout_started",
    handleCommerceEvent
  );
}

function handleCommerceEvent(event: PhantomEvent) {
  const session =
    updateSessionFromEvent(event);

  const signal =
    detectHesitation(session);

  if (!signal) {
    return;
  }

  createRecoveryOpportunity(
    session,
    signal
  );
}

export function simulateShopifySession() {
  const shopId = "demo-shop";

  const sessionId = uuid();

  const events: PhantomEvent[] = [
    {
      id: uuid(),
      shopId,
      sessionId,
      type: "shopper.product_viewed",
      source: "shopify",
      timestamp: new Date().toISOString(),
      payload: {
        productId: "product-1",
      },
    },

    {
      id: uuid(),
      shopId,
      sessionId,
      type: "shopper.cart_updated",
      source: "shopify",
      timestamp: new Date().toISOString(),
      payload: {
        cartValue: 249,
      },
    },

    {
      id: uuid(),
      shopId,
      sessionId,
      type: "shopper.checkout_started",
      source: "shopify",
      timestamp: new Date().toISOString(),
      payload: {},
    },
  ];

  events.forEach(publishEvent);

  return getRecoveryOpportunities();
}