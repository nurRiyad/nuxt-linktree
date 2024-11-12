import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const links = sqliteTable('links', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(), 
  name: text('name').notNull().unique(),
  url: text('url').notNull(),
  completed: integer('completed').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})
