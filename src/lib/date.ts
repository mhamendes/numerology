import { UTCDate } from '@date-fns/utc';
import { enUS } from 'date-fns/locale/en-US';
import { it } from 'date-fns/locale/it';
import { pt } from 'date-fns/locale/pt';
import { ptBR } from 'date-fns/locale/pt-BR';
import { formatInTimeZone } from 'date-fns-tz';

const LOCALES = {
  pt,
  'pt-br': ptBR,
  en: enUS,
  it,
};

export const getMonthString = (month: number, locale: string) => {
  const formattedMonth = formatInTimeZone(
    new UTCDate(1990, month - 1, 1),
    'UTC',
    'MMM',
    {
      locale: LOCALES[locale as keyof typeof LOCALES],
    }
  );

  return formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);
};

export const formatDate = (date: Date) => {
  return formatInTimeZone(date, 'UTC', 'dd/MM/yyyy');
};
