import { date, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const salesBaseColumns = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  email: text('email').notNull(),
  fullName: text('full_name').notNull(),
  birthDay: date('birthday').notNull(),
  status: text('status').notNull(),
  locale: text('locale').notNull(),
  productId: text('product_id').notNull(),
};

export const prodSalesTable = pgTable('prod_sales', {
  ...salesBaseColumns,
  trackerCode: text('tracker_code').notNull().unique(),
});
export const devSalesTable = pgTable('dev_sales', {
  ...salesBaseColumns,
  trackerCode: text('tracker_code').notNull().unique(),
});

export const salesTable =
  process.env.VERCEL_ENV === 'production' ? prodSalesTable : devSalesTable;
