import { ParsedMatch } from '@proqueue/shared/types/parsed-match';
import { GameMode } from '@proqueue/shared/enums/game-mode';
import { MatchOutcome } from '@proqueue/shared/enums/match-outcome';
import { EventType } from '@proqueue/shared/enums/event-type';
import { RoundPhase } from '@proqueue/shared/enums/round-phase';

export function parseHenrikMatch(raw: any, requestingPuuid: string): ParsedMatch {
  const match = {
    matchId: raw.metadata.matchid,
    mapId: raw.metadata.map,
    gameMode: resolveGameMode(raw.metadata.mode),
    gameLengthMs: raw.metadata.game_length * 1000,
    gameStartMs: raw.metadata.game_start * 1000,
    region: raw.metadata.region ?? 'na',
  };

  const players = raw.players.all_players.map((p: any) => ({
    matchId: match.matchId,
    puuid: p.puuid,
    teamId: p.team,
    outcome: resolveOutcome(p.team, raw.teams),
    agentId: p.assets?.agent?.id ?? p.character,
    kills: p.stats.kills,
    deaths: p.stats.deaths,
    assists: p.stats.assists,
    score: p.stats.score,
  }));

  const events = parseRoundEvents(raw.rounds ?? [], match.matchId);

  return { match, players, events };
}

function resolveGameMode(mode: string): GameMode {
  const map: Record<string, GameMode> = {
    'Competitive': GameMode.Competitive,
    'Unrated': GameMode.Unrated,
    'Deathmatch': GameMode.Deathmatch,
    'Team Deathmatch': GameMode.TeamDeathMatch,
    'Swiftplay': GameMode.Swiftplay,
  };
  return map[mode] ?? GameMode.Unrated;
}

function resolveOutcome(team: string, teams: any): MatchOutcome {
  const teamData = teams[team.toLowerCase()];
  return teamData?.has_won ? MatchOutcome.Win : MatchOutcome.Loss;
}

function parseRoundEvents(rounds: any[], matchId: string) {
  const events: any[] = [];

  for (const round of rounds) {
    const roundNum = round.winning_team ? round.round_num ?? 0 : 0;

    for (const kill of round.player_stats ?? []) {
      for (const k of kill.kill_events ?? []) {
        events.push({
          matchId,
          roundNumber: roundNum,
          roundPhase: RoundPhase.Combat,
          eventType: EventType.Kill,
          actorPuuid: k.killer_puuid,
          targetPuuid: k.victim_puuid,
          timestampMs: k.kill_time_in_round ?? 0,
          metadata: {
            assistants: k.assistants ?? [],
            weapon: k.damage_weapon_id,
          },
        });
      }
    }

    if (round.bomb_planted) {
      events.push({
        matchId,
        roundNumber: roundNum,
        roundPhase: RoundPhase.Combat,
        eventType: EventType.PlantComplete,
        actorPuuid: round.plant_events?.planted_by?.puuid ?? '',
        timestampMs: round.plant_events?.plant_time_in_round ?? 0,
        metadata: {},
      });
    }

    if (round.bomb_defused) {
      events.push({
        matchId,
        roundNumber: roundNum,
        roundPhase: RoundPhase.PostPlant,
        eventType: EventType.DefuseComplete,
        actorPuuid: round.defuse_events?.defused_by?.puuid ?? '',
        timestampMs: round.defuse_events?.defuse_time_in_round ?? 0,
        metadata: {},
      });
    }
  }

  return events;
}