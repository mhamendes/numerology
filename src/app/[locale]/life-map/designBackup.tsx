'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookIcon, CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateInput } from '@/components/ui/date-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';

import { useBooking } from '@/app/[locale]/booking/(components)/context';
import QA from '@/app/[locale]/qa/page';

export default function LifeMap() {
  const t = useTranslations('lifeMap');
  const tForm = useTranslations('form');
  const tServices = useTranslations('services');
  const {
    products,
    isLoading,
    onSubmit: onBookingSubmit,
    handleProductSelection,
  } = useBooking();
  const router = useRouter();
  const lifeMapProduct = products.find((product) => product.id === 'life-map');

  const FormSchema = z.object({
    fullName: z.string().min(2, {
      error: tForm('name.errorMessage'),
    }),
    birthday: z.date({
      error: (issue) => {
        if (issue.input === undefined) {
          return tForm('birthday.errorMessage');
        }
        if (issue.code === 'invalid_type') {
          return tForm('birthday.invalidMessage');
        }
        return tForm('birthday.errorMessage');
      },
    }),
    email: z.email({ error: tForm('email.errorMessage') }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onBookingSubmit(data);
  };

  useEffect(() => {
    if (lifeMapProduct) {
      handleProductSelection(lifeMapProduct.id);
    }
  }, [handleProductSelection, lifeMapProduct]);

  useEffect(() => {
    if (!lifeMapProduct) {
      router.push('/');
    }
  }, [lifeMapProduct, router]);

  if (!lifeMapProduct) {
    return null;
  }

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('yourLifeMap')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('lifeMapPageDescription')}
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Card className="h-full border border-indigo-100 bg-white/90 shadow-xl backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/90">
              <CardHeader>
                <div className="mb-4 flex items-center">
                  <BookIcon className="mr-2 h-6 w-6 text-purple-500" />

                  <CardTitle className="text-2xl text-indigo-800 dark:text-indigo-300">
                    {t('lifeMap')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {t('lifeMapDescription')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('lifeMapDescription')}
                </p>
                <div className="pt-4">
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline">
                    <div className="flex flex-col">
                      {lifeMapProduct.maxInstallments &&
                      lifeMapProduct.installmentsPrice ? (
                        <div className="flex flex-col">
                          <span className="items-baseline font-normal text-gray-600 dark:text-gray-400">
                            {tServices.rich('installmentPrice', {
                              installmentsPrice:
                                lifeMapProduct.installmentsPrice,
                              maxInstallments: lifeMapProduct.maxInstallments,
                              big: (chunks) => (
                                <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                                  {chunks}
                                </span>
                              ),
                            })}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {tServices('fullPrice', {
                              price: lifeMapProduct.price,
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                          {lifeMapProduct.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">
                    {t('deliveryNotice')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border border-indigo-100 bg-white/90 shadow-xl backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/90">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-800 dark:text-indigo-300">
                  {t('getLifeMapTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{tForm('email.label')}</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={tForm('email.placeholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{tForm('name.label')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={tForm('name.placeholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{tForm('birthday.label')}</FormLabel>
                            <DateInput
                              onSelect={field.onChange}
                              setError={form.setError}
                              clearError={form.clearErrors}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                      isLoading={isLoading}
                    >
                      {t('continueToPayment')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
            {t('whatsIncluded')}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('motivationNumber')}</span>{' '}
                  {t('motivationDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('expressionNumber')}</span>{' '}
                  {t('expressionDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('birthDayNumber')}</span>{' '}
                  {t('birthDayDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('hiddenTalent')}</span>{' '}
                  {t('hiddenTalentDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('conjugalVibration')}</span>{' '}
                  {t('conjugalDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('hiddenTendency')}</span>{' '}
                  {t('hiddenTendencyDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('destinyNumberTitle')}</span>{' '}
                  {t('destinyNumberDesc')}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('missionNumber')}</span>{' '}
                  {t('missionDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('karmicLessons')}</span>{' '}
                  {t('karmicDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('lifeCycles')}</span>{' '}
                  {t('lifeCyclesDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('decisiveMoments')}</span>{' '}
                  {t('decisiveMomentsDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('invertedTriangle')}</span>{' '}
                  {t('invertedTriangleDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('personalYears')}</span>{' '}
                  {t('personalYearsDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-green-500" />

                <p className="flex flex-col text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('monthlyGuidance')}</span>{' '}
                  {t('monthlyGuidanceDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <QA />
        </div>
      </div>
    </div>
  );
}
