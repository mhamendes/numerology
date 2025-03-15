'use client';

import React, { useState } from 'react';
import { BookIcon, CalendarIcon, CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function BirthMap() {
  const t = useTranslations('birthMap');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

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
                      $49
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
            {step === 1 ? (
              <Card className="border border-indigo-100 bg-white/90 shadow-xl backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/90">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-800 dark:text-indigo-300">
                    {t('getBirthMapTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('fullName')}
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t('enterFullName')}
                        className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('birthDate')}
                      </label>
                      <Input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('enterYourEmail')}
                        className="border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mt-4 w-full bg-indigo-600 py-5 text-white hover:bg-indigo-700"
                    >
                      {t('continueToPayment')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-indigo-100 bg-white/90 text-center shadow-xl backdrop-blur-sm dark:border-indigo-900 dark:bg-gray-800/90">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl text-indigo-800 dark:text-indigo-300">
                    {t('orderThankYou')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('orderReceived')} {formData.email} {t('withinHours')}
                  </p>
                  <div className="mb-6 inline-block rounded-lg bg-indigo-50 p-6 dark:bg-gray-800">
                    <div className="mb-2 flex items-center justify-center">
                      <CalendarIcon className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />

                      <span className="font-medium text-indigo-700 dark:text-indigo-300">
                        {t('expectedDelivery')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('deliveryTime')}
                    </p>
                  </div>
                  <Button
                    onClick={() => setStep(1)}
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    {t('orderAnother')}
                  </Button>
                </CardContent>
              </Card>
            )}
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
