/*
PHASE 7F

Provider validation.

Detects:

- Unknown providers
- Missing task identifiers
*/

import { PROVIDER_REGISTRY } from "./provider-registry";

import type {
  ProviderRequest,
} from "./provider.types";

export function validateProviderRequest(
  request: ProviderRequest
): string[] {
  const violations: string[] = [];

  if (!request.taskId) {
    violations.push(
      "Missing task id"
    );
  }

  if (
    !PROVIDER_REGISTRY[request.provider]
  ) {
    violations.push(
      `Unknown provider: ${request.provider}`
    );
  }

  return violations;
}