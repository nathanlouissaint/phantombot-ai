/*
PHASE 7F

Provider adapter contracts.

Defines the boundary between:

Deterministic Runtime
↓
Provider Adapters

No SDK imports.

No API calls.

No provider implementations.
*/

export type ProviderType =
  | "OPENAI"
  | "ANTHROPIC"
  | "CUSTOM";

export interface ProviderRequest {
  taskId: string;

  provider: ProviderType;

  payload: Record<string, unknown>;
}

export interface ProviderResponse {
  taskId: string;

  provider: ProviderType;

  result: Record<string, unknown>;
}

export interface ProviderAdapter {
  readonly provider: ProviderType;

  execute(
    request: ProviderRequest
  ): Promise<ProviderResponse>;
}