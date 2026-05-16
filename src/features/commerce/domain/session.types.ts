// Canonical commerce session model shared across intelligence and recovery systems.

import type { PhantomEvent } from "../../events/domain/event.types";

export type CartItem = {
  productId: string;
  variantId?: string;
  title: string;
  quantity: number;
  price: number;
};

export type CommerceSession = {
  id: string;

  shopId: string;

  shopper: {
    anonymousId?: string;
    customerId?: string;
    email?: string;
    lifecycleStage?: "new" | "returning" | "vip" | "unknown";
  };

  attribution: {
    source?: string;
    campaign?: string;
    referrer?: string;
  };

  commerce: {
    cartValue: number;
    cartItems: CartItem[];
    productViews: string[];
    checkoutStarted: boolean;
  };

  behavior: {
    hesitationScore: number;
    trustScore: number;
    intentScore: number;
    engagementDepth: number;
  };

  timeline: PhantomEvent[];

  updatedAt: string;
};