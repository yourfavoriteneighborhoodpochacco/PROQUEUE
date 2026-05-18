import { MatchDTO } from '../../types/MatchDTO';

interface ImpactCardProps {
  matches: MatchDTO[];
}

export function ImpactCard({ matches }: ImpactCardProps) {
  if (!matches.length) return null;

  const avg =
    matches.reduce((sum, m) => sum + m.impactNormalized, 0) / matches.length;

  return (
    <div>
      <h3>Impact Score</h3>
      <p>Average: {avg.toFixed(2)}</p>
    </div>
  );
}