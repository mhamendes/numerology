"use client";

import React from "react";
import { Header } from "(components)/header";
import { Footer } from "(components)/footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
