import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from './usePlayer';
import { useMatchHistory } from '../match/useMatchHistory';
import { ImpactCard } from '../impact/ImpactCard';
import { RoleBreakdown } from '../impact/RoleBreakdown';
import { MatchHistory } from '../match/MatchHistory';
import './PlayerProfile.css';

export function PlayerProfile() {
  const { gameName, tagLine } = useParams<{ gameName: string; tagLine: string }>();
  const navigate = useNavigate();

  const { player, loading: playerLoading, error: playerError } = usePlayer(
    gameName ?? '',
    tagLine ?? ''
  );

  const { matches, loading: matchLoading } = useMatchHistory(player?.puuid ?? '');

  if (playerLoading) return (
    <div className="profile-loading">
      <div className="profile-loading-spinner" />
      <span>Resolving Player</span>
    </div>
  );

  if (playerError || !player) return (
    <div className="profile-error">
      <span>Player not found</span>
      <button onClick={() => navigate('/')}>← Back</button>
    </div>
  );

  return (
    <div className="profile">
      <header className="profile-header">
        <button className="profile-back" onClick={() => navigate('/')}>
          ← PROQUEUE
        </button>
        <div className="profile-identity">
          <h1 className="profile-name">
            {player.gameName}
            <span className="profile-tag">#{player.tagLine}</span>
          </h1>
          <div className="profile-meta">
            <span className="profile-badge">{player.region}</span>
          </div>
        </div>
      </header>

      <main className="profile-main">
        <aside className="profile-sidebar">
          <ImpactCard matches={matches} loading={matchLoading} />
          <RoleBreakdown matches={matches} />
        </aside>
        <div className="profile-content">
          <MatchHistory matches={matches} loading={matchLoading} />
        </div>
      </main>
    </div>
  );
}