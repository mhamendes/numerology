'use client';

import React from 'react';
import { SparklesIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { HeroSection } from '(components)/hero-section';
import { ServicesSection } from '(components)/services-section';
import { TestimonialsSection } from '(components)/testimonials-section';
import QA from '@/app/[locale]/qa/page';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="w-full">
      <HeroSection />

      {/* About Numerology Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('discoverPath')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('numerologyDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border border-indigo-100 bg-white/80 backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/50">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <StarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                {t('lifePathNumber')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('lifePathDescription')}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-indigo-100 bg-white/80 backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/50">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <SparklesIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                {t('destinyNumber')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('destinyDescription')}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-indigo-100 bg-white/80 backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/50">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <StarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                {t('soulUrgeNumber')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('soulUrgeDescription')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button className="rounded-full bg-indigo-600 px-8 py-6 text-lg text-white hover:bg-indigo-700">
            {t('calculateYourNumbers')}
          </Button>
        </div>
      </section>

      <ServicesSection />
      <TestimonialsSection />

      {/* FAQ Section on Home Page */}
      <div>
        <QA />
      </div>

      {/* Call to Action */}
      <section className="bg-indigo-600 px-4 py-20 dark:bg-indigo-800">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            {t('beginJourney')}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-indigo-100">
            {t('unlockHiddenMeanings')}
          </p>
          <Button className="rounded-full bg-white px-8 py-6 text-lg text-indigo-600 hover:bg-gray-100">
            {t('getPersonalReading')}
          </Button>
        </div>
      </section>
    </div>
  );
}
