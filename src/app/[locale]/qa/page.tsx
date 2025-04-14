'use client';

import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { content } from './content';

export default function QA() {
  const [searchTerm, setSearchTerm] = useState('');
  const t = useTranslations('qa');

  const allQuestions = content.get(t('allQuestions')) ?? [];

  const filteredFaqs = allQuestions.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answerList.some((child) =>
        child.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      faq.list?.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      faq.footer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('frequentlyAskedQuestions')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('qaDescription')}
          </p>
        </div>

        <div className="relative mb-8">
          <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />

          <Input
            type="text"
            placeholder={t('searchQuestions')}
            className="border-indigo-200 pl-10 focus:ring-indigo-500 dark:border-indigo-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => {
            const { question, answerList, list, footer } = faq;
            if (!question) return null;
            return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                id={`2jfvm1_${index}`}
              >
                <AccordionTrigger
                  className="text-left text-lg font-medium text-indigo-700 hover:text-indigo-800 md:text-lg dark:text-indigo-300 dark:hover:text-indigo-200"
                  id={`g0188c_${index}`}
                >
                  {question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-gray-600 dark:text-gray-300"
                  id={`flb237_${index}`}
                >
                  <div className="space-y-4 text-base">
                    {answerList?.map((item, idx) => (
                      <p key={`${idx}-answer-${question}`}>{item}</p>
                    ))}
                    {list ? (
                      <ul className="list-disc space-y-2 pl-6">
                        {list.map((item, idx) => (
                          <li key={`${idx}-list-${question}`}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {footer ? <p>{footer}</p> : null}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {filteredFaqs.length === 0 && (
          <div className="py-8 text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {t('noQuestionsFound')}
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
            >
              {t('clearSearch')}
            </Button>
          </div>
        )}

        <div className="mt-12 rounded-lg bg-indigo-50 p-6 text-center dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            {t('stillHaveQuestions')}
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {t('cantFindAnswer')}
          </p>
          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            to="/contact"
          >
            {t('contactUs')}
          </Button>
        </div>
      </div>
    </div>
  );
}
