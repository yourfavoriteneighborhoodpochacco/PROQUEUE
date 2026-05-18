import { useParams } from 'react-router-dom';
import { usePlayer } from './usePlayer';
import { useMatchHistory } from '../match/useMatchHistory';
import { ImpactCard } from '../impact/ImpactCard';
import { MatchHistory } from '../match/MatchHistory';

export function PlayerProfile() {
  const { gameName, tagLine } = useParams<{
    gameName: string;
    tagLine: string;
  }>();

  const { player, loading: playerLoading } = usePlayer(
    gameName ?? '',
    tagLine ?? ''
  );

  const { matches, loading: matchLoading } = useMatchHistory(
    player?.puuid ?? ''
  );

  if (playerLoading) return <p>Loading player...</p>;
  if (!player) return <p>Player not found.</p>;

  return (
    <div>
      <h2>{player.gameName}#{player.tagLine}</h2>
      <ImpactCard matches={matches} />
      <MatchHistory matches={matches} loading={matchLoading} />
    </div>
  );
}