'use client';

import React from 'react';

import { Footer } from '(components)/footer';
import { Header } from '(components)/header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
