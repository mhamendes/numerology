'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_LOCALE } from '@/i18n/routing';
import {
  CONTACT_EMAIL,
  JOINED_BRAND_ADDRESS,
  PHONE_NUMBER,
} from '@/lib/constants';

import { sendEmail } from '@/actions/email/sendEmail';

export default function Contact() {
  const t = useTranslations('contactUs');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const FormSchema = z.object({
    email: z.string().email({ message: t('emailError') }),
    fullName: z.string().min(2, { message: t('requiredMessage') }),
    subject: z.string().min(2, { message: t('requiredMessage') }),
    message: z.string().min(2, { message: t('requiredMessage') }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'omatheusmendes@gmail.com',
      fullName: 'Matheus Henrique Araújo Mendes',
      subject: 'Test',
      message: 'testando mensagem',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    'server-only';
    if (isLoading) return;

    setIsLoading(true);
    try {
      await sendEmail({
        to: 'contact@drcosmicnumber.com',
        subject: data.subject,
        fullName: data.fullName,
        html: data.message,
        type: 'contact',
        locale: DEFAULT_LOCALE,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error(t('error.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('contactUs')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('contactDescription')}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
              {t('sendMessage')}
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('yourName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('enterYourName')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('emailAddress')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('enterYourEmail')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('subject')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('whatIsYourMessageAbout')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('message')}</FormLabel>
                      <FormControl>
                        <Textarea
                          className="mb-1 min-h-[100px] border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                          placeholder={t('enterYourMessage')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {t('sendMessageBtn')}
                </Button>
              </form>
            </Form>
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
              {t('contactInformation')}
            </h3>
            <div className="space-y-6">
              <Card className="border border-indigo-100 dark:border-indigo-900">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
                      <MailIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-indigo-700 dark:text-indigo-400">
                        {t('emailUs')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {CONTACT_EMAIL}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('emailResponse')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-indigo-100 dark:border-indigo-900">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
                      <PhoneIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-indigo-700 dark:text-indigo-400">
                        {t('callUs')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {PHONE_NUMBER}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('callHours')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-indigo-100 dark:border-indigo-900">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
                      <MapPinIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-indigo-700 dark:text-indigo-400">
                        {t('visitUs')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {JOINED_BRAND_ADDRESS}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('byAppointment')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

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
  const t = useTranslations('contactUs');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            {t('success.title')}
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-2">
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {t('success.description')}
              </p>
              <Button
                onClick={onClose}
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {t('success.closebutton')}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
