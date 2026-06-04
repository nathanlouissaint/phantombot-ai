-- =====================================================
-- projection namespaces
--
-- Responsibility:
-- Add namespace isolation to projection state.
--
-- Owns:
-- - live projection isolation
-- - replay projection isolation
-- - experimental projection isolation
-- - deterministic replay validation foundation
--
-- Does NOT Own:
-- - projection mutation logic
-- - checkpoint ownership
-- - event ingestion
-- - worker leases
-- =====================================================

ALTER TABLE behavior_sessions
ADD COLUMN IF NOT EXISTS projection_namespace TEXT NOT NULL DEFAULT 'live';

DROP INDEX IF EXISTS behavior_sessions_pkey;

ALTER TABLE behavior_sessions
DROP CONSTRAINT IF EXISTS behavior_sessions_pkey;

ALTER TABLE behavior_sessions
ADD CONSTRAINT behavior_sessions_pkey
PRIMARY KEY (
    projection_namespace,
    session_id
);

CREATE INDEX IF NOT EXISTS idx_behavior_sessions_namespace
ON behavior_sessions(projection_namespace);

CREATE INDEX IF NOT EXISTS idx_behavior_sessions_namespace_shop
ON behavior_sessions(projection_namespace, shop_id);

CREATE INDEX IF NOT EXISTS idx_behavior_sessions_namespace_activity
ON behavior_sessions(projection_namespace, last_activity_at);