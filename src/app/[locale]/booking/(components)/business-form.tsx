'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useBooking } from './context';

export default function BusinessForm() {
  const t = useTranslations('form');
  const { onSubmit, handleBack, isLoading, prefilledData } = useBooking();

  const FormSchema = z.object({
    businessName: z.string().min(2, {
      message: t('businessName.errorMessage'),
    }),
    businessType: z.string().min(2, {
      message: t('businessType.errorMessage'),
    }),
    email: z.string().email({ message: t('email.errorMessage') }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      businessName: prefilledData?.businessName ?? undefined,
      businessType: prefilledData?.businessType ?? undefined,
      email: prefilledData?.email ?? undefined,
    },
  });

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              {t('businessInformation')}
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('businessName.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('businessName.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t('businessName.description')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('businessType.label')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800">
                          <SelectValue
                            placeholder={t('businessType.placeholder')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">
                            {t('businessType.startup')}
                          </SelectItem>
                          <SelectItem value="small">
                            {t('businessType.smallBusiness')}
                          </SelectItem>
                          <SelectItem value="medium">
                            {t('businessType.mediumEnterprise')}
                          </SelectItem>
                          <SelectItem value="large">
                            {t('businessType.largeCorporation')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      {t('businessType.description')}
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
