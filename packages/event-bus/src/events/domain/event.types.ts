// Canonical event schema powering all commerce behavior and recovery infrastructure.

export type EventSource =
  | "shopify"
  | "storefront"
  | "workflow"
  | "system";

export type CommerceEventType =
  | "shopper.page_viewed"
  | "shopper.product_viewed"
  | "shopper.cart_updated"
  | "shopper.checkout_started"
  | "shopper.checkout_abandoned";

export type BehaviorEventType =
  | "behavior.hesitation_detected"
  | "behavior.intent_increased"
  | "behavior.trust_degraded";

export type RecoveryEventType =
  | "recovery.opportunity_created"
  | "recovery.workflow_triggered"
  | "recovery.intervention_rendered"
  | "recovery.revenue_recovered";

export type PhantomEventType =
  | CommerceEventType
  | BehaviorEventType
  | RecoveryEventType;

export type PhantomEvent<TPayload = Record<string, unknown>> = {
  id: string;
  shopId: string;
  sessionId: string;
  type: PhantomEventType;
  source: EventSource;
  timestamp: string;
  payload: TPayload;
  metadata?: Record<string, unknown>;
};