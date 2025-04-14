'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="flex h-screen w-screen items-center justify-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-2xl">{t('description')}</p>
          <Button to="/" onClick={reset}>
            {t('button')}
          </Button>
        </div>
      </body>
    </html>
  );
}
