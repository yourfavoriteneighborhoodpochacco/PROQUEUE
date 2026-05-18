import { ImpactScore } from './impact-score';

interface NormalizationContext {
  matchScores: ImpactScore[];
}

// Z-score normalization scoped to the match baseline.
// Ensures a score of 0 = match average, positive = above, negative = below.
export function normalizeScores(
  scores: ImpactScore[],
  context: NormalizationContext
): ImpactScore[] {
  const raws = context.matchScores.map((s) => s.raw);
  const mean = raws.reduce((sum, v) => sum + v, 0) / raws.length;
  const std = Math.sqrt(
    raws.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / raws.length
  );

  return scores.map((score) => ({
    ...score,
    normalized: std === 0 ? 0 : (score.raw - mean) / std,
  }));
}