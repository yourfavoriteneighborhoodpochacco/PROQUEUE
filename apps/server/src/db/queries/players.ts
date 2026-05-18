import { db } from '../client';
import { Player } from '@proqueue/shared/types/player';

export async function getPlayerByPuuid(puuid: string): Promise<Player | null> {
  const result = await db.query<Player>(
    `SELECT * FROM players WHERE puuid = $1`,
    [puuid]
  );
  return result.rows[0] ?? null;
}

export async function upsertPlayer(player: Player): Promise<void> {
  await db.query(
    `INSERT INTO players (puuid, game_name, tag_line, region, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())
     ON CONFLICT (puuid) DO UPDATE
     SET game_name = $2, tag_line = $3, updated_at = NOW()`,
    [player.puuid, player.gameName, player.tagLine, player.region]
  );
}