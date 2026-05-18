export type PlayerDTO = {
    id: string
    gameName: string
    tagLine: string
    roleState: {
        duelistImpact: number
        initiatorImpact: number
        controllerImpact: number
        sentinelImpact: number
    }
}