import axios, { AxiosError } from 'axios';
import { env } from '../config/env';

const henrikClient = axios.create({
  baseURL: 'https://api.henrikdev.xyz',
  headers: { 'Authorization': env.HENRIK_API_KEY },
});

henrikClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<any>) => {
    if (err.response?.status === 429) {
      const retryAfter = Number(err.response.headers['retry-after'] ?? 60);
      console.log(`Rate limited by Henrik, waiting ${retryAfter}s`);
      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      return henrikClient.request(err.config!);
    }
    console.log('HENRIK ERROR:', err.response?.status, JSON.stringify(err.response?.data));
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
    `/valorant/v3/matches/${region}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
    { params: { size: 5 } }
  );
  return data.data;
}