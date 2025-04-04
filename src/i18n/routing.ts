import { defineRouting } from 'next-intl/routing';

export const LOCALES = ['pt-br', 'pt', 'it', 'en'] as const;
export type LocalesType = (typeof LOCALES)[number];
export const DEFAULT_LOCALE = 'pt-br';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
});
