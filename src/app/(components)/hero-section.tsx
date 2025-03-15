import React from 'react';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/navigation';

const randomNumberList = Array.from({ length: 9 }, (_, idx) => {
  return {
    top: Math.floor(Math.random() * 100),
    left: Math.floor(Math.random() * 100),
    rotation: Math.random() * 360,
    animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
    num: idx + 1,
  };
});

export async function HeroSection() {
  const t = await getTranslations('hero');

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-indigo-300 blur-3xl dark:bg-indigo-700"></div>
        <div className="absolute right-1/4 bottom-20 h-80 w-80 rounded-full bg-purple-300 blur-3xl dark:bg-purple-700"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-pink-300 blur-3xl dark:bg-pink-700"></div>
      </div>

      {/* Numbers floating in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {randomNumberList.map((num, index) => (
          <div
            key={index}
            className="absolute text-6xl font-bold text-indigo-200 opacity-30 md:text-8xl dark:text-indigo-800"
            style={{
              top: `${num.top}%`,
              left: `${num.left}%`,
              transform: `rotate(${num.rotation}deg)`,
              animation: num.animation,
            }}
            id={`3vwjx8_${index}`}
          >
            {num.num}
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 md:flex-row md:px-8">
        <div className="mb-12 text-center md:mb-0 md:w-1/2 md:text-left">
          <h1 className="mb-6 text-4xl font-bold text-indigo-900 md:text-5xl lg:text-6xl dark:text-indigo-100">
            {t('unlockDestiny')}{' '}
            <span className="text-indigo-600 dark:text-indigo-400">
              {t('numerology')}
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-xl text-gray-600 md:mx-0 dark:text-gray-300">
            {t('discoverHidden')}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Button className="rounded-full bg-indigo-600 px-8 py-6 text-lg text-white hover:bg-indigo-700">
              {t('premiumAnalysis')}
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-indigo-600 px-8 py-6 text-lg text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
              asChild
            >
              <Link href="/birth-map">{t('getBirthMap')}</Link>
            </Button>
          </div>
        </div>

        <div className="md:w-1/2 md:pl-12">
          <Card className="border border-indigo-100 bg-white/90 shadow-xl backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/90">
            <CardContent className="p-6 md:p-8">
              <h3 className="mb-6 text-center text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
                {t('calculateLifePath')}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('fullName')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('enterFullName')}
                    className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('birthDate')}
                  </label>
                  <Input
                    type="date"
                    className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 py-5 text-white hover:bg-indigo-700"
                >
                  {t('revealNumbers')}
                </Button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                {t('discoverDestiny')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
