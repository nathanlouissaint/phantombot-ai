/**
 * session-intelligence.projection.test.ts
 *
 * Responsibility:
 * Verify projection determinism.
 *
 * Owns:
 * - projection initialization verification
 * - deterministic initialization verification
 *
 * Does NOT Own:
 * - runtime orchestration
 * - persistence
 */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  SessionIntelligenceProjection,
} from "../session-intelligence.projection";

describe(
  "SessionIntelligenceProjection",
  () => {
    it(
      "creates deterministic initial state",
      () => {
        const projection =
          new SessionIntelligenceProjection();

        const state =
          projection.createInitialState({
            shopId:
              "shop_1",

            sessionId:
              "session_1",

            startedAt:
              "2026-01-01T00:00:00.000Z",
          });

        expect(
          state.startedAt
        ).toBe(
          "2026-01-01T00:00:00.000Z"
        );

        expect(
          state.lastActivityAt
        ).toBe(
          "2026-01-01T00:00:00.000Z"
        );
      }
    );
  }
);