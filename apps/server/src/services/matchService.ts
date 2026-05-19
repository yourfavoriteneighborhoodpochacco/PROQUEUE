import { getMatchesByPuuid } from '../db/queries/matches';

export async function getMatchHistory(puuid: string) {
  return getMatchesByPuuid(puuid);
}