// Responsibility: Convert ugly Riot JSON into your own internal schema
// ParsedMatch {
//     rounds: ParsedRound[]
//     players: ParsePlayer[]
//     events: MatchEvent[]
// }

type ParsedRound = {
    roundNumber: number
}

type ParsedPlayer = {
    killsPerMatch: number
    assistsPerMatch: number
    deathsPerMatch: number
}

type MatchEvent = {
    trade: string
    playerKill: string
    playerAssist: string
    playerDeath: string
    spikePlanted: string
    spikeDefused: string
}

type ParsedMatch = {
    rounds: ParsedRound[]
    players: ParsedPlayer[]
    events: MatchEvent[]
}