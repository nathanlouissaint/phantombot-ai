/**
 * index.ts
 *
 * Responsibility:
 * Expose public contract exports for the PhantomBotAI platform.
 *
 * Owns:
 * - public type exports
 * - stable package-level contract boundaries
 *
 * Does NOT Own:
 * - runtime logic
 * - database logic
 * - projection mutation
 * - Shopify API integration
 */

export * from "./commerce/commerce-event.types";
export * from "./commerce/shopper-session.types";
export * from "./commerce/hesitation.types";
export * from "./commerce/recovery-opportunity.types";