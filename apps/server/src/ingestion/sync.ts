import { getMatchesByNameTag } from './riot-client';
import { detectTrades } from '@proqueue/analytics/detection/trade-detection';
import { computeImpactScore } from '@proqueue/analytics/scoring/impact-score';
import { normalizeScores } from '@proqueue/analytics/scoring/normalization';
import { classifyRole } from '@proqueue/analytics/scoring/role-classifier';
import { upsertMatch } from '../db/queries/matches';
import { getPlayerByPuuid } from '../db/queries/players';
import { parseHenrikMatch } from '../parsers/henrik-parser';

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 2000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 504 && i < retries - 1) {
        console.log(`504 received, retrying in ${delayMs}ms... (${i + 1}/${retries})`);
        await new Promise((r) => setTimeout(r, delayMs));
      } else {
        throw err;
      }
    }
  }
  throw new Error('Max retries exceeded');
}

export async function syncPlayerMatches(puuid: string): Promise<void> {
  const player = await getPlayerByPuuid(puuid);
  if (!player) throw new Error(`Player not found for puuid: ${puuid}`);

  const rawMatches = await withRetry(() =>
    getMatchesByNameTag(player.gameName, player.tagLine)
  );

  for (const raw of rawMatches) {
    const parsed = parseHenrikMatch(raw, puuid);
    const trades = detectTrades(parsed.events);

    const scores = parsed.players.map((p) =>
      computeImpactScore({
        puuid: p.puuid,
        role: classifyRole(p.agentId),
        kills: p.kills,
        deaths: p.deaths,
        assists: p.assists,
        isEntryKill: false,
        isEntryDeath: false,
        trades,
        utilityAssists: p.assists,
      })
    );

    const normalized = normalizeScores(scores, { matchScores: scores });
    await upsertMatch(parsed.match, parsed.players, normalized);
  }
}