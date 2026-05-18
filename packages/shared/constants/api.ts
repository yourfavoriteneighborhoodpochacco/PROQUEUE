export const RIOT_API = {
  BASE_URL: 'https://na.api.riotgames.com',
  ENDPOINTS: {
    MATCH_BY_ID: (matchId: string) => `/val/match/v1/matches/${matchId}`,
    MATCHES_BY_PUUID: (puuid: string) => `/val/match/v1/by-puuid/${puuid}`,
    ACCOUNT_BY_RIOT_ID: (gameName: string, tagLine: string) =>
      `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    ACCOUNT_BY_PUUID: (puuid: string) =>
      `/riot/account/v1/accounts/by-puuid/${puuid}`,
  },
} as const;