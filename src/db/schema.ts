import { date, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const salesTable = pgTable('sales', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  email: text('email').notNull(),
  fullName: text('full_name').notNull(),
  birthDay: date('birthday').notNull(),
  status: text('status').notNull(),
  locale: text('locale').notNull(),
  trackerCode: text('tracker_code').notNull().unique(),
  productId: text('product_id').notNull(),
});
