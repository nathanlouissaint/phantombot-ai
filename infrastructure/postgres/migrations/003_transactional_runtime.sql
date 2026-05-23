CREATE UNIQUE INDEX IF NOT EXISTS idx_projection_checkpoints_name
ON projection_checkpoints (projection_name);

CREATE INDEX IF NOT EXISTS idx_behavior_events_sequence
ON behavior_events (sequence_id);
