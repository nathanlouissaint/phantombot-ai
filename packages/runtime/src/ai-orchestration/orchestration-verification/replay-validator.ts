/*
PHASE 7E

Replay verification.

Same Inputs
↓
Same Outputs
*/

export function validateReplay(
  first: unknown,
  second: unknown
): string[] {
  const violations: string[] = [];

  if (JSON.stringify(first) !== JSON.stringify(second)) {
    violations.push(
      "Replay verification failed"
    );
  }

  return violations;
}