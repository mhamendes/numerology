"use client"

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  StarIcon,
  SparklesIcon,
  HeartIcon,
  GlobeIcon,
  CalendarIcon,
  BookIcon,
} from "lucide-react";
import { useLanguage } from "(components)/language-context";

export function ServicesSection() {
  const { t } = useLanguage();

  // Services are now defined inside the component to access the t function
  const services = [
    {
      title: t("birthMap"),
      description: t("birthMapDescription"),
      price: "$49",
      features: [
        t("motivationNumber"),
        t("expressionNumber"),
        t("birthDayNumber"),
        t("hiddenTalent"),
        t("conjugalVibration"),
        t("hiddenTendency"),
        t("destinyNumberTitle"),
        t("missionNumber"),
        t("karmicLessons"),
        t("lifeCycles"),
        t("decisiveMoments"),
        t("invertedTriangle"),
        t("personalYears"),
        t("monthlyGuidance"),
      ],

      icon: <BookIcon className="h-6 w-6 text-purple-500" />,
      popular: false,
    },
    {
      title: t("personalReading"),
      description: t("personalReadingDescription"),
      price: "$99",
      features: [
        t("lifePathNumber"),
        t("destinyNumber"),
        t("soulUrgeNumber"),
        t("personalityNumber"),
        t("currentYearForecast"),
        t("sixtyMinuteConsultation"),
      ],

      icon: <StarIcon className="h-6 w-6 text-indigo-500" />,
      popular: false,
    },
    {
      title: t("relationshipCompatibility"),
      description: t("relationshipCompatibilityDescription"),
      price: "$149",
      features: [
        t("individualNumberAnalysis"),
        t("compatibilityAssessment"),
        t("relationshipStrengths"),
        t("communicationStyle"),
        t("relationshipForecast"),
        t("ninetyMinuteJointConsultation"),
      ],

      icon: <HeartIcon className="h-6 w-6 text-pink-500" />,
      popular: true,
    },
    {
      title: t("businessNumerology"),
      description: t("businessNumerologyDescription"),
      price: "$199",
      features: [
        t("businessNameAnalysis"),
        t("optimalLaunchDate"),
        t("teamCompatibility"),
        t("strategicTiming"),
        t("growthOpportunity"),
        t("oneHundredTwentyMinuteConsultation"),
      ],

      icon: <GlobeIcon className="h-6 w-6 text-blue-500" />,
      popular: false,
    },
  ];

  // Reorder services to make Birth Map first
  const orderedServices = [...services].sort((a, b) => {
    if (a.title === t("birthMap")) return -1;
    if (b.title === t("birthMap")) return 1;
    return 0;
  });

  return (
    <section className="py-20 px-4 bg-indigo-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300"
          >
            {t("ourNumerologyServices")}
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t("servicesDescription")}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {orderedServices.map((service, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                service.popular
                  ? "border-indigo-400 dark:border-indigo-500 shadow-lg"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              id={`nzi12j_${index}`}
            >
              {service.popular && (
                <div className="absolute top-0 right-0" id={`tqec8a_${index}`}>
                  <div
                    className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg"
                    id={`ppd2zf_${index}`}
                  >
                    {t("mostPopular")}
                  </div>
                </div>
              )}

              <CardHeader id={`wdqywt_${index}`}>
                <div className="flex items-center mb-2" id={`a2a86f_${index}`}>
                  {service.icon}
                  <CardTitle className="text-xl ml-2" id={`fet957_${index}`}>
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription id={`be4veh_${index}`}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent id={`cunpd1_${index}`}>
                <div className="mb-6" id={`454msx_${index}`}>
                  <span
                    className="text-3xl font-bold text-indigo-700 dark:text-indigo-400"
                    id={`f9clfl_${index}`}
                  >
                    {service.price}
                  </span>
                  <span
                    className="text-gray-500 dark:text-gray-400"
                    id={`mhgo78_${index}`}
                  >
                    {" "}
                    / {t("session")}
                  </span>
                </div>
                <ul className="space-y-3 mb-8" id={`qjhhx8_${index}`}>
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start"
                      id={`hpkh85_${idx}`}
                    >
                      <CheckIcon
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        id={`sk5f32_${idx}`}
                      />

                      <span
                        className="text-gray-600 dark:text-gray-300"
                        id={`isrkhk_${idx}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    service.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-indigo-400 dark:border-indigo-500"
                  }`}
                  id={`pyggwy_${index}`}
                >
                  {service.title === t("birthMap")
                    ? t("calculateNow")
                    : t("bookNow")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3
            className="text-2xl font-semibold mb-4 text-indigo-800 dark:text-indigo-300"
          >
            {t("needCustom")}
          </h3>
          <p
            className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
          >
            {t("customDescription")}
          </p>
          <Button
            variant="outline"
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
          >
            {t("contactCustom")}
          </Button>
        </div>
      </div>
    </section>
  );
}
