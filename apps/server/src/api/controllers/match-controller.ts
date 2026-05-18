import { Request, Response } from 'express';
import { syncPlayerMatches } from '../../ingestion/sync';
import { getMatchesByPuuid } from '../../db/queries/matches';

export async function getPlayerMatches(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { puuid } = req.params;
    if (!puuid) {
      res.status(400).json({ error: 'puuid is required' });
      return;
    }
    const matches = await getMatchesByPuuid(puuid);
    res.json(matches);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
}

export async function syncMatches(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { puuid } = req.params;
    if (!puuid) {
      res.status(400).json({ error: 'puuid is required' });
      return;
    }
    await syncPlayerMatches(puuid);
    res.json({ message: `Synced matches for ${puuid}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
}