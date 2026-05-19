-- =====================================================
-- GLOBAL EVENT SEQUENCING
-- =====================================================

ALTER TABLE behavior_events
ADD COLUMN IF NOT EXISTS sequence_id BIGSERIAL;

CREATE INDEX IF NOT EXISTS idx_behavior_events_sequence
ON behavior_events(sequence_id);

-- =====================================================
-- PROJECTION CHECKPOINTS
-- =====================================================

CREATE TABLE IF NOT EXISTS projection_checkpoints (
    projection_name TEXT PRIMARY KEY,

    last_processed_sequence BIGINT NOT NULL DEFAULT 0,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- SESSION PROJECTIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS behavior_sessions (
    session_id TEXT PRIMARY KEY,

    shop_id TEXT NOT NULL,

    started_at TIMESTAMPTZ,

    last_activity_at TIMESTAMPTZ,

    event_count INTEGER NOT NULL DEFAULT 0,

    cart_state JSONB NOT NULL DEFAULT '{}'::jsonb,

    engagement_state JSONB NOT NULL DEFAULT '{}'::jsonb,

    recovery_state JSONB NOT NULL DEFAULT '{}'::jsonb,

    abandonment_score NUMERIC NOT NULL DEFAULT 0,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_behavior_sessions_shop_id
ON behavior_sessions(shop_id);

CREATE INDEX IF NOT EXISTS idx_behavior_sessions_updated_at
ON behavior_sessions(updated_at);