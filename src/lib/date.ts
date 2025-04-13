import { format } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { it } from 'date-fns/locale/it';
import { pt } from 'date-fns/locale/pt';
import { ptBR } from 'date-fns/locale/pt-BR';

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
