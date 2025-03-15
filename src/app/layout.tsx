"use client";

import "./globals.css";

import React from "react";
import Layout from "pages/layout";
import { ThemeProvider } from "(components)/theme-provider";
import { LanguageProvider } from "(components)/language-context";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
