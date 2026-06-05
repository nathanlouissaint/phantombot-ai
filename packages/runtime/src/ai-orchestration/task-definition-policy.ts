/**
 * task-definition-policy.ts
 *
 * Responsibility:
 * Map deterministic task types
 * to deterministic objectives.
 *
 * Does NOT Own:
 * - providers
 * - prompts
 * - execution
 */

export function determineObjective(
  taskType: string,
): string {
  switch (taskType) {
    case "recovery":
      return "recover_customer";

    case "conversion":
      return "advance_conversion";

    case "upsell":
      return "increase_order_value";

    case "retention":
      return "increase_retention";

    default:
      return "unknown";
  }
}