import { Router } from 'express';
import { getPlayerMatches, syncMatches } from '../controllers/match-controller';

export const matchRouter = Router();

matchRouter.get('/:puuid', getPlayerMatches);
matchRouter.post('/sync/:puuid', syncMatches);