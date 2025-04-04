import React from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import { BookingProvider } from './booking/(components)/context';

import { Footer } from '(components)/footer';
import { Header } from '(components)/header';
import { ThemeProvider } from '(components)/theme-provider';
import { getProducts } from '@/actions/stripe/getProductPrice';

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

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <BookingProvider products={products}>
          <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </BookingProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
