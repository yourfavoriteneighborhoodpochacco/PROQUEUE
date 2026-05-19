import { useState, useEffect, useCallback } from 'react';
import { MatchDTO } from '../../types/MatchDTO';
import { fetchMatchHistory } from './match-service';

export function useMatchHistory(puuid: string) {
  const [matches, setMatches] = useState<MatchDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!puuid) return;
    setLoading(true);
    try {
      const data = await fetchMatchHistory(puuid);
      setMatches(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [puuid]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { matches, loading, error, refetch: fetch };
}