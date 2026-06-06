/*
PHASE 7D

Defines deterministic model routing contracts.

This layer does NOT:

- Select providers
- Execute prompts
- Call APIs

This layer only describes the capabilities
required by orchestration tasks.

Replay Safe
Serializable
Provider Agnostic
*/

export type RoutingProfile =
  | "classification"
  | "reasoning"
  | "summarization"
  | "content_generation";

export interface RoutingRequest {
  taskId: string;

  taskType: string;

  profile: RoutingProfile;
}

export interface RoutingDecision {
  taskId: string;

  profile: RoutingProfile;
}