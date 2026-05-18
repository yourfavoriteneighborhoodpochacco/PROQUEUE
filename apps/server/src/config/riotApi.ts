import { RIOT_API } from '@proqueue/shared/constants/api';

export const riotApiConfig = {
  baseUrl: process.env.RIOT_BASE_URL ?? RIOT_API.BASE_URL,
  endpoints: RIOT_API.ENDPOINTS,
};