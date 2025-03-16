import React from 'react';

import { BookingProvider } from './(components)/context';

import { getProducts } from '@/actions/stripe/getProductPrice';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await getProducts(locale);

  return <BookingProvider products={products}>{children}</BookingProvider>;
}
