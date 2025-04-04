import React from 'react';
import { getTranslations } from 'next-intl/server';

import { HeroSectionButtons } from './hero-section-buttons';
import { HeroSectionForm } from './hero-section-form';

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
          <HeroSectionButtons />
        </div>

        <HeroSectionForm />
      </div>
    </section>
  );
}
