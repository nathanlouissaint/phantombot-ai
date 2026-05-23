/**
 * shopper-session.types.ts
 *
 * Responsibility:
 * Define deterministic shopper session intelligence state.
 *
 * Owns:
 * - session state shape
 * - accumulated behavioral counters
 * - intelligence summary fields
 *
 * Does NOT Own:
 * - mutation logic
 * - event processing
 * - database persistence
 * - AI generation
 */

export type PurchaseIntentLevel = "unknown" | "low" | "medium" | "high";

export type ShopperFrictionType =
  | "none"
  | "price"
  | "trust"
  | "shipping"
  | "payment"
  | "decision"
  | "unknown";

export interface ShopperSessionState {
  shopId: string;
  sessionId: string;

  customerId?: string;
  cartId?: string;
  checkoutId?: string;

  startedAt: string;
  lastActivityAt: string;

  productViewCount: number;
  addToCartCount: number;
  removeFromCartCount: number;
  cartUpdateCount: number;
  checkoutStartCount: number;
  hesitationSignalCount: number;

  currentCartValue: number;
  currentCartItemCount: number;
  currency?: string;

  purchaseIntent: PurchaseIntentLevel;
  primaryFrictionType: ShopperFrictionType;
  hesitationScore: number;

  converted: boolean;
  abandoned: boolean;
}