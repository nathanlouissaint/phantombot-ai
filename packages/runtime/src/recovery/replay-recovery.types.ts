import {
  ProjectionNamespace,
} from "@phantombot/contracts";

export type ReplayRecoveryReason =
  | "NO_CHECKPOINT"
  | "CHECKPOINT_FOUND"
  | "LEASE_NOT_OWNED";

export type ReplayRecoveryPlan = {
  namespace: ProjectionNamespace;

  checkpoint: number;

  canResume: boolean;

  reason: ReplayRecoveryReason;
};