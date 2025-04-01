'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { BookIcon, CalendarIcon, CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { useBooking } from '../booking/(components)/context';

export default function BirthMap() {
  const t = useTranslations('birthMap');
  const tForm = useTranslations('form');
  const { products } = useBooking();
  const router = useRouter();
  const birthMapProduct = products.find(
    (product) => product.id === 'birth-map'
  );

  const FormSchema = z.object({
    fullName: z.string().min(2, {
      message: tForm('name.errorMessage'),
    }),
    birthday: z.date({ required_error: tForm('birthday.errorMessage') }),
    email: z.string().email({ message: tForm('email.errorMessage') }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const searchParams = new URLSearchParams({
      fullName: data.fullName,
      birthday: data.birthday.toISOString(),
      email: data.email,
      productId: birthMapProduct?.id as string,
    });

    router.push(`/booking?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (!birthMapProduct) {
      router.push('/');
    }
  }, [birthMapProduct, router]);

  if (!birthMapProduct) {
    return null;
  }

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('yourBirthMap')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('birthMapPageDescription')}
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Card className="h-full border border-indigo-100 bg-white/90 shadow-xl backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/90">
              <CardHeader>
                <div className="mb-4 flex items-center">
                  <BookIcon className="mr-2 h-6 w-6 text-purple-500" />

                  <CardTitle className="text-2xl text-indigo-800 dark:text-indigo-300">
                    {t('birthMap')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {t('birthMapDescription')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('birthMapDescription')}
                </p>
                <div className="pt-4">
                  <div className="mb-2 flex items-center">
                    <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                      {birthMapProduct?.price}
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      {t('oneTimePayment')}
                    </span>
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
                  {t('getBirthMapTitle')}
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
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      'w-full pl-3 text-left font-normal',
                                      'flex h-10 rounded-md border bg-white px-3 py-2 text-sm focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'P')
                                    ) : (
                                      <span>
                                        {tForm('birthday.placeholder')}
                                      </span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                  }
                                  autoFocus
                                  endMonth={new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mt-4 w-full bg-indigo-600 py-5 text-white hover:bg-indigo-700"
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
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('motivationNumber')}</span>{' '}
                  {t('motivationDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('expressionNumber')}</span>{' '}
                  {t('expressionDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('birthDayNumber')}</span>{' '}
                  {t('birthDayDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('hiddenTalent')}</span>{' '}
                  {t('hiddenTalentDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('conjugalVibration')}</span>{' '}
                  {t('conjugalDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('hiddenTendency')}</span>{' '}
                  {t('hiddenTendencyDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('destinyNumberTitle')}</span>{' '}
                  {t('destinyNumberDesc')}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('missionNumber')}</span>{' '}
                  {t('missionDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('karmicLessons')}</span>{' '}
                  {t('karmicDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('lifeCycles')}</span>{' '}
                  {t('lifeCyclesDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('decisiveMoments')}</span>{' '}
                  {t('decisiveMomentsDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('invertedTriangle')}</span>{' '}
                  {t('invertedTriangleDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('personalYears')}</span>{' '}
                  {t('personalYearsDesc')}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t('monthlyGuidance')}</span>{' '}
                  {t('monthlyGuidanceDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
