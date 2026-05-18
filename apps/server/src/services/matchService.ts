import { getMatchById } from "../ingestion/riot-client";
import { parseMatch } from '@proqueue/analytics/parsing/match-parser'
import { detectTrades } from '@proqueue/analytics/detection/trade-detection'
import { computeImpactScore } from '@proqueue/analytics/scoring/impact-score'
import { upsertMatch } from "../db/queries/matches";
import { Role } from '@proqueue/shared/enums/role'

export async function ingestMatch(matchId: string): Promise<void> {
    const raw = await getMatchById(matchId)
    const parsed = parsedMatch(raw)
    const trades = detectTrades(parsed.events)

    const scores = parsed.players.map((p) =>
        computeImpactScore({
            puuid: p.puuid,
            role: Role.Duelist,
            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            isEntryKill: false,
            isEntryDeath: false,
            trades,
            utilityAssists: p.assists,
        })
    )
    await upsertMatch(parsed.match, parsed.players, scores)
}