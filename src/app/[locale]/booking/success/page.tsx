'use client';
import React from 'react';
import { CalendarIcon, CheckIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookingSuccess() {
  const t = useTranslations('booking');

  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">
              {productId === 'birth-map'
                ? t('birthMapPaymentConfirmed')
                : t('bookingConfirmed')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {productId === 'birth-map'
                ? t('birthMapPaymentThankYou')
                : t('bookingThankYou')}
            </p>
            <div className="flex flex-col gap-2">
              <div className="mb-6 inline-block rounded-lg bg-indigo-50 p-6 dark:bg-gray-800">
                <div className="mb-2 flex items-center justify-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />

                  <span className="font-medium text-indigo-700 dark:text-indigo-300">
                    {t('nextSteps')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {productId === 'birth-map'
                    ? t('birthMapDelivery')
                    : t('numerologistContact')}
                </p>
              </div>
              <Button
                to="/booking"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {productId === 'birth-map' ? t('buyAnother') : t('bookAnother')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
