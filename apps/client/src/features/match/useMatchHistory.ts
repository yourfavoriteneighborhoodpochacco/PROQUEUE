import { useState, useEffect } from 'react';
import { MatchDTO } from '../../types/MatchDTO';
import { fetchMatchHistory } from './match-service';

export function useMatchHistory(puuid: string) {
  const [matches, setMatches] = useState<MatchDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!puuid) return;
    setLoading(true);
    fetchMatchHistory(puuid)
      .then(setMatches)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [puuid]);

  return { matches, loading, error };
}