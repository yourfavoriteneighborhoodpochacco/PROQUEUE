import { Role } from '@proqueue/shared/enums/role'
import { IMPACT_WEIGHTS } from '../../shared/constants/scoring-weights'
import { TradeResult } from '../detection/trade-detection'

export interface ScoringInput {
    puuid: string
    role: Role
    kills: number
    deaths: number
    assists: number
    isEntryKill: boolean
    isEntryDeath: boolean
    trades: TradeResult[]
    utilityAssists: number
}

export interface ImpactScore {
    puuid: string
    role: Role
    raw: number
    normalized?: number
    breakdown: Record<string, number>
}

export function computeImpactScore(input: ScoringInput): ImpactScore {
    const weights = IMPACT_WEIGHTS[input.role]
    const breakdown: Record<string, number> = {}

    const tradeKills = input.trades.filter((t) => t.killerPuuid === input.puuid).length
    
    const untradedDeaths = 
    input.deaths - 
    input.trades.filter((t) => t.tradedPuuid === input.puuid).length

    if (input.isEntryKill && weights.entryKill) {
        breakdown.entryKill = weights.entryKill
    }
    if(input.isEntryDeath && weights.entryDeath){
        breakdown.entryDeath = weights.entryDeath
    }
    if(weights.tradeKill) {
        breakdown.tradeKill = tradeKills * weights.tradeKill
    }
    if(weights.untradedDeath) {
        breakdown.untradedDeath = untradedDeaths * weights.untradedDeath
    }
    if(weights.utilityAssist) {
        breakdown.utilityAssist = input.utilityAssists * weights.utilityAssist
    }

    const raw = Object.values(breakdown).reduce((sum, v) => sum + v, 0)

    return {
        puuid: input.puuid,
        role: input.role,
        raw,
        breakdown
    }

}