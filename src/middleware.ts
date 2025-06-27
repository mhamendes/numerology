import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { LOCALES, LocalesType, routing } from '@/i18n/routing';

export type CurrencyOptions = Record<(typeof LOCALES)[number], string>;

const currencyOptions: CurrencyOptions = {
  'pt-br': 'brl',
  pt: 'eur',
  it: 'eur',
  en: 'usd',
};

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  const locale = response.headers.get(
    'x-middleware-request-x-next-intl-locale'
  ) as LocalesType | null;

  const currentCurrency = request.cookies.get('CURRENCY')?.value?.toLowerCase();
  const localeCurrency =
    locale && LOCALES.includes(locale) ? currencyOptions[locale] : undefined;

  const currency = currentCurrency ?? localeCurrency;

  if (currency) {
    response.cookies.set('CURRENCY', currency);
  }

  if (!request.cookies.get('NEXT_LOCALE')?.value && locale) {
    response.cookies.set('NEXT_LOCALE', locale);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
