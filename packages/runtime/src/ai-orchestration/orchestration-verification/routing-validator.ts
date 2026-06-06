/*
PHASE 7E

Validates:

ExecutionContext
↓
RoutingDecision

Detects:

- Missing context references
- Orphan routes
*/

export interface RoutingReference {
  routeId: string;
  contextId: string;
}

export function validateRouting(
  contextIds: string[],
  routes: RoutingReference[]
): string[] {
  const violations: string[] = [];

  for (const route of routes) {
    if (!contextIds.includes(route.contextId)) {
      violations.push(
        `Route ${route.routeId} references missing context ${route.contextId}`
      );
    }
  }

  return violations;
}