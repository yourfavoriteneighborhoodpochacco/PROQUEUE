CREATE TABLE IF NOT EXISTS players (
  puuid         TEXT PRIMARY KEY,
  game_name     TEXT NOT NULL,
  tag_line      TEXT NOT NULL,
  region        TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS matches (
  match_id        TEXT PRIMARY KEY,
  map_id          TEXT NOT NULL,
  game_mode       TEXT NOT NULL,
  game_length_ms  BIGINT NOT NULL,
  game_start_ms   BIGINT NOT NULL,
  region          TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS player_match_results (
  match_id            TEXT NOT NULL REFERENCES matches(match_id),
  puuid               TEXT NOT NULL REFERENCES players(puuid),
  team_id             TEXT NOT NULL,
  outcome             TEXT NOT NULL,
  agent_id            TEXT NOT NULL,
  kills               INT NOT NULL,
  deaths              INT NOT NULL,
  assists             INT NOT NULL,
  score               INT NOT NULL,
  impact_raw          NUMERIC,
  impact_normalized   NUMERIC,
  impact_breakdown    JSONB,
  PRIMARY KEY (match_id, puuid)
);

CREATE TABLE IF NOT EXISTS round_events (
  id              SERIAL PRIMARY KEY,
  match_id        TEXT NOT NULL REFERENCES matches(match_id),
  round_number    INT NOT NULL,
  round_phase     TEXT NOT NULL,
  event_type      TEXT NOT NULL,
  actor_puuid     TEXT NOT NULL,
  target_puuid    TEXT,
  timestamp_ms    BIGINT NOT NULL,
  metadata        JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_player_match_results_puuid
  ON player_match_results(puuid);

CREATE INDEX IF NOT EXISTS idx_round_events_match_id
  ON round_events(match_id);

CREATE INDEX IF NOT EXISTS idx_round_events_actor
  ON round_events(actor_puuid);