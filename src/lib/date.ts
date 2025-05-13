import { DEFAULT_LOCALE } from '@/i18n/routing';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { it } from 'date-fns/locale/it';
import { pt } from 'date-fns/locale/pt';
import { ptBR } from 'date-fns/locale/pt-BR';
import Cookies from 'js-cookie';

const LOCALES = {
  pt,
  'pt-br': ptBR,
  en: enUS,
  it,
};

export const getMonthString = (month: number, locale: string) => {
  const formattedMonth = format(new Date(1990, month - 1, 1), 'MMM', {
    locale: LOCALES[locale as keyof typeof LOCALES],
  });

  return formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);
};

export const formatDate = (date: Date) => {
  const locale = Cookies.get('NEXT_LOCALE') ?? DEFAULT_LOCALE;

  return format(date, 'P', {
    locale: LOCALES[locale as keyof typeof LOCALES],
  });
};
