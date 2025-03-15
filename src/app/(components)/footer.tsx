"use client"

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from "lucide-react";
import { useLanguage } from "(components)/language-context";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-indigo-900 dark:bg-gray-950 text-white pt-16 pb-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-indigo-300">
                Cosmic
              </span>
              Numbers
            </h3>
            <p
              className="text-indigo-200 dark:text-indigo-300 mb-6"
            >
              {t("unlockingSecrets")}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-indigo-200 hover:text-white transition-colors"
              >
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-indigo-200 hover:text-white transition-colors"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-indigo-200 hover:text-white transition-colors"
              >
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-indigo-200 hover:text-white transition-colors"
              >
                <YoutubeIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("home")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("services")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("about")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("whatClientsSay")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t("resources")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("numerologyBlog")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("freeCalculator")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("numerologyGuide")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("faqs")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  {t("privacyPolicy")}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t("stayUpdated")}
            </h4>
            <p className="text-indigo-200 mb-4">
              {t("newsletterDesc")}
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder={t("yourEmail")}
                className="bg-indigo-800 border-indigo-700 text-white placeholder:text-indigo-300 rounded-r-none focus:ring-indigo-500"
              />

              <Button
                className="bg-indigo-500 hover:bg-indigo-600 rounded-l-none"
              >
                {t("subscribe")}
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-indigo-800 pt-8 pb-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <MailIcon className="h-5 w-5 mr-2 text-indigo-400" />
              <span className="text-indigo-200">
                contact@cosmicnumbers.com
              </span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2 text-indigo-400" />
              <span className="text-indigo-200">
                (555) 123-4567
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon
                className="h-5 w-5 mr-2 text-indigo-400"
              />

              <span className="text-indigo-200">
                123 Cosmic Way, Universe City
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="text-center text-indigo-300 text-sm border-t border-indigo-800 pt-6"
        >
          <p>
            &copy; {currentYear} CosmicNumbers. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
