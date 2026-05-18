import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { playerRouter } from './api/routes/players';
import { matchRouter } from './api/routes/matches';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/players', playerRouter);
app.use('/matches', matchRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});