'use client';

import { useTransition } from 'react';
import { GlobeIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Locale, useLocale, useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(language: string) {
    const nextLocale = language as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <>
      {/* Mobile Language Selector */}
      <div className="flex md:hidden">
        <Select
          disabled={isPending}
          value={locale}
          onValueChange={onSelectChange}
        >
          <SelectTrigger className="h-9 w-fit gap-2 border-indigo-200 dark:border-indigo-800">
            <GlobeIcon className="h-4 w-4" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            {routing.locales.map((cur) => (
              <SelectItem key={cur} value={cur}>
                {t('locale', { locale: cur.replaceAll('-', '_') })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Language Selector */}
      <div className="hidden md:flex">
        <Select value={locale} onValueChange={onSelectChange}>
          <SelectTrigger className="h-9 w-fit border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-2 pr-2">
              <GlobeIcon className="h-4 w-4" />
              <SelectValue placeholder={t('label')} />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-background">
            {routing.locales.map((cur) => (
              <SelectItem key={cur} value={cur}>
                {t('locale', { locale: cur.replaceAll('-', '_') })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
