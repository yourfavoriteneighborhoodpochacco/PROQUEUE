import axios, { AxiosError } from 'axios';
import { env } from '../config/env';

const henrikClient = axios.create({
  baseURL: 'https://api.henrikdev.xyz',
  headers: { 'Authorization': env.HENRIK_API_KEY },
});

henrikClient.interceptors.response.use(
  (res) => res,
  (err: AxiosError<any>) => {
    console.log('HENRIK ERROR STATUS:', err.response?.status);
    console.log('HENRIK ERROR DATA:', JSON.stringify(err.response?.data, null, 2));
    throw err;
  }
);

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string
): Promise<{ puuid: string; gameName: string; tagLine: string }> {
  const { data } = await henrikClient.get(
    `/valorant/v1/account/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
  );
  console.log('HENRIK ACCOUNT RESPONSE:', JSON.stringify(data, null, 2));
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
    `/valorant/v3/matches/${region}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
  );
  return data.data;
}