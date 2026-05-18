import { MatchDTO } from '../../types/MatchDTO';

interface MatchHistoryProps {
  matches: MatchDTO[];
  loading: boolean;
}

export function MatchHistory({ matches, loading }: MatchHistoryProps) {
  if (loading) return <p>Loading matches...</p>;
  if (!matches.length) return <p>No matches found.</p>;

  return (
    <div>
      <h3>Match History</h3>
      {matches.map((match) => (
        <div key={match.matchId}>
          <span>{match.outcome}</span>
          <span>{match.kills}/{match.deaths}/{match.assists}</span>
          <span>{match.role}</span>
          <span>IS: {match.impactNormalized.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}