import React from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import { Footer } from '(components)/footer';
import { Header } from '(components)/header';
import { ThemeProvider } from '(components)/theme-provider';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
