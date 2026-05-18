import { Role } from '@proqueue/shared/enums/role'

export interface ImpactDTO {
    puuid: string
    matchId: string
    role: Role
    rawScore: number
    normalizedScore: number
    breakdown: {
        label: string
        value: number
    }[]
}