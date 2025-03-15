"use client";

import React from "react";
import { HeroSection } from "(components)/hero-section";
import { ServicesSection } from "(components)/services-section";
import { TestimonialsSection } from "(components)/testimonials-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, SparklesIcon } from "lucide-react";
import QA from "@/app/[locale]/qa/page";
import { useLanguage } from "(components)/language-context";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      <HeroSection />

      {/* About Numerology Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300">
            {t("discoverPath")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("numerologyDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                {t("lifePathNumber")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("lifePathDescription")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                {t("destinyNumber")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("destinyDescription")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                {t("soulUrgeNumber")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("soulUrgeDescription")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full text-lg">
            {t("calculateYourNumbers")}
          </Button>
        </div>
      </section>

      <ServicesSection />
      <TestimonialsSection />

      {/* FAQ Section on Home Page */}
      <div>
        <QA />
      </div>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-indigo-600 dark:bg-indigo-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {t("beginJourney")}
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            {t("unlockHiddenMeanings")}
          </p>
          <Button className="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-6 rounded-full text-lg">
            {t("getPersonalReading")}
          </Button>
        </div>
      </section>
    </div>
  );
}
