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

  if (step === 1) {
    return <ServiceSelection />;
  }

  if (step === 2 && selectedProduct) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('yourInformation')}</CardTitle>
        </CardHeader>
        {['birth-map', 'personal-reading'].includes(
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
    );
  }

  if (step === 3) {
    return <Payment />;
  }

  return null;
}
