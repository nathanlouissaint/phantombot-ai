-- =====================================================
-- projection_applied_events
--
-- Responsibility:
-- Guarantees replay-safe idempotent projection processing.
--
-- Owns:
-- - projection event application tracking
-- - replay duplication prevention
-- - deterministic projection guarantees
-- - projection idempotency enforcement
--
-- Does NOT Own:
-- - projection state
-- - event persistence
-- - checkpoint ownership
-- - runtime orchestration
-- =====================================================

CREATE TABLE IF NOT EXISTS projection_applied_events (
    projection_name TEXT NOT NULL,
    event_sequence_id BIGINT NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (
        projection_name,
        event_sequence_id
    )
);

CREATE INDEX IF NOT EXISTS idx_projection_applied_events_projection
ON projection_applied_events (projection_name);

CREATE INDEX IF NOT EXISTS idx_projection_applied_events_sequence
ON projection_applied_events (event_sequence_id);