/**
 * provider-boundary-policy.ts
 *
 * Responsibility:
 * Define static provider-boundary enforcement policy.
 *
 * Owns:
 * - forbidden provider-specific names
 * - forbidden provider SDK imports
 * - forbidden execution symbols
 * - deterministic boundary rules
 *
 * Does NOT Own:
 * - filesystem scanning
 * - AST parsing
 * - provider execution
 * - model execution
 *
 * Critical Rules:
 * - policy must remain static
 * - policy must remain deterministic
 * - policy must remain serializable
 */

import type {
  ProviderBoundaryViolationKind,
} from "./provider-boundary.types";

export interface ProviderBoundaryForbiddenPattern {
  kind: ProviderBoundaryViolationKind;

  values: string[];

  reason: string;
}

export const PROVIDER_BOUNDARY_FORBIDDEN_PATTERNS: ProviderBoundaryForbiddenPattern[] = [
  {
    kind: "provider-name-leak",
    values: [
      "OPENAI",
      "ANTHROPIC",
      "CLAUDE",
      "GPT",
      "GEMINI",
      "MISTRAL",
      "COHERE",
    ],
    reason:
      "Provider-specific names cannot leak into deterministic runtime, planning, routing, or capability layers.",
  },
  {
    kind: "provider-sdk-leak",
    values: [
      "@anthropic-ai/sdk",
      "@google/generative-ai",
      "@mistralai/mistralai",
      "cohere-ai",
      "openai",
    ],
    reason:
      "Provider SDK imports are forbidden before the provider adapter boundary.",
  },
  {
    kind: "provider-api-leak",
    values: [
      "chat.completions",
      "messages.create",
      "responses.create",
      "generateContent",
      "completion",
    ],
    reason:
      "Provider API execution cannot happen inside deterministic orchestration layers.",
  },
  {
    kind: "prompt-execution-leak",
    values: [
      "executePrompt",
      "runPrompt",
      "systemPrompt",
      "userPrompt",
      "promptTemplate",
    ],
    reason:
      "Prompt execution belongs outside deterministic planning, routing, and capability layers.",
  },
  {
    kind: "external-call-leak",
    values: [
      "fetch",
      "axios",
      "http.request",
      "https.request",
    ],
    reason:
      "External calls are forbidden inside deterministic runtime layers.",
  },
  {
    kind: "persistence-leak",
    values: [
      "sql",
      "prisma",
      "database",
      "INSERT",
      "UPDATE",
      "DELETE",
      "SELECT",
    ],
    reason:
      "Persistence is forbidden inside deterministic provider-boundary enforcement.",
  },
  {
    kind: "nondeterministic-api-leak",
    values: [
      "Date.now",
      "new Date",
      "Math.random",
      "crypto.randomUUID",
    ],
    reason:
      "Nondeterministic APIs are forbidden inside replay-safe deterministic layers.",
  },
];