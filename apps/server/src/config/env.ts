import dotenv from 'dotenv';
dotenv.config();

function require(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const env = {
  PORT: process.env.PORT ?? '3000',
  DATABASE_URL: require('DATABASE_URL'),
  RIOT_API_KEY: require('RIOT_API_KEY'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};