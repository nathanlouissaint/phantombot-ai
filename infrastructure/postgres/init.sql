CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS behavior_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    event_id VARCHAR(255) UNIQUE NOT NULL,
    shop_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) NOT NULL,

    event_type VARCHAR(255) NOT NULL,
    event_version INTEGER NOT NULL DEFAULT 1,

    payload JSONB NOT NULL,

    source VARCHAR(255) NOT NULL,
    checksum VARCHAR(255),

    occurred_at TIMESTAMP NOT NULL,
    ingested_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_behavior_events_shop_id
ON behavior_events(shop_id);

CREATE INDEX idx_behavior_events_session_id
ON behavior_events(session_id);

CREATE INDEX idx_behavior_events_event_type
ON behavior_events(event_type);

CREATE INDEX idx_behavior_events_occurred_at
ON behavior_events(occurred_at);