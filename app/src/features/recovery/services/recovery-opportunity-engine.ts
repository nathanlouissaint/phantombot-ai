// Converts behavioral intelligence into merchant revenue recovery opportunities.
// Includes opportunity deduplication and lifecycle protection.

import { v4 as uuid } from "uuid";

import type { CommerceSession } from "../../commerce/domain/session.types";

import type { BehaviorSignal } from "../../intelligence/domain/behavior-signal.types";

import type { RecoveryOpportunity } from "../domain/recovery-opportunity.types";

const opportunities: RecoveryOpportunity[] = [];

export function createRecoveryOpportunity(
  session: CommerceSession,
  signal: BehaviorSignal
): RecoveryOpportunity {
  const existingOpportunity = opportunities.find(
    (opportunity) =>
      opportunity.sessionId === session.id &&
      opportunity.status === "open"
  );

  if (existingOpportunity) {
    return existingOpportunity;
  }

  const opportunity: RecoveryOpportunity = {
    id: uuid(),

    shopId: session.shopId,

    sessionId: session.id,

    signalId: signal.id,

    title: `$${session.commerce.cartValue} revenue at risk`,

    description: signal.reason,

    estimatedRevenueAtRisk:
      session.commerce.cartValue,

    priority:
      session.commerce.cartValue >= 200
        ? "high"
        : "medium",

    status: "open",

    createdAt: new Date().toISOString(),
  };

  opportunities.unshift(opportunity);

  return opportunity;
}

export function getRecoveryOpportunities() {
  return opportunities;
}