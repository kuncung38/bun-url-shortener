import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const shortener = sqliteTable('shortener', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  url: text('url').notNull().unique('unique_url'),
  urlId: text('urlId').notNull().unique('unique_url_id'),
});
