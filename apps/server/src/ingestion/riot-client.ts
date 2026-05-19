import axios from 'axios';
import { env } from '../config/env';

const henrikClient = axios.create({
  baseURL: 'https://api.henrikdev.xyz',
  headers: {
    Authorization: env.HENRIK_API_KEY,
  },
});

henrikClient.interceptors.response.use(
  (res) => res,
  async (err: any) => {
    if (err && err.response) {
      if (err.response.status === 429) {
        const retryAfter = Number(
          err.response.headers['retry-after'] ?? 60
        );

        console.log(
          `Rate limited by Henrik, waiting ${retryAfter}s`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, retryAfter * 1000)
        );

        return henrikClient.request(err.config);
      }

      console.log(
        'HENRIK ERROR:',
        err.response.status,
        JSON.stringify(err.response.data)
      );
    }

    throw err;
  }
);

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string
): Promise<{
  puuid: string;
  gameName: string;
  tagLine: string;
}> {
  const response = await henrikClient.get<{
    data: {
      puuid: string;
      name: string;
      tag: string;
    };
  }>(
    `/valorant/v1/account/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`
  );

  return {
    puuid: response.data.data.puuid,
    gameName: response.data.data.name,
    tagLine: response.data.data.tag,
  };
}

export async function getMatchesByNameTag(
  gameName: string,
  tagLine: string,
  region: string = 'na'
): Promise<any[]> {
  const response = await henrikClient.get<{
    data: any[];
  }>(
    `/valorant/v3/matches/${region}/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`,
    {
      params: { size: 5 },
    }
  );

  return response.data.data;
}