'use server';
import { eq } from 'drizzle-orm';

import { db } from '.';
import { salesTable } from './schema';

type Sale = typeof salesTable.$inferSelect;

export async function getSaleByTrackerCode(
  trackerCode: string
): Promise<Sale | null> {
  'server-only';

  const sale = await db
    .select()
    .from(salesTable)
    .where(eq(salesTable.trackerCode, trackerCode));

  return sale[0] ?? null;
}
