'use client';

import { useEffect, useState, useTransition } from 'react';
import { CircleDollarSignIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from '@/i18n/navigation';

import { changeCurrency, getCurrency } from '@/actions/changeCurrency';

const Currencies = [
  {
    label: 'USD',
    value: 'usd',
    icon: '🇺🇸',
  },
  {
    label: 'EUR',
    value: 'eur',
    icon: '🇪🇺',
  },
  {
    label: 'BRL',
    value: 'brl',
    icon: '🇧🇷',
  },
];
export default function CurrencySwitcher() {
  const t = useTranslations('currencySwitcher');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [currency, setCurrency] = useState<string | undefined>(undefined);

  async function getLatestCurrency() {
    const currency = await getCurrency();
    setCurrency(currency);
  }

  useEffect(() => {
    getLatestCurrency();
  }, []);

  function onSelectChange(currency: string) {
    startTransition(() => {
      changeCurrency(currency).then(() => {
        getLatestCurrency();
        router.refresh();
      });
    });
  }

  return (
    <div className="flex">
      <Select
        disabled={isPending}
        value={currency}
        onValueChange={onSelectChange}
      >
        <SelectTrigger className="h-9 w-fit gap-2 border-indigo-200 dark:border-indigo-800">
          <SelectValue
            placeholder={
              <div className="flex items-center gap-2 pr-2">
                <CircleDollarSignIcon className="h-4 w-4" />
                {t('label')}
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent className="bg-background">
          {Currencies.map((currency) => (
            <SelectItem key={currency.label} value={currency.value}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{currency.icon}</span>
                {currency.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
