import { db } from '../client';
import { Match, PlayerMatchResult } from '@proqueue/shared/types/match';
import { ImpactScore } from '@proqueue/analytics/scoring/impact-score';

export async function upsertMatch(
  match: Match,
  players: PlayerMatchResult[],
  scores: ImpactScore[]
): Promise<void> {
  await db.query(
    'INSERT INTO matches (match_id, map_id, game_mode, game_length_ms, game_start_ms, region) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (match_id) DO NOTHING',
    [match.matchId, match.mapId, match.gameMode, match.gameLengthMs, match.gameStartMs, match.region]
  );

  for (const player of players) {
    await db.query(
      'INSERT INTO players (puuid, game_name, tag_line, region, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) ON CONFLICT (puuid) DO NOTHING',
      [player.puuid, 'unknown', 'unknown', match.region]
    );
  }

  for (const player of players) {
    const score = scores.find((s) => s.puuid === player.puuid);
    await db.query(
      'INSERT INTO player_match_results (match_id, puuid, team_id, outcome, agent_id, kills, deaths, assists, score, impact_raw, impact_normalized, impact_breakdown, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT (match_id, puuid) DO NOTHING',
      [
        player.matchId,
        player.puuid,
        player.teamId,
        player.outcome,
        player.agentId,
        player.kills,
        player.deaths,
        player.assists,
        player.score,
        score?.raw ?? null,
        score?.normalized ?? null,
        score ? JSON.stringify(score.breakdown) : null,
        score?.role ?? null,
      ]
    );
  }
}

export async function getMatchesByPuuid(puuid: string): Promise<any[]> {
  const result = await db.query(
    'SELECT match_id AS "matchId", puuid, team_id AS "teamId", outcome, agent_id AS "agentId", kills, deaths, assists, score, impact_raw AS "impactRaw", impact_normalized AS "impactNormalized", impact_breakdown AS "impactBreakdown", role FROM player_match_results WHERE puuid = $1 ORDER BY match_id DESC',
    [puuid]
  );
  return result.rows;
}