import { ParsedMatch } from '@proqueue/shared/types/parsed-match';
import { RiotMatchResponse } from '@proqueue/shared/types/riot-api';
import { GameMode } from '@proqueue/shared/enums/game-mode';
import { MatchOutcome } from '@proqueue/shared/enums/match-outcome';
import { parseEvents } from './event-parser';

export function parseMatch(raw: RiotMatchResponse): ParsedMatch {
  const match = {
    matchId: raw.matchInfo.matchId,
    mapId: raw.matchInfo.mapId,
    gameMode: raw.matchInfo.gameMode as GameMode,
    gameLengthMs: raw.matchInfo.gameLengthMillis,
    gameStartMs: raw.matchInfo.gameStartMillis,
    region: raw.matchInfo.region ?? 'unknown',
  };

  const players = raw.players.map((p) => ({
    matchId: match.matchId,
    puuid: p.puuid,
    teamId: p.teamId,
    outcome: resolveOutcome(p.teamId, raw.teams),
    agentId: p.characterId,
    kills: p.stats.kills,
    deaths: p.stats.deaths,
    assists: p.stats.assists,
    score: p.stats.score,
  }));

  const events = parseEvents(raw.roundResults, match.matchId);

  return { match, players, events };
}

function resolveOutcome(
  teamId: string,
  teams: RiotMatchResponse['teams']
): MatchOutcome {
  const team = teams.find((t) => t.teamId === teamId);
  return team?.won ? MatchOutcome.Win : MatchOutcome.Loss;
}