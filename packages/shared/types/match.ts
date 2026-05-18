import { MatchOutcome } from '../enums/match-outcome'
import { GameMode } from '../enums/game-mode'

export interface Match {
    matchId: string;
    mapId: string;
    gameMode: GameMode;
    gameLengthMs: number;
    gameStartMs: number;
    region: string;
}

export interface PlayerMatchResult{
    matchId: string;
    puuid: string;
    teamId: string;
    outcome: MatchOutcome;
    agentId: string;
    kills: number;
    deaths: number;
    assists: number;
    score: number;
}