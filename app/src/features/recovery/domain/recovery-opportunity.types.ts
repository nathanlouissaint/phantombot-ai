// Revenue recovery opportunities surfaced to merchants.

export type RecoveryOpportunityStatus =
  | "open"
  | "in_progress"
  | "recovered"
  | "dismissed"
  | "expired";

export type RecoveryOpportunity = {
  id: string;

  shopId: string;

  sessionId: string;

  signalId: string;

  title: string;

  description: string;

  estimatedRevenueAtRisk: number;

  priority: "low" | "medium" | "high";

  status: RecoveryOpportunityStatus;

  createdAt: string;
};