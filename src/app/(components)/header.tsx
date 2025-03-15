"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, MoonIcon, SunIcon, GlobeIcon } from "lucide-react";
import { useTheme } from "(components)/theme-provider";
import { useLanguage } from "(components)/language-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as "en" | "it" | "pt-br");
  };

  return (
    <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-4 px-6 sticky top-0 z-50 border-b border-indigo-100 dark:border-indigo-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a
            className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 cursor-pointer"
            href="/"
          >
            <span className="text-indigo-900 dark:text-indigo-300">Cosmic</span>
            Numbers
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            href="/"
          >
            {t("home")}
          </a>
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            href="/services"
          >
            {t("services")}
          </a>
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            href="/about"
          >
            {t("about")}
          </a>
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            href="/contact"
          >
            {t("contact")}
          </a>
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            href="/qa"
          >
            {t("qa")}
          </a>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            asChild
          >
            <a href="/booking">{t("bookReading")}</a>
          </Button>

          {/* Language Selector */}
          <div className="relative flex items-center">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[130px] h-9 border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center">
                  <GlobeIcon className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Language" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt-br">Português</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          {/* Mobile Language Selector */}
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[70px] h-9 border-indigo-200 dark:border-indigo-800">
              <GlobeIcon className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="it">Italiano</SelectItem>
              <SelectItem value="pt-br">Português (BR)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-indigo-100 dark:border-indigo-900">
          <div className="flex flex-col p-4 space-y-4">
            <a
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer py-2"
              href="/"
              onClick={() => closeMenu()}
            >
              {t("home")}
            </a>
            <a
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer py-2"
              href="/services"
              onClick={() => closeMenu()}
            >
              {t("services")}
            </a>
            <a
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer py-2"
              href="/about"
              onClick={() => closeMenu()}
            >
              {t("about")}
            </a>
            <a
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer py-2"
              href="/contact"
              onClick={() => closeMenu()}
            >
              {t("contact")}
            </a>
            <a
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer py-2"
              href="/qa"
              onClick={() => closeMenu()}
            >
              {t("qa")}
            </a>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
              asChild
              onClick={() => closeMenu()}
            >
              <a href="/booking">{t("bookReading")}</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
