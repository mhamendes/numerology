'use client';

import React from 'react';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import getStripe from '@/lib/stripe/getStripe';

import { useBooking } from './context';

const stripePromise = getStripe();

export default function Payment() {
  const t = useTranslations('booking');
  const { clientSecret, handleBack } = useBooking();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('payment')}</CardTitle>
      </CardHeader>
      <CardContent>
        {clientSecret ? (
          <EmbeddedCheckoutProvider
            options={{ clientSecret }}
            stripe={stripePromise}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        ) : null}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
          >
            {t('back')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
