export interface RiotMatchResponse {
    matchInfo: {
        matchId: string;
        mapId: string;
        gameMode: string;
        gameLengthMillis: number;
        gameStartMillis: number;
        region?: string;
    };
    players: RiotPlayer[];
    teams: RiotTeam[];
    roundResults: RiotRoundResult[];
}
export interface RiotPlayer {
    puuid: string;
    teamId: string;
    characterId: string;
    stats: {
        kills: number;
        deaths: number;
        assists: number;
        score: number;
    };
}
export interface RiotTeam {
    teamId: string;
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
}
export interface RiotRoundResult {
    roundNum: number;
    roundResult: string;
    bombPlanter?: string;
    bombDefuser?: string;
    plantRoundTime?: number;
    defuseRoundTime?: number;
    playerStats: RiotPlayerRoundStats[];
}
export interface RiotPlayerRoundStats {
    puuid: string;
    kills: RiotKillEvent[];
    damage: RiotDamageEvent[];
    score: number;
    economy: {
        loadoutValue: number;
        weapon: string;
        armor: string;
        remaining: number;
        spent: number;
    };
    ability: {
        grenadeEffects?: string;
        ability1Effects?: string;
        ability2Effects?: string;
        ultimateEffects?: string;
    };
}
export interface RiotKillEvent {
    timeSinceRoundStartMillis: number;
    killer: string;
    victim: string;
    assistants: string[];
    victimLocation: {
        x: number;
        y: number;
    };
    finishingDamage: {
        damageType: string;
        damageItem: string;
        isSecondaryFireMode: boolean;
    };
}
export interface RiotDamageEvent {
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}
