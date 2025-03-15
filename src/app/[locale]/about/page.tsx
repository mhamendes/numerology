'use client';

import React from 'react';
import { SparklesIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const t = useTranslations('about');

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('aboutCosmicNumbers')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
              {t('ourMission')}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {t('missionText1')}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {t('missionText2')}
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
              {t('ourApproach')}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {t('approachText1')}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {t('approachText2')}
            </p>
          </div>
        </div>

        <div className="mb-16 rounded-lg bg-indigo-50 p-8 dark:bg-gray-800">
          <h3 className="mb-6 text-center text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
            {t('ourExpertise')}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border border-indigo-100 bg-white/90 dark:border-indigo-900 dark:bg-gray-800/90">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <StarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="mb-2 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                  {t('certifiedNumerologists')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('certifiedDesc')}
                </p>
              </CardContent>
            </Card>
            <Card className="border border-indigo-100 bg-white/90 dark:border-indigo-900 dark:bg-gray-800/90">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <SparklesIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="mb-2 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                  {t('personalizedApproach')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('personalizedDesc')}
                </p>
              </CardContent>
            </Card>
            <Card className="border border-indigo-100 bg-white/90 dark:border-indigo-900 dark:bg-gray-800/90">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <StarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="mb-2 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                  {t('practicalGuidance')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('practicalDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h3 className="mb-4 text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
            {t('beginYourJourney')}
          </h3>
          <p className="mx-auto mb-6 max-w-3xl text-gray-600 dark:text-gray-300">
            {t('journeyText')}
          </p>
        </div>
      </div>
    </div>
  );
}
