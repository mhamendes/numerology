'use server';

import { cookies } from 'next/headers';

import { LocalesType } from '@/i18n/routing';
import { stripe } from '@/lib/stripe/stripe';

type GetProductPriceProps = {
  productId: string;
};

async function getProductPrice({ productId }: GetProductPriceProps) {
  if (!productId) {
    throw new Error('Product ID not found');
  }

  const product = await stripe.products.retrieve(productId);
  const price = await stripe.prices.retrieve(product.default_price as string, {
    expand: ['currency_options'],
  });

  const currency = (await cookies()).get('CURRENCY')?.value?.toLowerCase();

  if (!currency) {
    throw new Error('Currency not found');
  }

  const priceInCurrency = price.currency_options?.[currency];

  if (!priceInCurrency) {
    throw new Error(
      `Price for product ${productId} in currency ${currency} not found`
    );
  }

  return {
    id: price.id,
    amount: priceInCurrency?.unit_amount,
    currency,
  };
}

export type ProductId =
  | 'birth-map'
  | 'personal-reading'
  | 'relationship-compatibility'
  | 'business-numerology';

export type Product = {
  id: ProductId;
  serverId: string;
  price: string;
  popular: boolean;
  isActive: boolean;
  allowedLocales: LocalesType[];
};

export async function getProducts(locale: string): Promise<Product[]> {
  const products: Omit<Product, 'price'>[] = [
    {
      serverId: process.env.BIRTH_MAP_PRODUCT_ID as string,
      id: 'birth-map' as const,
      popular: true,
      isActive: !!process.env.BIRTH_MAP_PRODUCT_ID,
      allowedLocales: ['pt-br', 'pt', 'en', 'it'],
    },
    {
      serverId: process.env.PERSONAL_READING_PRODUCT_ID as string,
      id: 'personal-reading' as const,
      popular: false,
      isActive: !!process.env.PERSONAL_READING_PRODUCT_ID,
      allowedLocales: ['pt-br', 'pt'],
    },
    {
      serverId: process.env.RELATIONSHIP_COMPATIBILITY_PRODUCT_ID as string,
      id: 'relationship-compatibility' as const,
      popular: false,
      isActive: !!process.env.RELATIONSHIP_COMPATIBILITY_PRODUCT_ID,
      allowedLocales: ['pt-br', 'pt'],
    },
    {
      serverId: process.env.BUSINESS_NUMEROLOGY_PRODUCT_ID as string,
      id: 'business-numerology' as const,
      popular: false,
      isActive: !!process.env.BUSINESS_NUMEROLOGY_PRODUCT_ID,
      allowedLocales: ['pt-br', 'pt'],
    },
  ];

  const productsWithPrice = await Promise.all(
    products
      .filter(
        (product) =>
          product.isActive &&
          product.allowedLocales.includes(locale as LocalesType)
      )
      .map(async (product) => {
        const price = await getProductPrice({
          productId: product.serverId,
        });

        if (!price.amount) {
          return null;
        }

        const formattedPrice = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: price.currency,
          minimumFractionDigits: 2,
        }).format(price.amount / 100);

        return { ...product, price: formattedPrice };
      })
  );

  return productsWithPrice.filter((item): item is Product => item !== null);
}
