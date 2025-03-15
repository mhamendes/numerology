'use client';

import React from 'react';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BRAND_ADDRESS, CONTACT_EMAIL, PHONE_NUMBER } from '@/lib/constants';

export default function Contact() {
  const t = useTranslations('contactUs');

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('contactUs')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('contactDescription')}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
              {t('sendMessage')}
            </h3>
            <form className="space-y-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('yourName')}
                </label>
                <Input
                  type="text"
                  placeholder={t('enterYourName')}
                  className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('emailAddress')}
                </label>
                <Input
                  type="email"
                  placeholder={t('enterYourEmail')}
                  className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('subject')}
                </label>
                <Input
                  type="text"
                  placeholder={t('whatIsYourMessageAbout')}
                  className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('message')}
                </label>
                <Textarea
                  placeholder={t('enterYourMessage')}
                  className="min-h-[150px] border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                />
              </div>
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                {t('sendMessageBtn')}
              </Button>
            </form>
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
              {t('contactInformation')}
            </h3>
            <div className="space-y-6">
              <Card className="border border-indigo-100 dark:border-indigo-900">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
                      <MailIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-indigo-700 dark:text-indigo-400">
                        {t('emailUs')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {CONTACT_EMAIL}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('emailResponse')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-indigo-100 dark:border-indigo-900">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
                      <PhoneIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-indigo-700 dark:text-indigo-400">
                        {t('callUs')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {PHONE_NUMBER}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('callHours')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-indigo-100 dark:border-indigo-900">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
                      <MapPinIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-indigo-700 dark:text-indigo-400">
                        {t('visitUs')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {BRAND_ADDRESS}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('byAppointment')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
