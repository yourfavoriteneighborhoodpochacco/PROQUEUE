import { useState, useEffect } from "react"
import { PlayerDTO } from "../../types/PlayerDTO"
import { fetchPlayer } from "./player-service"

export function usePlayer(gameName: string, tagLine: string) {
    const [player, setPlayer] = useState<PlayerDTO | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!gameName || !tagLine) return
        setLoading(true)
        fetchPlayer(gameName, tagLine)
            .then(setPlayer)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [gameName, tagLine])
    return { player, loading, error }
}