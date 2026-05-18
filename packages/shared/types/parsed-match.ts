import { Match, PlayerMatchResult } from './match';
import { RoundEvent } from './event';

export interface ParsedMatch {
    match: Match
    players: PlayerMatchResult[]
    events: RoundEvent[]
}