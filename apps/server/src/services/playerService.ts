import { getPlayerByPuuid, upsertPlayer } from '../db/queries/players'
import { getAccountByRiotId } from '../ingestion/riot-client'
import { Player } from '@proqueue/shared/types/player'

export async function getOrFetchPlayer(
    gameName: string,
    tagLine: string
): Promise<Player | null> {
    const account = await getAccountByRiotId(gameName, tagLine)
    if(!account) return null
    
    const existing = await getPlayerByPuuid(account.puuid)
    if(existing) return existing

    const newPlayer: Player = {
        puuid: account.puuid,
        gameName: account.gameName,
        tagLine: account.tagLine,
        region: 'na',
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await upsertPlayer(newPlayer)
    return newPlayer
}