'use client';

import React from 'react';
import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/navigation';

import { useBooking } from '../[locale]/booking/(components)/context';

export function ServicesSection() {
  const t = useTranslations('services');
  const { products } = useBooking();

  // Services are now defined inside the component to access the t function

  // Reorder services to make Birth Map first
  const orderedServices = [...products].sort((a, b) => {
    if (a.title === t('birthMap')) return -1;
    if (b.title === t('birthMap')) return 1;
    return 0;
  });

  return (
    <section className="bg-indigo-50 px-4 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('ourNumerologyServices')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('servicesDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
          {orderedServices.map((service, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                service.popular
                  ? 'border-indigo-400 shadow-lg dark:border-indigo-500'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              id={`nzi12j_${index}`}
            >
              {service.popular && (
                <div className="absolute top-0 right-0" id={`tqec8a_${index}`}>
                  <div
                    className="rounded-bl-lg bg-indigo-600 px-4 py-1 text-xs font-semibold text-white"
                    id={`ppd2zf_${index}`}
                  >
                    {t('mostPopular')}
                  </div>
                </div>
              )}

              <CardHeader id={`wdqywt_${index}`}>
                <div className="mb-2 flex items-center" id={`a2a86f_${index}`}>
                  {service.icon}
                  <CardTitle className="ml-2 text-xl" id={`fet957_${index}`}>
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription id={`be4veh_${index}`}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent id={`cunpd1_${index}`}>
                <div className="mb-6" id={`454msx_${index}`}>
                  <span
                    className="text-3xl font-bold text-indigo-700 dark:text-indigo-400"
                    id={`f9clfl_${index}`}
                  >
                    {service.price}
                  </span>
                  <span
                    className="text-gray-500 dark:text-gray-400"
                    id={`mhgo78_${index}`}
                  >
                    {' '}
                    / {t('session')}
                  </span>
                </div>
                <ul className="mb-8 space-y-3" id={`qjhhx8_${index}`}>
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start"
                      id={`hpkh85_${idx}`}
                    >
                      <CheckIcon
                        className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500"
                        id={`sk5f32_${idx}`}
                      />

                      <span
                        className="text-gray-600 dark:text-gray-300"
                        id={`isrkhk_${idx}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    service.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border border-indigo-600 bg-white text-indigo-600 hover:bg-gray-50 dark:border-indigo-500 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700'
                  }`}
                  id={`pyggwy_${index}`}
                >
                  {service.title === t('birthMap')
                    ? t('calculateNow')
                    : t('bookNow')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
            {t('needCustom')}
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-300">
            {t('customDescription')}
          </p>
          <Button
            variant="outline"
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
            asChild
          >
            <Link href="/contact">{t('contactCustom')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
