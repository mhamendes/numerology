'use server';
import { UTCDate } from '@date-fns/utc';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import hash from 'object-hash';

import { DEFAULT_LOCALE } from '@/i18n/routing';

import { salesTable } from './schema';
import { db } from '.';

type Sale = typeof salesTable.$inferInsert;

export async function createSale(
  saleData: Omit<Sale, 'trackerCode' | 'locale' | 'updatedAt' | 'status'>
) {
  'server-only';

  const newSaleContent = {
    ...saleData,
    status: 'pending',
    locale: (await cookies()).get('NEXT_LOCALE')?.value ?? DEFAULT_LOCALE,
  };
  const trackerCode = hash(
    JSON.stringify({
      ...newSaleContent,
      updatedAt: new UTCDate(),
    })
  );

  await db.insert(salesTable).values({
    ...newSaleContent,
    trackerCode,
  });

  return trackerCode;
}

export async function updateSaleByTrackerCode(
  saleData: Partial<Omit<Sale, 'trackerCode'>> & { trackerCode: string }
) {
  'server-only';

  return await db
    .update(salesTable)
    .set(saleData)
    .where(eq(salesTable.trackerCode, saleData.trackerCode));
}
