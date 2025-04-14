import React from 'react';
import { XIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function BookingFailure() {
  const t = await getTranslations('booking');

  return (
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
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            to="/booking"
          >
            {t('tryAgain')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
