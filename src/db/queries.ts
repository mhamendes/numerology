'use server';
import { eq } from 'drizzle-orm';

import { salesTable } from './schema';
import { db } from '.';

type Sale = typeof salesTable.$inferSelect;

export async function getSaleByTrackerCode(
  trackerCode: string
): Promise<Sale | null> {
  const sale = await db
    .select()
    .from(salesTable)
    .where(eq(salesTable.trackerCode, trackerCode));

  return sale[0] ?? null;
}
