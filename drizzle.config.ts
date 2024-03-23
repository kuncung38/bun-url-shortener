import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  driver: 'turso',
  out: './migrations',
  dbCredentials: {
    url: Bun.env.DATABASE_URL!,
    authToken: Bun.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
