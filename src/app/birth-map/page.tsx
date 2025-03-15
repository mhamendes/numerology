"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookIcon, CheckIcon, CalendarIcon } from "lucide-react";
import { useLanguage } from "(components)/language-context";

export default function BirthMap() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300"
          >
            {t("yourBirthMap")}
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t("birthMapPageDescription")}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div>
            <Card
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900 shadow-xl h-full"
            >
              <CardHeader>
                <div className="flex items-center mb-4">
                  <BookIcon
                    className="h-6 w-6 text-purple-500 mr-2"
                  />

                  <CardTitle
                    className="text-2xl text-indigo-800 dark:text-indigo-300"
                  >
                    {t("birthMap")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {t("birthMapDescription")}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("birthMapDescription")}
                </p>
                <div className="pt-4">
                  <div className="flex items-center mb-2">
                    <span
                      className="text-2xl font-bold text-indigo-700 dark:text-indigo-400"
                    >
                      $49
                    </span>
                    <span
                      className="text-gray-500 dark:text-gray-400 ml-2"
                    >
                      {t("oneTimePayment")}
                    </span>
                  </div>
                  <p
                    className="text-sm text-indigo-600 dark:text-indigo-400"
                  >
                    {t("deliveryNotice")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {step === 1 ? (
              <Card
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900 shadow-xl"
              >
                <CardHeader>
                  <CardTitle
                    className="text-xl text-indigo-800 dark:text-indigo-300"
                  >
                    {t("getBirthMapTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t("fullName")}
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t("enterFullName")}
                        className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t("birthDate")}
                      </label>
                      <Input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t("emailAddress")}
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("enterYourEmail")}
                        className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 mt-4"
                    >
                      {t("continueToPayment")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900 shadow-xl text-center"
              >
                <CardHeader>
                  <div
                    className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckIcon
                      className="h-8 w-8 text-green-600 dark:text-green-400"
                    />
                  </div>
                  <CardTitle
                    className="text-2xl text-indigo-800 dark:text-indigo-300"
                  >
                    {t("orderThankYou")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("orderReceived")} {formData.email} {t("withinHours")}
                  </p>
                  <div
                    className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-lg mb-6 inline-block"
                  >
                    <div
                      className="flex items-center justify-center mb-2"
                    >
                      <CalendarIcon
                        className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2"
                      />

                      <span
                        className="font-medium text-indigo-700 dark:text-indigo-300"
                      >
                        {t("expectedDelivery")}
                      </span>
                    </div>
                    <p
                      className="text-gray-600 dark:text-gray-300 text-sm"
                    >
                      {t("deliveryTime")}
                    </p>
                  </div>
                  <Button
                    onClick={() => setStep(1)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {t("orderAnother")}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h3
            className="text-2xl font-semibold mb-6 text-indigo-800 dark:text-indigo-300"
          >
            {t("whatsIncluded")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("motivationNumber")}
                  </span>{" "}
                  {t("motivationDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("expressionNumber")}
                  </span>{" "}
                  {t("expressionDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("birthDayNumber")}
                  </span>{" "}
                  {t("birthDayDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("hiddenTalent")}
                  </span>{" "}
                  {t("hiddenTalentDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("conjugalVibration")}
                  </span>{" "}
                  {t("conjugalDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("hiddenTendency")}
                  </span>{" "}
                  {t("hiddenTendencyDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("destinyNumberTitle")}
                  </span>{" "}
                  {t("destinyNumberDesc")}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("missionNumber")}
                  </span>{" "}
                  {t("missionDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("karmicLessons")}
                  </span>{" "}
                  {t("karmicDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("lifeCycles")}
                  </span>{" "}
                  {t("lifeCyclesDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("decisiveMoments")}
                  </span>{" "}
                  {t("decisiveMomentsDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("invertedTriangle")}
                  </span>{" "}
                  {t("invertedTriangleDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("personalYears")}
                  </span>{" "}
                  {t("personalYearsDesc")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                />

                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">
                    {t("monthlyGuidance")}
                  </span>{" "}
                  {t("monthlyGuidanceDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
