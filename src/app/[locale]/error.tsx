'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full flex-grow-1 items-center justify-center px-4 py-16">
      <div className="mx-auto w-4xl max-w-4xl">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-6 text-gray-600 dark:text-gray-300">
              {t('description')}
            </CardDescription>
            <Button
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              to="/"
              onClick={reset}
            >
              {t('button')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
