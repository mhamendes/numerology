'use client';

import { createContext, useContext, useState, useTransition } from 'react';
import { useRouter } from '@/i18n/navigation';
import { changeCurrency } from '@/actions/changeCurrency';
import { useBooking } from '@/app/[locale]/booking/(components)/context';

type CurrencyContextType = {
  currency: string | undefined;
  updateCurrency: (currency: string) => void;
  isPending: boolean;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: undefined,
  updateCurrency: () => {},
  isPending: false,
});
export function CurrencyProvider({
  children,
  baseCurrency,
}: {
  children: React.ReactNode;
  baseCurrency?: string;
}) {
  const [currency, setCurrency] = useState<string | undefined>(baseCurrency);
  const router = useRouter();
  const { updateCheckoutSession } = useBooking();
  const [isPending, startTransition] = useTransition();

  function updateCurrency(currency: string) {
    startTransition(() => {
      changeCurrency(currency).then(() => {
        setCurrency(currency);
        updateCheckoutSession();
        router.refresh();
      });
    });
  }

  return (
    <CurrencyContext.Provider value={{ currency, updateCurrency, isPending }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }

  return context;
}

export default CurrencyContext;
