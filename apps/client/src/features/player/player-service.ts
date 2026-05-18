import { apiClient } from '../../lib/api-client'
import { PlayerDTO } from '../../types/PlayerDTO'

export async function fetchPlayer(
    gameName: string,
    tagLine: string
): Promise<PlayerDTO> {
    const { data } = await apiClient.get<PlayerDTO>(
        `/players/${gameName}/${tagLine}`
    )
    return data
}