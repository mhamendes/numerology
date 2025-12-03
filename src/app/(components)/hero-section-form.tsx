'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UTCDate } from '@date-fns/utc';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DateInput } from '@/components/ui/date-input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

import { sendBirthDayDocumentEmail } from '@/actions/createBirthDayReturnDocument';
import { useBooking } from '@/app/[locale]/booking/(components)/context';

export function HeroSectionForm() {
  const t = useTranslations('hero');
  const tForm = useTranslations('form');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { prefilledData } = useBooking();

  const FormSchema = z.object({
    email: z.email({ error: tForm('email.errorMessage') }),
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
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: prefilledData?.email ?? undefined,
      fullName: prefilledData?.fullName ?? undefined,
      birthday: prefilledData?.birthday
        ? new UTCDate(prefilledData.birthday)
        : undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isLoading) return;

    setIsLoading(true);
    try {
      sessionStorage.setItem('bookingData', JSON.stringify(data));

      const response = await sendBirthDayDocumentEmail(data);

      if (!response) throw new Error('Personal Days email failed to be sent');

      return setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error(tForm('error.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="lg:w-1/2 lg:pl-12">
      <Card className="border border-indigo-100 bg-white/90 shadow-xl backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/90">
        <CardContent className="p-6 md:p-8">
          <h3 className="mb-6 text-center text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
            {t('calculateLifePath')}
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormDescription>
                      {tForm('email.description')}
                    </FormDescription>
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
                    <FormDescription>
                      {tForm('name.description')}
                    </FormDescription>
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
                    <FormDescription>
                      {tForm('birthday.description')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-indigo-600 py-5 text-white hover:bg-indigo-700"
              >
                {t('revealNumbers')}
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            {t('discoverDestiny')}
          </p>
        </CardContent>
      </Card>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const t = useTranslations('personal-days-success');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            {t('title')}
          </DialogTitle>
          <div className="flex flex-col gap-2">
            <DialogDescription className="mb-6 text-gray-600 dark:text-gray-300">
              {t('description')}
            </DialogDescription>
            <Button
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
              to="/booking"
            >
              {t('button')}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
