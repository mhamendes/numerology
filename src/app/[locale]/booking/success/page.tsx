'use client';
import React, { useEffect } from 'react';
import { CalendarIcon, CheckIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useBooking } from '../(components)/context';

import { useFacebookPixel } from '@/app/(components)/facebookPixel';

export default function BookingSuccess() {
  const t = useTranslations('booking');
  const { trackEvent, isLoaded } = useFacebookPixel();
  const { products } = useBooking();

  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  useEffect(() => {
    if (isLoaded) {
      const product = products.find((p) => p.id === productId);

      if (product) {
        trackEvent('Purchase', {
          content_ids: [product.id],
          value: product.rawPrice,
          currency: product.currency,
        });
      }
    }
  }, [productId, trackEvent, isLoaded, products]);

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-2xl">
          {productId === 'life-map'
            ? t('lifeMapPaymentConfirmed')
            : t('bookingConfirmed')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          {productId === 'life-map'
            ? t('lifeMapPaymentThankYou')
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
              {productId === 'life-map'
                ? t('lifeMapDelivery')
                : t('numerologistContact')}
            </p>
          </div>
          <Button
            to="/booking"
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {productId === 'life-map' ? t('buyAnother') : t('bookAnother')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
