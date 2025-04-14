'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export function HeroSectionButtons() {
  const t = useTranslations('hero');
  return (
    <div className="flex h-full flex-col justify-center gap-4 sm:flex-row md:justify-start">
      <Button
        className="rounded-full bg-indigo-600 px-8 py-6 text-lg text-white hover:bg-indigo-700"
        to="/booking"
      >
        {t('premiumAnalysis')}
      </Button>
      <Button
        className="rounded-full border-indigo-600 px-8 py-6 text-lg text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
        variant="outline"
        to="/birth-map"
      >
        {t('getBirthMap')}
      </Button>
    </div>
  );
}
