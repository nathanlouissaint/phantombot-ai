-- =====================================================
-- dead_letter_events
--
-- Responsibility:
-- Provide poison event quarantine infrastructure.
--
-- Owns:
-- - failed projection event isolation
-- - replay diagnostics
-- - retry exhaustion tracking
-- - poison event quarantine
-- - operational recovery tooling
--
-- Does NOT Own:
-- - event persistence
-- - projection mutation
-- - runtime orchestration
-- - checkpoint ownership
-- =====================================================

CREATE TABLE IF NOT EXISTS dead_letter_events (
    id BIGSERIAL PRIMARY KEY,

    projection_name TEXT NOT NULL,

    event_sequence_id BIGINT NOT NULL,

    event_payload JSONB NOT NULL,

    failure_reason TEXT NOT NULL,

    stack_trace TEXT,

    retry_count INTEGER NOT NULL DEFAULT 0,

    quarantined_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dead_letter_projection
ON dead_letter_events(projection_name);

CREATE INDEX IF NOT EXISTS idx_dead_letter_sequence
ON dead_letter_events(event_sequence_id);

CREATE INDEX IF NOT EXISTS idx_dead_letter_quarantined
ON dead_letter_events(quarantined_at);