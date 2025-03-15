"use client"

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, SparklesIcon } from "lucide-react";
import { useLanguage } from "(components)/language-context";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300"
          >
            {t("aboutCosmicNumbers")}
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t("aboutDescription")}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div>
            <h3
              className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400"
            >
              {t("ourMission")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("missionText1")}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {t("missionText2")}
            </p>
          </div>
          <div>
            <h3
              className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400"
            >
              {t("ourApproach")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("approachText1")}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {t("approachText2")}
            </p>
          </div>
        </div>

        <div
          className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-8 mb-16"
        >
          <h3
            className="text-2xl font-semibold mb-6 text-center text-indigo-700 dark:text-indigo-400"
          >
            {t("ourExpertise")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="bg-white/90 dark:bg-gray-800/90 border border-indigo-100 dark:border-indigo-900"
            >
              <CardContent className="p-6 text-center">
                <div
                  className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <StarIcon
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                  />
                </div>
                <h4
                  className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300"
                >
                  {t("certifiedNumerologists")}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("certifiedDesc")}
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-white/90 dark:bg-gray-800/90 border border-indigo-100 dark:border-indigo-900"
            >
              <CardContent className="p-6 text-center">
                <div
                  className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <SparklesIcon
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                  />
                </div>
                <h4
                  className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300"
                >
                  {t("personalizedApproach")}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("personalizedDesc")}
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-white/90 dark:bg-gray-800/90 border border-indigo-100 dark:border-indigo-900"
            >
              <CardContent className="p-6 text-center">
                <div
                  className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <StarIcon
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                  />
                </div>
                <h4
                  className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300"
                >
                  {t("practicalGuidance")}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("practicalDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h3
            className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400"
          >
            {t("beginYourJourney")}
          </h3>
          <p
            className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto"
          >
            {t("journeyText")}
          </p>
        </div>
      </div>
    </div>
  );
}
