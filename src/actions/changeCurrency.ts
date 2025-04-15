'use server';

import { cookies } from 'next/headers';

export async function changeCurrency(currency: string) {
  'server-only';

  (await cookies()).set('CURRENCY', currency);
}

export async function getCurrency() {
  'server-only';

  return (await cookies()).get('CURRENCY')?.value;
}
