import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL is not set');
}

export const db = drizzle(connectionString);
