import { db } from '../client';
import { RoundEvent } from '@proqueue/shared/types/event';

export async function upsertEvents(events: RoundEvent[]): Promise<void> {
  for (const event of events) {
    await db.query(
      'INSERT INTO round_events (match_id, round_number, round_phase, event_type, actor_puuid, target_puuid, timestamp_ms, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING',
      [
        event.matchId,
        event.roundNumber,
        event.roundPhase,
        event.eventType,
        event.actorPuuid,
        event.targetPuuid ?? null,
        event.timestampMs,
        JSON.stringify(event.metadata),
      ]
    );
  }
}