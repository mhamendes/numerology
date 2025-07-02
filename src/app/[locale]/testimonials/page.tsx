'use client';

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import clientTestimonials from './content.json';

const content = new Map([
  ['pt_br', clientTestimonials.pt_br],
  ['pt', clientTestimonials.pt],
  ['en', clientTestimonials.en],
  ['it', clientTestimonials.it],
]);

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations('testimonials');

  const testimonials = content.get(t('locale')) ?? [];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-800 md:text-4xl dark:text-indigo-300">
            {t('whatClientsSay')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('testimonialsDescription')}
          </p>
        </div>

        <div className="relative">
          {/* Desktop View - Grid */}
          <div className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-indigo-100 bg-white shadow-md transition-shadow hover:shadow-lg dark:border-indigo-900 dark:bg-gray-800"
                id={`sl8h12_${index}`}
              >
                <CardContent className="p-6" id={`rro1bp_${index}`}>
                  <div
                    className="mb-4 flex items-center"
                    id={`1sj34l_${index}`}
                  >
                    <Avatar className="mr-4 h-12 w-12" id={`y489dt_${index}`}>
                      <AvatarFallback id={`gdsqoc_${index}`}>
                        {testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div id={`0k1bbq_${index}`}>
                      <h4
                        className="font-semibold text-indigo-800 dark:text-indigo-300"
                        id={`k8pyzj_${index}`}
                      >
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                  <div className="mb-4 flex" id={`g1gg59_${index}`}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        fill={i < testimonial.rating ? 'currentColor' : 'none'}
                        id={`nl0yiy_${i}`}
                      />
                    ))}
                  </div>
                  <p
                    className="text-gray-600 dark:text-gray-300"
                    id={`w18457_${index}`}
                  >
                    {testimonial.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile View - Carousel */}
          <div className="md:hidden">
            <Card className="border border-indigo-100 bg-white shadow-md dark:border-indigo-900 dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  <Avatar className="mr-4 h-12 w-12">
                    <AvatarFallback>
                      {testimonials[activeIndex].name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300">
                      {testimonials[activeIndex].name}
                    </h4>
                  </div>
                </div>
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[activeIndex].rating
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill={
                        i < testimonials[activeIndex].rating
                          ? 'currentColor'
                          : 'none'
                      }
                      id={`ego92m_${i}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {testimonials[activeIndex].text}
                </p>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-indigo-200 dark:border-indigo-800"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-indigo-200 dark:border-indigo-800"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4 flex justify-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`mx-1 h-2 w-2 rounded-full ${
                    index === activeIndex
                      ? 'bg-indigo-600 dark:bg-indigo-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  id={`qg4ops_${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
