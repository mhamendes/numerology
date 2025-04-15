'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { useBooking } from './(components)/context';

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('booking');
  const searchParams = useSearchParams();

  const { step, selectedProduct, isLastStep } = useBooking();

  const productId = selectedProduct?.id ?? searchParams.get('productId');

  function getTitle() {
    if (!productId) {
      return t('selectYourProduct');
    }

    if (productId === 'birth-map') {
      return t('buyYourMap');
    }

    return t('bookYourReading');
  }

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {getTitle()}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('bookingDescription')}
          </p>
        </div>

        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div
              className={cn(
                'hidden items-center lg:flex',
                step === 1 && !isLastStep ? 'flex' : 'hidden'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  isLastStep || step >= 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                )}
              >
                1
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('selectService')}
                </p>
              </div>
            </div>
            <div className="hidden h-0.5 w-16 bg-gray-200 lg:block dark:bg-gray-700" />
            <div
              className={cn(
                'hidden items-center lg:flex',
                step === 2 && !isLastStep ? 'flex' : 'hidden'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  isLastStep || step >= 2
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                )}
              >
                2
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('yourDetails')}
                </p>
              </div>
            </div>
            <div className="hidden h-0.5 w-16 bg-gray-200 lg:block dark:bg-gray-700" />
            <div
              className={cn(
                'hidden items-center lg:flex',
                step === 3 && !isLastStep ? 'flex' : 'hidden'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  isLastStep || step >= 3
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                )}
              >
                3
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('payment')}
                </p>
              </div>
            </div>
            <div className="hidden h-0.5 w-16 bg-gray-200 lg:block dark:bg-gray-700" />
            <div
              className={cn(
                'hidden items-center lg:flex',
                isLastStep ? 'flex' : 'hidden'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  isLastStep
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                )}
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

        {children}
      </div>
    </div>
  );
}
