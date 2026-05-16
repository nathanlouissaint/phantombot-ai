// Normalized behavioral signals generated from shopper activity.

export type BehaviorSignalType =
  | "hesitation"
  | "trust_breakdown"
  | "purchase_intent"
  | "comparison_behavior";

export type BehaviorSignal = {
  id: string;

  shopId: string;

  sessionId: string;

  type: BehaviorSignalType;

  confidence: number;

  reason: string;

  contributingEventIds: string[];

  createdAt: string;
};