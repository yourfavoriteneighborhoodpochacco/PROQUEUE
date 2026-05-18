import { Request, Response } from 'express';
import { getOrFetchPlayer } from '../../services/playerService';

console.log('player-controller loaded, getOrFetchPlayer:', typeof getOrFetchPlayer);

export async function getPlayer(req: Request, res: Response): Promise<void> {
  console.log('getPlayer called');
  try {
    const { gameName, tagLine } = req.params;
    console.log('params:', gameName, tagLine);
    if (!gameName || !tagLine) {
      res.status(400).json({ error: 'gameName and tagLine are required' });
      return;
    }
    const player = await getOrFetchPlayer(gameName, tagLine);
    console.log('player result:', player);
    if (!player) {
      res.status(404).json({ error: 'Player not found' });
      return;
    }
    res.json(player);
  } catch (err) {
    console.log('ERROR IN getPlayer:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
}