'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

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
import { PhoneInput } from '@/components/ui/input-phone';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { useBooking } from './context';

export default function BirthMapForm() {
  const t = useTranslations('form');
  const { onSubmit, handleBack, isLoading } = useBooking();

  const searchParams = useSearchParams();

  const FormSchema = z.object({
    fullName: z.string().min(2, {
      message: t('name.errorMessage'),
    }),
    birthday: z.date({ required_error: t('birthday.errorMessage') }),
    email: z.string().email({ message: t('email.errorMessage') }),
    phone: z.string().min(1, { message: t('phone.errorMessage') }),
    specificQuestions: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: searchParams.get('fullName') ?? undefined,
      birthday: searchParams.get('birthday')
        ? new Date(searchParams.get('birthday') as string)
        : undefined,
      email: searchParams.get('email') ?? undefined,
      phone: searchParams.get('phone') ?? undefined,
    },
  });

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('email.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('email.placeholder')}
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>{t('email.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('phone.label')}</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder={t('phone.placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('phone.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                            format(field.value, 'P')
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
            name="specificQuestions"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('specificQuestions.label')}</FormLabel>
                <FormControl>
                  <Textarea
                    className="mb-1 min-h-[100px] border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                    placeholder={t('specificQuestions.placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
