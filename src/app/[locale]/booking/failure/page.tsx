import React from 'react';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function BookingFailure() {
  const t = await getTranslations('booking');

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('bookYourReading')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('bookingDescription')}
          </p>
        </div>

        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white`}
              >
                1
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('selectService')}
                </p>
              </div>
            </div>
            <div className="hidden h-0.5 w-16 bg-gray-200 sm:block dark:bg-gray-700"></div>
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white`}
              >
                2
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('yourDetails')}
                </p>
              </div>
            </div>
            <div className="hidden h-0.5 w-16 bg-gray-200 sm:block dark:bg-gray-700"></div>
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white`}
              >
                3
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('payment')}
                </p>
              </div>
            </div>
            <div className="hidden h-0.5 w-16 bg-gray-200 sm:block dark:bg-gray-700"></div>
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white`}
              >
                4
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('confirmation')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <XIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl">{t('paymentFailed')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {t('paymentFailedDescription')}
            </p>
            <div className="flex flex-col gap-2">
              <Button
                asChild
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <Link href="/booking">{t('tryAgain')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
