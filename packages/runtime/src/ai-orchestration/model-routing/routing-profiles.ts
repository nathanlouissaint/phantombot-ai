/*
PHASE 7D

Central registry of routing profiles.

Profiles describe capability requirements.

Profiles do NOT describe providers.

Example:

content_generation
    !=
OpenAI

reasoning
    !=
Anthropic
*/

import type { RoutingProfile } from "./routing.types";

export const ROUTING_PROFILES: Record<string, RoutingProfile> = {
  GENERATE_EMAIL: "content_generation",

  GENERATE_SMS: "content_generation",

  SUMMARIZE_SESSION: "summarization",

  CLASSIFY_INTENT: "classification",

  ANALYZE_CONTEXT: "reasoning",
};