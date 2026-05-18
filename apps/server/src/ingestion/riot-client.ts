import axios from 'axios';
import { env } from '../config/env';

const henrikClient = axios.create({
  baseURL: 'https://api.henrikdev.xyz',
  headers: env.HENRIK_API_KEY ? { 'Authorization': env.HENRIK_API_KEY } : {},
});

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string
): Promise<{ puuid: string; gameName: string; tagLine: string }> {
  const { data } = await henrikClient.get(
    `/valorant/v1/account/${gameName}/${tagLine}`
  );
  return {
    puuid: data.data.puuid,
    gameName: data.data.name,
    tagLine: data.data.tag,
  };
}

export async function getMatchesByNameTag(
  gameName: string,
  tagLine: string,
  region: string = 'na'
): Promise<any[]> {
  const { data } = await henrikClient.get(
    `/valorant/v3/matches/${region}/${gameName}/${tagLine}`
  );
  return data.data;
}