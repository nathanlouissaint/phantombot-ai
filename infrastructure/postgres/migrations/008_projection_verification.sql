-- =====================================================
-- projection_verification
--
-- Responsibility:
-- Store deterministic replay verification results.
--
-- Owns:
-- - projection replay hashes
-- - deterministic replay verification
-- - replay audit history
-- - projection correctness validation
--
-- Does NOT Own:
-- - projection mutations
-- - runtime orchestration
-- - replay execution
-- - checkpoint ownership
-- =====================================================

CREATE TABLE IF NOT EXISTS projection_verification (
    id BIGSERIAL PRIMARY KEY,

    projection_name TEXT NOT NULL,

    namespace TEXT NOT NULL,

    projection_hash TEXT NOT NULL,

    verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projection_verification_projection
ON projection_verification(projection_name);

CREATE INDEX IF NOT EXISTS idx_projection_verification_namespace
ON projection_verification(namespace);

CREATE INDEX IF NOT EXISTS idx_projection_verification_verified
ON projection_verification(verified_at);