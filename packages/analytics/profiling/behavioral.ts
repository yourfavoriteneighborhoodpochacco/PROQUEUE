import { ImpactScore } from '../scoring/impact-score';

export interface BehavioralProfile {
  puuid: string;
  matchCount: number;
  averageScore: number;
  stdDev: number;
  volatility: 'HIGH' | 'MEDIUM' | 'LOW';
  trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  strengths: string[];
  weaknesses: string[];
}

export function buildBehavioralProfile(
  puuid: string,
  history: ImpactScore[]
): BehavioralProfile {
  const raws = history.map((s) => s.raw);
  const avg = raws.reduce((sum, v) => sum + v, 0) / raws.length;
  const std = Math.sqrt(
    raws.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / raws.length
  );

  const volatility =
    std > 25 ? 'HIGH' : std > 10 ? 'MEDIUM' : 'LOW';

  const trend = computeTrend(raws);

  const breakdownTotals = aggregateBreakdowns(history);
  const strengths = topN(breakdownTotals, 2, 'high');
  const weaknesses = topN(breakdownTotals, 2, 'low');

  return {
    puuid,
    matchCount: history.length,
    averageScore: avg,
    stdDev: std,
    volatility,
    trend,
    strengths,
    weaknesses,
  };
}

function computeTrend(raws: number[]): BehavioralProfile['trend'] {
  if (raws.length < 3) return 'STABLE';
  const recent = raws.slice(-3).reduce((s, v) => s + v, 0) / 3;
  const earlier = raws.slice(0, -3).reduce((s, v) => s + v, 0) /
    (raws.length - 3);
  if (recent > earlier * 1.1) return 'IMPROVING';
  if (recent < earlier * 0.9) return 'DECLINING';
  return 'STABLE';
}

function aggregateBreakdowns(
  history: ImpactScore[]
): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const score of history) {
    for (const [key, val] of Object.entries(score.breakdown)) {
      totals[key] = (totals[key] ?? 0) + val;
    }
  }
  return totals;
}

function topN(
  totals: Record<string, number>,
  n: number,
  direction: 'high' | 'low'
): string[] {
  return Object.entries(totals)
    .sort(([, a], [, b]) => direction === 'high' ? b - a : a - b)
    .slice(0, n)
    .map(([key]) => key);
}