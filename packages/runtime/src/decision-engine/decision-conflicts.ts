import type {
  Decision,
} from "./decision.types";

const priorityRank = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
} as const;

const categoryRank = {
  recovery: 4,
  retention: 3,
  conversion: 2,
  upsell: 1,
} as const;

export function resolveDecisionConflicts(
  decisions: Decision[],
): Decision[] {
  const sorted =
    [...decisions].sort(
      (left, right) => {
        const priorityDelta =
          priorityRank[right.priority] -
          priorityRank[left.priority];

        if (priorityDelta !== 0) {
          return priorityDelta;
        }

        const categoryDelta =
          categoryRank[right.category] -
          categoryRank[left.category];

        if (categoryDelta !== 0) {
          return categoryDelta;
        }

        return left.id.localeCompare(right.id);
      },
    );

  const hasCriticalRecovery =
    sorted.some(
      decision =>
        decision.category === "recovery" &&
        decision.priority === "critical",
    );

  if (!hasCriticalRecovery) {
    return sorted;
  }

  return sorted.filter(
    decision =>
      decision.category !== "upsell",
  );
}
