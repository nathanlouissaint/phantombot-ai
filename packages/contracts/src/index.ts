/**
 * index.ts
 *
 * Responsibility:
 * Export canonical PhantomBotAI contract systems.
 *
 * Owns:
 * - commerce contract exports
 * - projection contract exports
 * - runtime contract exports
 * - namespace contract exports
 *
 * Does NOT Own:
 * - runtime implementation
 * - database implementation
 * - queue infrastructure
 * - Shopify integration logic
 * - AI adaptation logic
 *
 * Critical Rules:
 * - contracts must remain implementation-free
 * - contracts must not import runtime packages
 * - contracts must not perform side effects
 * - all package consumers must import contracts from this package boundary
 */

export * from "./commerce/commerce-event.types";
export * from "./commerce/hesitation.types";
export * from "./commerce/recovery-opportunity.types";
export * from "./commerce/shopper-session.types";

export * from "./projection.types";
export * from "./projection-namespace.types";

export * from "./runtime";