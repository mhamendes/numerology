import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { LOCALES, LocalesType, routing } from '@/i18n/routing';

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  const acceptLanguageHeader =
    request.headers.get('Accept-Language')?.split(',')[0] ?? '';
  const acceptLanguageDefaultLocale = LOCALES.includes(
    acceptLanguageHeader as LocalesType
  )
    ? acceptLanguageHeader
    : 'pt-br';

  const defaultLocale = (
    request.cookies.get('NEXT_LOCALE')?.value ?? acceptLanguageDefaultLocale
  ).toLowerCase();

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.cookies.set('NEXT_LOCALE', defaultLocale);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
