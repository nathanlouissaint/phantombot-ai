/*
PHASE 7F

Provider adapter utilities.

Provides deterministic validation
around provider adapter contracts.

No provider implementations.
*/

import type {
  ProviderAdapter,
  ProviderRequest,
} from "./provider.types";

export async function executeAdapter(
  adapter: ProviderAdapter,
  request: ProviderRequest
) {
  return adapter.execute(request);
}