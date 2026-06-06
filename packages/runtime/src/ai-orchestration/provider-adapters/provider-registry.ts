/*
PHASE 7F

Provider registry.

Defines supported providers.

No SDK imports.

No runtime execution.
*/

import type { ProviderType } from "./provider.types";

export const PROVIDER_REGISTRY: Record<
  ProviderType,
  ProviderType
> = {
  OPENAI: "OPENAI",

  ANTHROPIC: "ANTHROPIC",

  CUSTOM: "CUSTOM",
};