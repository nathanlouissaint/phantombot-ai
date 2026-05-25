/**
 * recovery-opportunity.types.ts
 *
 * Responsibility:
 * Define recovery opportunity contracts produced by intelligence systems.
 *
 * Owns:
 * - recovery opportunity shape
 * - recovery opportunity types
 * - recommended action contracts
 *
 * Does NOT Own:
 * - workflow scheduling
 * - message delivery
 * - AI copy generation
 * - Shopify checkout mutation
 */

import { ShopperFrictionType } from "./shopper-session.types";

export type RecoveryOpportunityType =
  | "cart_recovery"
  | "checkout_recovery"
  | "trust_recovery"
  | "price_recovery"
  | "shipping_recovery"
  | "payment_recovery";

export type RecoveryActionType =
  | "send_social_proof"
  | "send_discount"
  | "send_shipping_reassurance"
  | "send_payment_reassurance"
  | "send_product_guidance"
  | "create_merchant_task";

export interface RecoveryOpportunity {
  opportunityId: string;

  shopId: string;
  sessionId: string;
  customerId?: string;
  cartId?: string;
  checkoutId?: string;

  type: RecoveryOpportunityType;
  frictionType: ShopperFrictionType;

  confidence: number;
  estimatedRevenue: number;
  currency?: string;

  recommendedAction: RecoveryActionType;

  createdAt: string;
  expiresAt?: string;
}