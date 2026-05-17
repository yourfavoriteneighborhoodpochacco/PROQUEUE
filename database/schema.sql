//players
CREATE TABLE players (
    id SERIAL PRIMARY KEY
    puuid TEXT UNIQUE NOT NULL,
    game_name TEXT NOT NULL,
    tag_line TEXT NOT NULL
);

//matches
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    match_id TEXT UNIQUE NOT NULL,
    map_name TEXT,
    game_mode TEXT,
    started_at TIMESTAMP
);

//player_matches
CREATE TABLE player_matches (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    match_id INTEGER REFERENCES matches(id),

    role TEXT,
    
    kills INTEGER,
    deaths INTEGER,
    assists INTEGER,

    impact_score FLOAT
);