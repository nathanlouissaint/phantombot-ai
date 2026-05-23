/**
 * commerce-event.types.ts
 *
 * Responsibility:
 * Define canonical commerce event contracts used across the platform.
 *
 * Owns:
 * - shopper behavior event names
 * - canonical event envelope shape
 * - event payload contracts
 * - tenant/shop isolation fields
 *
 * Does NOT Own:
 * - event persistence
 * - webhook handling
 * - queue publishing
 * - projection processing
 * - recovery decisions
 */

export type CommerceEventType =
  | "SHOPPER_SESSION_STARTED"
  | "PRODUCT_VIEWED"
  | "PRODUCT_ADDED_TO_CART"
  | "PRODUCT_REMOVED_FROM_CART"
  | "CART_UPDATED"
  | "CHECKOUT_STARTED"
  | "CHECKOUT_HESITATED"
  | "CHECKOUT_ABANDONED"
  | "ORDER_CREATED"
  | "CUSTOMER_CREATED"
  | "RECOVERY_OPPORTUNITY_CREATED"
  | "RECOVERY_INTERVENTION_SENT"
  | "RECOVERY_CONVERTED";

export type CommerceEventSource =
  | "shopify_webhook"
  | "storefront_signal"
  | "runtime_projection"
  | "recovery_engine"
  | "automation_engine";

export interface CommerceEventEnvelope<TPayload = unknown> {
  eventId: string;
  eventType: CommerceEventType;
  source: CommerceEventSource;

  shopId: string;
  customerId?: string;
  sessionId?: string;
  cartId?: string;
  checkoutId?: string;
  orderId?: string;

  occurredAt: string;
  receivedAt: string;

  schemaVersion: number;
  payload: TPayload;
}

export interface ShopperSessionStartedPayload {
  sessionId: string;
  anonymousId?: string;
  customerId?: string;
  landingPage?: string;
  referrer?: string;
  userAgent?: string;
}

export interface ProductViewedPayload {
  productId: string;
  variantId?: string;
  productTitle?: string;
  price?: number;
  currency?: string;
}

export interface ProductAddedToCartPayload {
  productId: string;
  variantId?: string;
  quantity: number;
  price?: number;
  currency?: string;
}

export interface ProductRemovedFromCartPayload {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface CartUpdatedPayload {
  cartId: string;
  totalValue: number;
  itemCount: number;
  currency: string;
}

export interface CheckoutStartedPayload {
  checkoutId: string;
  cartId?: string;
  totalValue: number;
  itemCount: number;
  currency: string;
}

export interface CheckoutHesitatedPayload {
  checkoutId: string;
  hesitationReason:
    | "shipping_friction"
    | "payment_friction"
    | "trust_friction"
    | "price_friction"
    | "decision_friction"
    | "unknown";
  signalStrength: number;
}

export interface CheckoutAbandonedPayload {
  checkoutId: string;
  cartId?: string;
  totalValue: number;
  itemCount: number;
  currency: string;
}

export interface OrderCreatedPayload {
  orderId: string;
  checkoutId?: string;
  totalValue: number;
  currency: string;
}

export interface CustomerCreatedPayload {
  customerId: string;
  email?: string;
}

export interface RecoveryOpportunityCreatedPayload {
  opportunityId: string;
  opportunityType: string;
  confidence: number;
  estimatedRevenue: number;
}

export interface RecoveryInterventionSentPayload {
  interventionId: string;
  opportunityId: string;
  channel: "email" | "sms" | "onsite" | "chat" | "merchant_task";
}

export interface RecoveryConvertedPayload {
  opportunityId: string;
  orderId: string;
  recoveredRevenue: number;
  currency: string;
}