import React from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import { BookingProvider } from './booking/(components)/context';

import { Footer } from '(components)/footer';
import { Header } from '(components)/header';
import { getCurrency } from '@/actions/changeCurrency';
import { getProducts } from '@/actions/eduzz/getProducts';
import { CurrencyProvider } from '@/app/(components)/currency/provider';

export async function generateMetadata() {
  const t = await getTranslations('metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const products = await getProducts(locale);
  const currency = await getCurrency();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <BookingProvider products={products}>
        <CurrencyProvider baseCurrency={currency}>
          <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
            <Header />
            <main className="flex flex-grow px-4 py-8 md:py-16">
              {children}
            </main>
            <Footer />
          </div>
        </CurrencyProvider>
      </BookingProvider>
    </NextIntlClientProvider>
  );
}
