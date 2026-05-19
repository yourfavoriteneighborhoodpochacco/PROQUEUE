CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    puuid TEXT UNIQUE NOT NULL,
    game_name TEXT NOT NULL,
    tag_line TEXT NOT NULL,
    region TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    match_id TEXT UNIQUE NOT NULL,
    map_id TEXT,
    game_mode TEXT,
    game_length_ms BIGINT,
    game_start_ms BIGINT,
    region TEXT
);

CREATE TABLE player_match_results (
    id SERIAL PRIMARY KEY,
    match_id TEXT REFERENCES matches(match_id),
    puuid TEXT REFERENCES players(puuid),
    team_id TEXT,
    outcome TEXT,
    agent_id TEXT,
    kills INTEGER,
    deaths INTEGER,
    assists INTEGER,
    score INTEGER,
    impact_raw FLOAT,
    impact_normalized FLOAT,
    impact_breakdown JSONB,
    role TEXT,
    UNIQUE(match_id, puuid)
);