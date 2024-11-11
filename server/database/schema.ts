import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const links = sqliteTable('links', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(), // GitHub Id
  name: text('name').notNull().unique(),
  url: text('url').notNull(),
  completed: integer('completed').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})
