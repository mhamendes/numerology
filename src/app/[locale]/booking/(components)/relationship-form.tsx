'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { formatDate } from '@/lib/date';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { useBooking } from './context';

export default function RelationshipForm() {
  const t = useTranslations('form');
  const { onSubmit, handleBack, isLoading, prefilledData } = useBooking();

  const FormSchema = z.object({
    fullName: z.string().min(2, {
      message: t('name.errorMessage'),
    }),
    birthday: z.date({ required_error: t('birthday.errorMessage') }),
    email: z.string().email({ message: t('email.errorMessage') }),
    partnerFullName: z.string().min(2, {
      message: t('partnerName.errorMessage'),
    }),
    partnerBirthday: z.date({
      required_error: t('partnerBirthday.errorMessage'),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: prefilledData?.fullName ?? undefined,
      birthday: prefilledData?.birthday
        ? new Date(prefilledData.birthday)
        : undefined,
      email: prefilledData?.email ?? undefined,
      partnerFullName: prefilledData?.partnerFullName ?? undefined,
      partnerBirthday: prefilledData?.partnerBirthday
        ? new Date(prefilledData.partnerBirthday)
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="calendar"
                          className={cn(
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span>{t('birthday.placeholder')}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        autoFocus
                        endMonth={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              'flex h-10 rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>{t('partnerBirthday.placeholder')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          autoFocus
                          endMonth={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
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
