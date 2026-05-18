import { Router } from 'express';
import { getPlayer } from '../controllers/player-controller';

export const playerRouter = Router();

playerRouter.get('/:gameName/:tagLine', getPlayer);