import { MatchDTO } from '../../types/MatchDTO';
import './ImpactCard.css';

interface ImpactCardProps {
  matches: MatchDTO[];
  loading?: boolean;
}

export function ImpactCard({ matches, loading }: ImpactCardProps) {
  if (loading || !matches.length) return (
    <div className="impact-card">
      <div className="impact-card-eyebrow">Impact Score</div>
      {loading
        ? <div className="impact-empty">Loading...</div>
        : <div className="impact-empty">No data</div>
      }
    </div>
  );

  const avg = matches.reduce((sum, m) => sum + Number(m.impactNormalized), 0) / matches.length;
  const wins = matches.filter((m) => m.outcome === 'WIN').length;
  const winRate = Math.round((wins / matches.length) * 100);
  const grade = avg >= 1.5 ? 'S' : avg >= 0.75 ? 'A' : avg >= 0 ? 'B' : avg >= -0.75 ? 'C' : 'D';

  return (
    <div className="impact-card">
      <div className="impact-card-eyebrow">Impact Score</div>
      <div className="impact-card-grade">{grade}</div>
      <div className="impact-card-score">
        AVG <span>{avg >= 0 ? '+' : ''}{avg.toFixed(2)}</span>
      </div>
      <div className="impact-card-stats">
        <div className="impact-card-stat">
          <span className="impact-card-stat-label">Matches</span>
          <span className="impact-card-stat-value">{matches.length}</span>
        </div>
        <div className="impact-card-stat">
          <span className="impact-card-stat-label">Win Rate</span>
          <span className={`impact-card-stat-value ${winRate >= 50 ? 'win' : 'loss'}`}>
            {winRate}%
          </span>
        </div>
      </div>
    </div>
  );
}