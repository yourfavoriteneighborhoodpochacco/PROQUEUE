import { MatchDTO } from '../../types/MatchDTO';
import './MatchHistory.css';

interface MatchHistoryProps {
  matches: MatchDTO[];
  loading: boolean;
}

export function MatchHistory({ matches, loading }: MatchHistoryProps) {
  if (loading) return (
    <div className="match-history">
      <div className="match-history-header"><span>Match History</span></div>
      <div className="match-skeleton-list">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="match-skeleton" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="match-history">
      <div className="match-history-header">
        <span>Match History</span>
        <span>{matches.length} matches</span>
      </div>
      {!matches.length ? (
        <p className="match-empty">No matches found</p>
      ) : (
        <div className="match-list">
          {matches.map((match) => {
            const isWin = match.outcome === 'WIN';
            const score = Number(match.impactNormalized);
            const scoreColor = score >= 0.5 ? 'var(--win)' : score >= 0 ? 'var(--grey-200)' : 'var(--loss)';
            const kda = ((match.kills + match.assists) / Math.max(match.deaths, 1)).toFixed(2);

            return (
              <div key={match.matchId} className="match-row">
                <div className={`match-outcome-bar ${isWin ? 'win' : 'loss'}`} />
                <div className={`match-outcome-label ${isWin ? 'win' : 'loss'}`}>
                  {match.outcome}
                </div>
                <div className="match-agent">{match.agentId}</div>
                <div className="match-kda">
                  <span className="match-kda-kills">{match.kills}</span>
                  <span className="match-kda-sep">/</span>
                  <span className="match-kda-deaths">{match.deaths}</span>
                  <span className="match-kda-sep">/</span>
                  <span className="match-kda-assists">{match.assists}</span>
                  <span style={{ margin: '0 0.75rem', color: 'var(--grey-700)' }}>·</span>
                  <span className="match-kda-ratio">{kda} KDA</span>
                </div>
                <div className="match-impact">
                  <span className="match-impact-label">Impact</span>
                  <span className="match-impact-value" style={{ color: scoreColor }}>
                    {score >= 0 ? '+' : ''}{score.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}