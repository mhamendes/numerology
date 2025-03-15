"use client"

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "(components)/language-context";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      text: "My numerology reading was incredibly accurate and insightful. It helped me understand why I've been drawn to certain career paths and provided clarity on my life purpose. I'm now making decisions with more confidence!",
    },
    {
      name: "Michael Chen",
      location: "San Francisco, CA",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      text: "I was skeptical at first, but my business numerology consultation was eye-opening. The insights about optimal timing for my product launch were spot on, and we've seen tremendous success as a result.",
    },
    {
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      text: "The relationship compatibility reading helped my partner and I understand our communication patterns and why we approach problems differently. It's been transformative for our relationship.",
    },
    {
      name: "David Thompson",
      location: "Austin, TX",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 4,
      text: "I've had several numerology readings before, but this one was by far the most detailed and accurate. The insights about my life path challenges were particularly helpful in navigating a recent career transition.",
    },
    {
      name: "Jennifer Adams",
      location: "Seattle, WA",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      text: "The Birth Map reading was life-changing! I finally understand my recurring patterns and how to work with my natural strengths. The personal year forecast has been spot-on with predicting major life events.",
    },
    {
      name: "Robert Wilson",
      location: "Denver, CO",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      text: "As a business owner, the numerology insights about optimal timing and team dynamics have been invaluable. I've implemented several recommendations and seen measurable improvements in our operations.",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300"
          >
            {t("whatClientsSay")}
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t("testimonialsDescription")}
          </p>
        </div>

        <div className="relative">
          {/* Desktop View - Grid */}
          <div
            className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900 shadow-md hover:shadow-lg transition-shadow"
                id={`sl8h12_${index}`}
              >
                <CardContent className="p-6" id={`rro1bp_${index}`}>
                  <div
                    className="flex items-center mb-4"
                    id={`1sj34l_${index}`}
                  >
                    <Avatar className="h-12 w-12 mr-4" id={`y489dt_${index}`}>
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                        id={`a0zft0_${index}`}
                      />

                      <AvatarFallback id={`gdsqoc_${index}`}>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div id={`0k1bbq_${index}`}>
                      <h4
                        className="font-semibold text-indigo-800 dark:text-indigo-300"
                        id={`k8pyzj_${index}`}
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        className="text-sm text-gray-500 dark:text-gray-400"
                        id={`p8jmhu_${index}`}
                      >
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4" id={`g1gg59_${index}`}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill={i < testimonial.rating ? "currentColor" : "none"}
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
            <Card
              className="bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900 shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                    />

                    <AvatarFallback>
                      {testimonials[activeIndex].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4
                      className="font-semibold text-indigo-800 dark:text-indigo-300"
                    >
                      {testimonials[activeIndex].name}
                    </h4>
                    <p
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[activeIndex].rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill={
                        i < testimonials[activeIndex].rating
                          ? "currentColor"
                          : "none"
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

            <div className="flex justify-center mt-6 space-x-4">
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

            <div className="flex justify-center mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`mx-1 h-2 w-2 rounded-full ${
                    index === activeIndex
                      ? "bg-indigo-600 dark:bg-indigo-400"
                      : "bg-gray-300 dark:bg-gray-600"
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
