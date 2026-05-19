import { useState, useEffect } from 'react';
import { PlayerDTO } from '../../types/PlayerDTO';
import { fetchPlayer } from './player-service';
import { syncMatches } from '../match/match-service';

export function usePlayer(gameName: string, tagLine: string) {
  const [player, setPlayer] = useState<PlayerDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameName || !tagLine) return;
    setLoading(true);
    setError(null);
    setPlayer(null);

    fetchPlayer(gameName, tagLine)
      .then(async (p) => {
        setPlayer(p);
        setLoading(false);
        setSyncing(true);
        try {
          await syncMatches(p.puuid);
        } catch {
          console.warn('Match sync failed, showing cached data');
        } finally {
          setSyncing(false);
        }
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [gameName, tagLine]);

  return { player, loading, syncing, error };
}