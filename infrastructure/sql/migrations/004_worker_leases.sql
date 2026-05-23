-- =====================================================
-- worker_leases
--
-- Responsibility:
-- Provide deterministic distributed worker ownership.
--
-- Owns:
-- - worker lease ownership
-- - projection ownership coordination
-- - lease expiration tracking
-- - distributed worker failover
-- - heartbeat ownership validation
--
-- Does NOT Own:
-- - projection mutations
-- - checkpoint progression
-- - event persistence
-- - replay orchestration
-- =====================================================

CREATE TABLE IF NOT EXISTS worker_leases (
    projection_name TEXT PRIMARY KEY,

    worker_id TEXT NOT NULL,

    lease_expires_at TIMESTAMPTZ NOT NULL,

    heartbeat_at TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_worker_leases_worker
ON worker_leases(worker_id);

CREATE INDEX IF NOT EXISTS idx_worker_leases_expiration
ON worker_leases(lease_expires_at);