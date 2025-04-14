'use client';

import React from 'react';
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/navigation';
import {
  BRAND_FACEBOOK_PAGE,
  BRAND_FIRST_NAME,
  BRAND_INSTAGRAM_PAGE,
  BRAND_LAST_NAME,
  BRAND_NAME,
  BRAND_TWITTER_PAGE,
  BRAND_YOUTUBE_PAGE,
  CONTACT_EMAIL,
  JOINED_BRAND_ADDRESS,
  PHONE_NUMBER,
} from '@/lib/constants';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-indigo-900 px-4 pt-16 pb-8 text-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-2xl font-bold">
              <span className="text-indigo-300">{BRAND_FIRST_NAME}</span>
              {BRAND_LAST_NAME}
            </h3>
            <p className="mb-6 text-indigo-200 dark:text-indigo-300">
              {t('unlockingSecrets')}
            </p>
            <div className="flex space-x-4">
              <Link
                href={BRAND_FACEBOOK_PAGE}
                className="text-indigo-200 transition-colors hover:text-white"
              >
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link
                href={BRAND_INSTAGRAM_PAGE}
                className="text-indigo-200 transition-colors hover:text-white"
              >
                <InstagramIcon className="h-6 w-6" />
              </Link>
              <Link
                href={BRAND_TWITTER_PAGE}
                className="text-indigo-200 transition-colors hover:text-white"
              >
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link
                href={BRAND_YOUTUBE_PAGE}
                className="text-indigo-200 transition-colors hover:text-white"
              >
                <YoutubeIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('whatClientsSay')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {t('resources')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('numerologyBlog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('freeCalculator')}
                </Link>
              </li>
              <li>
                <Link
                  href="/qa"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('numerologyGuide')}
                </Link>
              </li>
              <li>
                <Link
                  href="/qa"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('faqs')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-indigo-200 transition-colors hover:text-white"
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {t('stayUpdated')}
            </h4>
            <p className="mb-4 text-indigo-200">{t('newsletterDesc')}</p>
            <div className="flex">
              <Input
                type="CONTACT_EMAIL"
                placeholder={t('yourEmail')}
                className="rounded-r-none border-indigo-700 bg-indigo-800 text-white placeholder:text-indigo-300 focus:ring-indigo-500"
              />

              <Button className="rounded-l-none bg-indigo-500 hover:bg-indigo-600">
                {t('subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-4 border-t border-indigo-800 pt-8 pb-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center">
              <MailIcon className="mr-2 h-5 w-5 text-indigo-400" />
              <span className="text-indigo-200">{CONTACT_EMAIL}</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="mr-2 h-5 w-5 text-indigo-400" />
              <span className="text-indigo-200">{PHONE_NUMBER}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-5 w-5 text-indigo-400" />

              <span className="text-indigo-200">{JOINED_BRAND_ADDRESS}</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-indigo-800 pt-6 text-center text-sm text-indigo-300">
          <p>
            &copy; {currentYear} {BRAND_NAME}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
