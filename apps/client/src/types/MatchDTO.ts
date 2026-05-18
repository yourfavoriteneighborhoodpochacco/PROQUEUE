import { Role } from '@proqueue/shared/enums/role';

export interface MatchDTO {
  matchId: string;
  mapId: string;
  gameMode: string;
  gameLengthMs: number;
  gameStartMs: number;
  outcome: 'WIN' | 'LOSS' | 'DRAW';
  kills: number;
  deaths: number;
  assists: number;
  agentId: string;
  role?: Role;
  impactRaw: number;
  impactNormalized: number;
  impactBreakdown: Record<string, number>;
}