// Responsibilities
// - transform events into role metrics

// computeDuelistImpact(matchData)
// computeControllerImpact(matchData)
// computeInitiatorImpact(matchData)
// computeSentinelImpact(matchData)

export function computeDuelistImpact(match) {
    const entryRate = calculateEntryRate(match)
    const firstBloods = calculateFirstBloods(match)
    const trades = calculateTrades(match)

    return (
        entryRate * 0.4 +
        firstBloods * 0.4 +
        trades * 0.2
    )
}