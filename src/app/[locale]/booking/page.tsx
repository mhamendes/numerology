'use client';

import React, { useState } from 'react';
import { CalendarIcon, CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Booking() {
  const t = useTranslations('booking');
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      id: 'personal',
      name: t('personalReading'),
      price: '$99',
      description: t('personalReadingDescription'),
    },
    {
      id: 'relationship',
      name: t('relationshipCompatibility'),
      price: '$149',
      description: t('relationshipCompatibilityDescription'),
    },
    {
      id: 'business',
      name: t('businessNumerology'),
      price: '$199',
      description: t('businessNumerologyDescription'),
    },
    {
      id: 'birthmap',
      name: t('birthMap'),
      price: '$49',
      description: t('birthMapDescription'),
    },
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('bookYourReading')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('bookingDescription')}
          </p>
        </div>

        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
              >
                1
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('selectService')}
                </p>
              </div>
            </div>
            <div className="hidden h-0.5 w-16 bg-gray-200 sm:block dark:bg-gray-700"></div>
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
              >
                2
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('yourDetails')}
                </p>
              </div>
            </div>
            <div className="hidden h-0.5 w-16 bg-gray-200 sm:block dark:bg-gray-700"></div>
            <div className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
              >
                3
              </div>
              <div className="ml-3">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  {t('confirmation')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedService === service.id ? 'ring-opacity-50 border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200 dark:border-gray-700'}`}
                onClick={() => handleServiceSelect(service.id)}
                id={`nzi12j_${index}`}
              >
                <CardHeader className="pb-2" id={`wl3b9m_${index}`}>
                  <CardTitle
                    className="flex items-center justify-between"
                    id={`yeps0e_${index}`}
                  >
                    <span id={`sbhdks_${index}`}>{service.name}</span>
                    <span
                      className="text-indigo-600 dark:text-indigo-400"
                      id={`zm60j3_${index}`}
                    >
                      {service.price}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent id={`2sac82_${index}`}>
                  <p
                    className="text-gray-600 dark:text-gray-300"
                    id={`qht1gy_${index}`}
                  >
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('yourInformation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('fullName')}
                    </label>
                    <Input
                      type="text"
                      placeholder={t('enterFullName')}
                      className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('emailAddress')}
                    </label>
                    <Input
                      type="email"
                      placeholder={t('enterYourEmail')}
                      className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('phoneNumber')}
                    </label>
                    <Input
                      type="tel"
                      placeholder={t('enterPhoneNumber')}
                      className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('dateOfBirth')}
                    </label>
                    <Input
                      type="date"
                      className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                      required
                    />
                  </div>
                </div>

                {selectedService === 'relationship' && (
                  <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <h3 className="mb-4 text-lg font-medium text-indigo-700 dark:text-indigo-300">
                      {t('partnerInformation')}
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('partnersFullName')}
                        </label>
                        <Input
                          type="text"
                          placeholder={t('enterPartnersName')}
                          className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('partnersDateOfBirth')}
                        </label>
                        <Input
                          type="date"
                          className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedService === 'business' && (
                  <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <h3 className="mb-4 text-lg font-medium text-indigo-700 dark:text-indigo-300">
                      {t('businessInformation')}
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('businessName')}
                        </label>
                        <Input
                          type="text"
                          placeholder={t('enterBusinessName')}
                          className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('businessType')}
                        </label>
                        <Select>
                          <SelectTrigger className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800">
                            <SelectValue
                              placeholder={t('selectBusinessType')}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">
                              {t('startup')}
                            </SelectItem>
                            <SelectItem value="small">
                              {t('smallBusiness')}
                            </SelectItem>
                            <SelectItem value="medium">
                              {t('mediumEnterprise')}
                            </SelectItem>
                            <SelectItem value="large">
                              {t('largeCorporation')}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('specificQuestions')}
                  </label>
                  <Textarea
                    placeholder={t('questionsPlaceholder')}
                    className="min-h-[100px] border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
                  >
                    {t('back')}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    {t('continueToPayment')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">
                {t('bookingConfirmed')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {t('bookingThankYou')}
              </p>
              <div className="mb-6 inline-block rounded-lg bg-indigo-50 p-6 dark:bg-gray-800">
                <div className="mb-2 flex items-center justify-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />

                  <span className="font-medium text-indigo-700 dark:text-indigo-300">
                    {t('nextSteps')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedService === 'birthmap'
                    ? t('birthMapDelivery')
                    : t('numerologistContact')}
                </p>
              </div>
              <Button
                onClick={() => setStep(1)}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {t('bookAnother')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
