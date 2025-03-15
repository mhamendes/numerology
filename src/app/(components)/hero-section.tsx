"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "(components)/language-context";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-indigo-300 dark:bg-indigo-700 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-purple-300 dark:bg-purple-700 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-300 dark:bg-pink-700 blur-3xl"></div>
      </div>

      {/* Numbers floating in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
          <div
            key={index}
            className="absolute text-6xl md:text-8xl font-bold text-indigo-200 dark:text-indigo-800 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${
                5 + Math.random() * 10
              }s infinite ease-in-out`,
            }}
            id={`3vwjx8_${index}`}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-indigo-900 dark:text-indigo-100">
            {t("unlockDestiny")}{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {t("numerology")}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
            {t("discoverHidden")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full text-lg">
              {t("premiumAnalysis")}
            </Button>
            <Button
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950 px-8 py-6 rounded-full text-lg"
              asChild
            >
              <a href="/birth-map">{t("getBirthMap")}</a>
            </Button>
          </div>
        </div>

        <div className="md:w-1/2 md:pl-12">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900 shadow-xl">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center text-indigo-800 dark:text-indigo-300">
                {t("calculateLifePath")}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("fullName")}
                  </label>
                  <Input
                    type="text"
                    placeholder={t("enterFullName")}
                    className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("birthDate")}
                  </label>
                  <Input
                    type="date"
                    className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5"
                >
                  {t("revealNumbers")}
                </Button>
              </form>
              <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
                {t("discoverDestiny")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  );
}
