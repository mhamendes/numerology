'use server';

import { cookies } from 'next/headers';

import { LocalesType } from '@/i18n/routing';

export type ProductId =
  | 'life-map'
  | 'personal-reading'
  | 'relationship-compatibility'
  | 'business-numerology';

export type Product = {
  id: ProductId;
  priceList: {
    currency: string;
    amount: number;
    maxInstallments?: number;
    maxInstallmentAmount?: number;
  }[];
  paymentUrl: string;
  price: string;
  installmentsPrice: string | null;
  maxInstallments: number | null;
  currency: string;
  rawPrice: number;
  popular: boolean;
  isActive: boolean;
  allowedLocales: LocalesType[];
};

export async function getProducts(locale: string): Promise<Product[]> {
  const products: Omit<
    Product,
    'price' | 'rawPrice' | 'currency' | 'installmentsPrice' | 'maxInstallments'
  >[] = [
    {
      id: 'life-map' as const,
      popular: true,
      isActive: !!process.env.LIFE_MAP_PAYMENT_URL,
      paymentUrl: process.env.LIFE_MAP_PAYMENT_URL as string,
      allowedLocales: ['pt-br', 'pt', 'en', 'it'],
      priceList: [
        {
          currency: 'BRL',
          amount: 296,
          maxInstallments: 12,
          maxInstallmentAmount: 30.25,
        },
        {
          currency: 'USD',
          amount: 55.7,
        },
        {
          currency: 'EUR',
          amount: 49.4,
        },
      ],
    },
    {
      id: 'personal-reading' as const,
      popular: false,
      isActive: !!process.env.PERSONAL_READING_PAYMENT_URL,
      paymentUrl: process.env.PERSONAL_READING_PAYMENT_URL as string,
      allowedLocales: ['pt-br', 'pt'],
      priceList: [
        {
          currency: 'BRL',
          amount: 593,
          maxInstallments: 12,
          maxInstallmentAmount: 60.61,
        },
        {
          currency: 'USD',
          amount: 107,
        },
        {
          currency: 'EUR',
          amount: 98,
        },
      ],
    },
    {
      id: 'relationship-compatibility' as const,
      popular: false,
      isActive: !!process.env.RELATIONSHIP_COMPATIBILITY_PAYMENT_URL,
      paymentUrl: process.env.RELATIONSHIP_COMPATIBILITY_PAYMENT_URL as string,
      allowedLocales: ['pt-br', 'pt'],
      priceList: [
        {
          currency: 'BRL',
          amount: 1186,
        },
        {
          currency: 'USD',
          amount: 220,
        },
        {
          currency: 'EUR',
          amount: 200,
        },
      ],
    },
    {
      id: 'business-numerology' as const,
      popular: false,
      isActive: !!process.env.BUSINESS_NUMEROLOGY_PAYMENT_URL,
      paymentUrl: process.env.BUSINESS_NUMEROLOGY_PAYMENT_URL as string,
      allowedLocales: ['pt-br', 'pt'],
      priceList: [
        {
          currency: 'BRL',
          amount: 1186,
        },
        {
          currency: 'USD',
          amount: 220,
        },
        {
          currency: 'EUR',
          amount: 200,
        },
      ],
    },
  ];

  const currency =
    (await cookies()).get('CURRENCY')?.value?.toLowerCase() ?? 'brl';

  const productsWithPrice = products
    .filter(
      (product) =>
        product.isActive &&
        product.allowedLocales.includes(locale as LocalesType)
    )
    .map((product) => {
      const price = product.priceList.find(
        (price) => price.currency.toLowerCase() === currency
      );

      if (!price) {
        return null;
      }

      const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
      }).format(price.amount);

      const formattedInstallmentsPrice = price.maxInstallmentAmount
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: price.currency,
          }).format(price.maxInstallmentAmount ?? 0)
        : null;

      return {
        ...product,
        price: formattedPrice,
        installmentsPrice: formattedInstallmentsPrice,
        maxInstallments: price.maxInstallments ?? null,
        rawPrice: price.amount,
        currency: price.currency,
      };
    });

  return productsWithPrice.filter((item): item is Product => item !== null);
}
