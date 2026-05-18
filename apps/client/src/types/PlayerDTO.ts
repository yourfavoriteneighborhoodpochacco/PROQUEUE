export type PlayerDTO = {
    id: string
    gameName: string
    tagLine: string

    overallImpactScore: number

    roleImpact: {
        duelist: number
        initiator: number
        controller: number
        sentinel: number
    }

    mainRole: "DUELIST" | "INITIATOR" | "CONTROLLER" | "SENTINEL"

    trend: {
        lastFiveMatches: number[]
        last20MatchesAverage: number
    }
}