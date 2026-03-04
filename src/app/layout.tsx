import '@/globals.css';

import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import FacebookPixelProvider from '@/app/(components)/facebookPixel';
import { Toaster } from '@/components/ui/toaster';

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
