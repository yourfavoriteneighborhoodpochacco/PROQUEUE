import { app } from './app';
import { env } from './config/env';
import { db } from './db/client';

async function start() {
  try {
    await db.query('SELECT 1');
    console.log('Database connected');

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();