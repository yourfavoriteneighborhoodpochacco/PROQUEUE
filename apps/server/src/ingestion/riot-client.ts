import axios from 'axios'
import { env } from '../config/env'
import { RiotMatchResponse } from '@proqueue/shared/types/riot-api'

const client = axios.create({
    baseURL: 'https://na.api.riotgames.com',
    headers: { 'X-Riot-Token': env.RIOT_API_KEY },
})

export async function getMatchById(matchId: string): Promise<RiotMatchResponse> {
    const { data } = await client.get(`/val/match/v1/matches/${matchId}`)
    return data
}

export async function getMatchIdsByPuuid(puuid: string): Promise<string[]> {
    const { data } = await client.get(`/val/match/v1/by-puuid/${puuid}`)
    return data
}

export async function getAccountByRiotId(
    gameName: string,
    tagLine: string
): Promise<{puuid: string; gameName: string; tagLine: string}> {
    const { data } = await client.get(
        `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
    )
    return data
}