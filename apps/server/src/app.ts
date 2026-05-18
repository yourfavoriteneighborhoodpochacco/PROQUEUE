import express from 'express';
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