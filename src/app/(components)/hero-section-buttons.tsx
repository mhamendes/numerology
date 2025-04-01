'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function HeroSectionButtons() {
  const t = useTranslations('hero');
  return (
    <div className="flex h-full flex-col justify-center gap-4 sm:flex-row md:justify-start">
      <Button
        asChild
        className="rounded-full bg-indigo-600 px-8 py-6 text-lg text-white hover:bg-indigo-700"
      >
        <Link href="/booking">{t('premiumAnalysis')}</Link>
      </Button>
      <Button
        variant="outline"
        className="rounded-full border-indigo-600 px-8 py-6 text-lg text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
        asChild
      >
        <Link href="/birth-map">{t('getBirthMap')}</Link>
      </Button>
    </div>
  );
}
