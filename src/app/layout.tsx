import '@/globals.css';

import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/toaster';

import FacebookPixelProvider from '@/app/(components)/facebookPixel';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <FacebookPixelProvider>{children}</FacebookPixelProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
