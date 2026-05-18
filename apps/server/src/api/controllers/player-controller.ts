import { Request, Response } from 'express';
import { getOrFetchPlayer } from '../../services/playerService';

export async function getPlayer(req: Request, res: Response): Promise<void> {
  try {
    const { gameName, tagLine } = req.params;
    if (!gameName || !tagLine) {
      res.status(400).json({ error: 'gameName and tagLine are required' });
      return;
    }
    const player = await getOrFetchPlayer(gameName, tagLine);
    if (!player) {
      res.status(404).json({ error: 'Player not found' });
      return;
    }
    res.json(player);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
}