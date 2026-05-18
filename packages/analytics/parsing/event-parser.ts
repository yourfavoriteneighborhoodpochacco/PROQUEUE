import { RoundEvent } from '@proqueue/shared/types/event';
import { RiotRoundResult } from '@proqueue/shared/types/riot-api';
import { EventType } from '@proqueue/shared/enums/event-type';
import { RoundPhase } from '@proqueue/shared/enums/round-phase';
import { ROUND_PHASE_THRESHOLDS } from '@proqueue/shared/constants/timing';

export function parseEvents(
  rounds: RiotRoundResult[],
  matchId: string
): RoundEvent[] {
  const events: RoundEvent[] = [];

  for (const round of rounds) {
    for (const playerStat of round.playerStats) {
      for (const kill of playerStat.kills) {
        events.push({
          matchId,
          roundNumber: round.roundNum,
          roundPhase: resolvePhase(kill.timeSinceRoundStartMillis, round),
          eventType: EventType.Kill,
          actorPuuid: kill.killer,
          targetPuuid: kill.victim,
          timestampMs: kill.timeSinceRoundStartMillis,
          metadata: {
            assistants: kill.assistants,
            finishingDamage: kill.finishingDamage,
            victimLocation: kill.victimLocation,
          },
        });
      }
    }

    if (round.bombPlanter) {
      events.push({
        matchId,
        roundNumber: round.roundNum,
        roundPhase: RoundPhase.Combat,
        eventType: EventType.PlantComplete,
        actorPuuid: round.bombPlanter,
        timestampMs: round.plantRoundTime ?? 0,
        metadata: {},
      });
    }

    if (round.bombDefuser) {
      events.push({
        matchId,
        roundNumber: round.roundNum,
        roundPhase: RoundPhase.PostPlant,
        eventType: EventType.DefuseComplete,
        actorPuuid: round.bombDefuser,
        timestampMs: round.defuseRoundTime ?? 0,
        metadata: {},
      });
    }
  }

  return events;
}

function resolvePhase(
  timestampMs: number,
  round: RiotRoundResult
): RoundPhase {
  if (round.plantRoundTime && timestampMs > round.plantRoundTime) {
    return RoundPhase.PostPlant;
  }
  if (timestampMs < ROUND_PHASE_THRESHOLDS.BUY_PHASE_DURATION_MS) {
    return RoundPhase.BuyClosed;
  }
  return RoundPhase.Combat;
}