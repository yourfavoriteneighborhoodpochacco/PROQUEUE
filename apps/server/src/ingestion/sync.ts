import { getMatchIdsByPuuid, getMatchById } from './riot-client';
import { parseMatch } from '@proqueue/analytics/parsing/match-parser';
import { parseEvents } from '@proqueue/analytics/parsing/event-parser';
import { detectTrades } from '@proqueue/analytics/detection/trade-detection';
import { computeImpactScore } from '@proqueue/analytics/scoring/impact-score';
import { normalizeScores } from '@proqueue/analytics/scoring/normalization';
import { classifyRole } from '@proqueue/analytics/scoring/role-classifier';
import { upsertMatch } from '../db/queries/matches';
import { getPlayerByPuuid } from '../db/queries/players';

export async function syncPlayerMatches(puuid: string): Promise<void> {
  const matchIds = await getMatchIdsByPuuid(puuid);

  for (const matchId of matchIds) {
    const raw = await getMatchById(matchId);
    const parsed = parseMatch(raw);
    const trades = detectTrades(parsed.events);

    const scores = parsed.players.map((p) =>
      computeImpactScore({
        puuid: p.puuid,
        role: classifyRole(p.agentId),
        kills: p.kills,
        deaths: p.deaths,
        assists: p.assists,
        isEntryKill: false,   // TODO: derive from event order
        isEntryDeath: false,
        trades,
        utilityAssists: p.assists,
      })
    );

    const normalized = normalizeScores(scores, { matchScores: scores });

    await upsertMatch(parsed.match, parsed.players, normalized);
  }
}