'use server';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import hash from 'object-hash';

import { DEFAULT_LOCALE } from '@/i18n/routing';

import { salesTable } from './schema';
import { db } from '.';

type Sale = typeof salesTable.$inferInsert;

export async function createSale(
  saleData: Omit<Sale, 'trackerCode' | 'locale'>
) {
  const trackerCode = hash(JSON.stringify(saleData));
  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? DEFAULT_LOCALE;

  await db.insert(salesTable).values({
    ...saleData,
    trackerCode,
    locale,
  });

  return trackerCode;
}

export async function updateSaleByTrackerCode(
  saleData: Partial<Omit<Sale, 'trackerCode'>> & { trackerCode: string }
) {
  const updatedSale = await db
    .update(salesTable)
    .set(saleData)
    .where(eq(salesTable.trackerCode, saleData.trackerCode));

  return updatedSale;
}
