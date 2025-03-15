import { defineRouting } from 'next-intl/routing';

export const LOCALES = ['pt-br', 'pt', 'it', 'en'];
export const DEFAULT_LOCALE = 'en';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
});
