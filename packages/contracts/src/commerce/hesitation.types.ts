/**
 * hesitation.types.ts
 *
 * Responsibility:
 * Define deterministic hesitation analysis contracts.
 *
 * Owns:
 * - hesitation signal types
 * - hesitation analysis result shape
 * - friction classification contracts
 *
 * Does NOT Own:
 * - scoring implementation
 * - recovery workflow generation
 * - AI personalization
 * - merchant UI rendering
 */

import { ShopperFrictionType } from "./shopper-session.types";

export type HesitationSignalType =
  | "repeated_product_views"
  | "cart_value_change"
  | "cart_item_removal"
  | "checkout_idle"
  | "shipping_revisit"
  | "payment_revisit"
  | "coupon_field_interaction"
  | "checkout_exit"
  | "unknown";

export interface HesitationSignal {
  type: HesitationSignalType;
  strength: number;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}

export interface HesitationAnalysis {
  sessionId: string;
  shopId: string;

  score: number;
  primaryFrictionType: ShopperFrictionType;
  signals: HesitationSignal[];

  shouldGenerateRecoveryOpportunity: boolean;
}