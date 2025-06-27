'use client';

import React, { useState } from 'react';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { BRAND_FIRST_NAME, BRAND_LAST_NAME } from '@/lib/constants';

import CurrencySwitcher from './currency-switcher';
import LocaleSwitcher from './locale-switcher';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const t = useTranslations('header');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-100 bg-white px-6 py-4 backdrop-blur-md dark:border-indigo-900 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="cursor-pointer text-2xl font-bold text-indigo-700 dark:text-indigo-400"
          >
            <span className="text-indigo-900 dark:text-indigo-300">
              {BRAND_FIRST_NAME}
            </span>
            {BRAND_LAST_NAME}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-4 xl:flex">
          <Link
            href="/"
            className="cursor-pointer text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            {t('home')}
          </Link>
          <Link
            href="/services"
            className="cursor-pointer text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            {t('services')}
          </Link>
          <Link
            href="/about"
            className="cursor-pointer text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            {t('about')}
          </Link>
          <Link
            href="/contact"
            className="cursor-pointer text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            {t('contact')}
          </Link>
          <Link
            href="/qa"
            className="cursor-pointer text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            {t('qa')}
          </Link>
          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            to="/booking"
          >
            {t('bookReading')}
          </Button>

          {/* Language Selector */}
          <div className="relative flex items-center">
            <LocaleSwitcher />
          </div>

          <div className="relative flex items-center">
            <CurrencySwitcher />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
            }
            aria-label="Toggle theme"
          >
            <SunIcon className="hidden h-5 w-5 dark:block" />
            <MoonIcon className="h-5 w-5 dark:hidden" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 xl:hidden">
          {/* Mobile Language Selector */}
          <div className="hidden space-x-4 md:flex">
            <LocaleSwitcher />
            <CurrencySwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
              }
              aria-label="Toggle theme"
            >
              <SunIcon className="hidden h-5 w-5 dark:block" />
              <MoonIcon className="h-5 w-5 dark:hidden" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 left-0 border-b border-indigo-100 bg-white xl:hidden dark:border-indigo-900 dark:bg-gray-900">
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex flex-col gap-2 md:hidden">
              <LocaleSwitcher />
              <div className="flex space-x-4">
                <CurrencySwitcher />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
                  }
                  aria-label="Toggle theme"
                >
                  <SunIcon className="hidden h-5 w-5 dark:block" />
                  <MoonIcon className="h-5 w-5 dark:hidden" />
                </Button>
              </div>
            </div>

            <Link
              href="/"
              className="cursor-pointer py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              onClick={() => closeMenu()}
            >
              {t('home')}
            </Link>
            <Link
              href="/services"
              className="cursor-pointer py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              onClick={() => closeMenu()}
            >
              {t('services')}
            </Link>
            <Link
              href="/about"
              className="cursor-pointer py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              onClick={() => closeMenu()}
            >
              {t('about')}
            </Link>
            <Link
              className="cursor-pointer py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              href="/contact"
              onClick={() => closeMenu()}
            >
              {t('contact')}
            </Link>
            <Link
              className="cursor-pointer py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              href="/qa"
              onClick={() => closeMenu()}
            >
              {t('qa')}
            </Link>
            <Button
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
              to="/booking"
              onClick={() => closeMenu()}
            >
              {t('bookReading')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
