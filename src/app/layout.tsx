import '@/globals.css';

import React from 'react';
import { setRequestLocale } from 'next-intl/server';

import { Toaster } from '@/components/ui/toaster';

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
    <html lang={locale}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
