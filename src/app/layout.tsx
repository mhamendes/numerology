import '@/globals.css';

import React from 'react';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/toaster';

import FacebookPixelProvider from '@/app/(components)/facebookPixel';

export default async function Layout({
  children,
}: LayoutProps<'/'>) {  
  const locale = await getLocale();

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
