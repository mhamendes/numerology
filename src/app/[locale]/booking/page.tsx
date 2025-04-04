'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import BirthMapForm from './(components)/birth-map-form';
import BusinessForm from './(components)/business-form';
import { useBooking } from './(components)/context';
import Payment from './(components)/payment';
import RelationshipForm from './(components)/relationship-form';
import ServiceSelection from './(components)/service-selection';

export default function Booking() {
  const t = useTranslations('booking');
  const { step, selectedProduct } = useBooking();

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
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
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
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
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
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
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
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 4 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
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

        {step === 1 ? <ServiceSelection /> : null}

        {step === 2 && selectedProduct ? (
          <Card>
            <CardHeader>
              <CardTitle>{t('yourInformation')}</CardTitle>
            </CardHeader>
            {['birthMap', 'personal-reading'].includes(
              selectedProduct?.id ?? ''
            ) ? (
              <BirthMapForm />
            ) : null}
            {selectedProduct?.id === 'relationship-compatibility' ? (
              <RelationshipForm />
            ) : null}
            {selectedProduct?.id === 'business-numerology' ? (
              <BusinessForm />
            ) : null}
          </Card>
        ) : null}

        {step === 3 ? <Payment /> : null}
      </div>
    </div>
  );
}
