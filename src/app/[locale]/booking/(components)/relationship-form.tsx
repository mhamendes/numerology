'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { UTCDate } from '@date-fns/utc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { DateInput } from '@/components/ui/date-input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useBooking } from './context';

export default function RelationshipForm() {
  const t = useTranslations('form');
  const { onSubmit, handleBack, isLoading, prefilledData } = useBooking();

  const FormSchema = z.object({
    fullName: z.string().min(2, {
      message: t('name.errorMessage'),
    }),
    birthday: z.date({
      required_error: t('birthday.errorMessage'),
      invalid_type_error: t('birthday.invalidMessage'),
    }),
    email: z.string().email({ message: t('email.errorMessage') }),
    partnerFullName: z.string().min(2, {
      message: t('partnerName.errorMessage'),
    }),
    partnerBirthday: z.date({
      required_error: t('partnerBirthday.errorMessage'),
      invalid_type_error: t('partnerBirthday.invalidMessage'),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: prefilledData?.fullName ?? undefined,
      birthday: prefilledData?.birthday
        ? new UTCDate(prefilledData.birthday)
        : undefined,
      email: prefilledData?.email ?? undefined,
      partnerFullName: prefilledData?.partnerFullName ?? undefined,
      partnerBirthday: prefilledData?.partnerBirthday
        ? new UTCDate(prefilledData.partnerBirthday)
        : undefined,
    },
  });

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('name.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('name.placeholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('name.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('birthday.label')}</FormLabel>
                  <DateInput
                    onSelect={field.onChange}
                    setError={form.setError}
                    clearError={form.clearErrors}
                  />
                  <FormDescription>{t('birthday.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('email.label')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('email.placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('email.description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
            <h3 className="mb-4 text-lg font-medium text-indigo-700 dark:text-indigo-300">
              {t('partnerInformation')}
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="partnerFullName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('partnerName.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('partnerName.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t('partnerName.description')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="partnerBirthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('partnerBirthday.label')}</FormLabel>
                    <DateInput
                      onSelect={field.onChange}
                      setError={form.setError}
                      clearError={form.clearErrors}
                    />
                    <FormDescription>
                      {t('partnerBirthday.description')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
            >
              {t('back')}
            </Button>
            <Button
              isLoading={isLoading}
              type="submit"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {t('continueToPayment')}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}
