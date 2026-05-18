import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const env = {
  PORT: process.env.PORT ?? '3000',
  DATABASE_URL: requireEnv('DATABASE_URL'),
  HENRIK_API_KEY: requireEnv('HENRIK_API_KEY'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};