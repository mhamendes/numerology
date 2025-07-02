'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { downloadFile } from '@/lib/downloadFile';

import { actionCreateNumerologyReturnDocument } from '@/actions/createNumerologyReturnDocument';

export default function InternalPage() {
  const tForm = useTranslations('form');
  const [isLoading, setIsLoading] = useState(false);

  const FormSchema = z.object({
    fullName: z.string().min(2, {
      message: tForm('name.errorMessage'),
    }),
    birthday: z.date({
      required_error: tForm('birthday.errorMessage'),
      invalid_type_error: tForm('birthday.invalidMessage'),
    }),
    password: z.string().min(8, {
      message: tForm('password.errorMessage'),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    'server-only';
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { uri, filename } =
        await actionCreateNumerologyReturnDocument(data);
      downloadFile({ uri, filename });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage =
          error.message === 'wrong-password'
            ? tForm('password.wrongPassword')
            : error.message;
        form.setError('password', {
          type: 'server',
          message: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Card className="border border-indigo-100 bg-white/90 shadow-xl backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/90">
        <CardContent className="h-full p-6 md:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full flex-col justify-between"
            >
              <div className="space-y-6">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{tForm('password.label')}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={tForm('password.placeholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {tForm('password.description')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-indigo-600 py-5 text-white hover:bg-indigo-700"
              >
                {tForm('submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
