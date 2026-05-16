// Lightweight event bus abstraction until Kafka/Redpanda infrastructure is introduced.

import type {
  PhantomEvent,
  PhantomEventType,
} from "../domain/event.types";

type EventHandler = (event: PhantomEvent) => void;

const handlers = new Map<PhantomEventType, EventHandler[]>();

export function subscribeToEvent(
  type: PhantomEventType,
  handler: EventHandler
) {
  const currentHandlers = handlers.get(type) ?? [];

  handlers.set(type, [...currentHandlers, handler]);
}

export function publishEvent(event: PhantomEvent) {
  const subscribers = handlers.get(event.type) ?? [];

  subscribers.forEach((handler) => handler(event));
}