import { EventType } from '../enums/event-type'
import { RoundPhase } from '../enums/round-phase'

export interface RoundEvent {
    matchId: string;
    roundNumber: number;
    roundPhase: number;
    eventType: EventType;
    actorPuuid: string:
    targetPuuid?: string;
    timestampMs: number;
    metadata: Record<string, unknown>;
}