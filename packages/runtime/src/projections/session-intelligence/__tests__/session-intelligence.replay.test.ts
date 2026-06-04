/**
 * session-intelligence.replay.test.ts
 *
 * Responsibility:
 * Verify deterministic replay reconstruction.
 *
 * Owns:
 * - replay determinism verification
 * - state reconstruction verification
 * - behavioral intelligence replay safety
 *
 * Does NOT Own:
 * - runtime orchestration
 * - persistence
 * - checkpoint coordination
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
  "SessionIntelligenceReplay",
  () => {
    it(
      "reconstructs identical state from identical event stream",
      () => {
        const projection =
          new SessionIntelligenceProjection();

        const events = [
          {
            eventType:
              "PRODUCT_VIEWED",

            occurredAt:
              "2026-01-01T01:00:00.000Z",

            payload: {},
          },

          {
            eventType:
              "PRODUCT_ADDED_TO_CART",

            occurredAt:
              "2026-01-01T01:05:00.000Z",

            payload: {},
          },

          {
            eventType:
              "CHECKOUT_STARTED",

            occurredAt:
              "2026-01-01T01:10:00.000Z",

            payload: {},
          },

          {
            eventType:
              "CHECKOUT_HESITATED",

            occurredAt:
              "2026-01-01T01:15:00.000Z",

            payload: {},
          },
        ];

        const runReplay = () => {
          let state =
            projection.createInitialState({
              shopId:
                "shop_1",

              sessionId:
                "session_1",

              startedAt:
                "2026-01-01T00:00:00.000Z",
            });

          for (
            const event of events
          ) {
            state =
              projection.process(
                state,
                {
                  ...event,

                  shopId:
                    "shop_1",

                  sessionId:
                    "session_1",
                } as any
              );
          }

          return state;
        };

        const firstRun =
          runReplay();

        const secondRun =
          runReplay();

        expect(
          firstRun
        ).toEqual(
          secondRun
        );
      }
    );
  }
);