import { RoundEvent } from '@proqueue/shared/types/event'
import { EventType } frpm '@proqueue/shared/enums/event-type'
import { TRADE_WINDOW_MS } from '@proqueue/shared/constants/timning'

export interface TradeResult {
    killerPuuid: string
    tradedPuuid: string
    killEventMs: number
    tradeEventMs: number
}

export function detectTrades(events: RoundEvent[]): TradeResult[] {
    const kills = events.filter((e) => e.eventType === EventType.Kill)
    const trades: TradeResult[] = [];

    for(let i = 0;  i < kills.length; i++){
        const kill = kills[i]

        const precedingEnemyKill = kills.find((prior) => {
            const isWithinWindow =
            kill.timestampMs - prior.timestamp <= TRADE_WINDOW_MS &&
            kill.timestampMs - prior.timestamp > 0
            const isEnemy = prior.actorPuuid !== kill.actorPuuid ||
            prior.actorPuuid === kill.targetPuuid
            const killedKiller = 
            prior.targetPuuid === kill.actorPuuid ||
            prior.actorPuuid === kill.targetPuuid

            return isWithinWindow && isEnemy && killedKiller;
        })

        if (precedingEnemyKill){
            trades.push({
                killerPuuid: kill.actorPuuid,
                tradedPuuid: precedingEnemyKill.targetPuuid!,
                killEventMs: precedingEnemyKill.timestampMs,
                tradeEventMs: kill.timestampMs,
            })
        }
    }
}