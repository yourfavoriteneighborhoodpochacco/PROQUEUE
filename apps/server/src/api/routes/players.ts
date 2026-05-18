import { Router } from 'express';
import { getPlayer } from '../controllers/player-controller';

export const playerRouter = Router();

playerRouter.get('/:gameName/:tagLine', (req, res, next) => {
  console.log('ROUTE HIT:', req.params);
  next();
}, getPlayer);