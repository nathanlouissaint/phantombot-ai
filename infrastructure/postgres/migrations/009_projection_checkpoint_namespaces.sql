-- =====================================================
-- projection checkpoint namespaces
--
-- Responsibility:
-- Add namespace isolation to projection checkpoints.
--
-- Owns:
-- - replay checkpoint isolation
-- - namespace-aware progression tracking
-- - deterministic replay separation
-- - concurrent replay safety
--
-- Does NOT Own:
-- - projection mutations
-- - event persistence
-- - runtime orchestration
-- =====================================================

ALTER TABLE projection_checkpoints
ADD COLUMN IF NOT EXISTS projection_namespace
TEXT NOT NULL DEFAULT 'live';

DROP INDEX IF EXISTS idx_projection_checkpoints_name;

ALTER TABLE projection_checkpoints
DROP CONSTRAINT IF EXISTS projection_checkpoints_pkey;

ALTER TABLE projection_checkpoints
ADD CONSTRAINT projection_checkpoints_pkey
PRIMARY KEY (
    projection_name,
    projection_namespace
);

CREATE INDEX IF NOT EXISTS idx_projection_checkpoints_namespace
ON projection_checkpoints(projection_namespace);

CREATE INDEX IF NOT EXISTS idx_projection_checkpoints_projection_namespace
ON projection_checkpoints(
    projection_name,
    projection_namespace
);