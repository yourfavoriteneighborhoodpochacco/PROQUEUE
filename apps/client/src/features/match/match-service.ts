import { apiClient } from '../../lib/api-client';
import { MatchDTO } from '../../types/MatchDTO';

export async function fetchMatchHistory(puuid: string): Promise<MatchDTO[]> {
  const { data } = await apiClient.get<MatchDTO[]>(`/matches/${puuid}`);
  return data;
}

export async function syncMatches(puuid: string): Promise<void> {
  await apiClient.post(`/matches/sync/${puuid}`);
}