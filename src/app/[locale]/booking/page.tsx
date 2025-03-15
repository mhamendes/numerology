"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { useLanguage } from "(components)/language-context";

export default function Booking() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");

  const services = [
    {
      id: "personal",
      name: t("personalReading"),
      price: "$99",
      description: t("personalReadingDescription"),
    },
    {
      id: "relationship",
      name: t("relationshipCompatibility"),
      price: "$149",
      description: t("relationshipCompatibilityDescription"),
    },
    {
      id: "business",
      name: t("businessNumerology"),
      price: "$199",
      description: t("businessNumerologyDescription"),
    },
    {
      id: "birthmap",
      name: t("birthMap"),
      price: "$49",
      description: t("birthMapDescription"),
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
    <div className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300"
          >
            {t("bookYourReading")}
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t("bookingDescription")}
          </p>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
              >
                1
              </div>
              <div className="ml-3">
                <p
                  className="font-medium text-indigo-700 dark:text-indigo-300"
                >
                  {t("selectService")}
                </p>
              </div>
            </div>
            <div
              className="hidden sm:block w-16 h-0.5 bg-gray-200 dark:bg-gray-700"
            ></div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
              >
                2
              </div>
              <div className="ml-3">
                <p
                  className="font-medium text-indigo-700 dark:text-indigo-300"
                >
                  {t("yourDetails")}
                </p>
              </div>
            </div>
            <div
              className="hidden sm:block w-16 h-0.5 bg-gray-200 dark:bg-gray-700"
            ></div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
              >
                3
              </div>
              <div className="ml-3">
                <p
                  className="font-medium text-indigo-700 dark:text-indigo-300"
                >
                  {t("confirmation")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedService === service.id ? "border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50" : "border-gray-200 dark:border-gray-700"}`}
                onClick={() => handleServiceSelect(service.id)}
                id={`nzi12j_${index}`}
              >
                <CardHeader className="pb-2" id={`wl3b9m_${index}`}>
                  <CardTitle
                    className="flex justify-between items-center"
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
              <CardTitle>{t("yourInformation")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("fullName")}
                    </label>
                    <Input
                      type="text"
                      placeholder={t("enterFullName")}
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
                      placeholder={t("enterYourEmail")}
                      className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("phoneNumber")}
                    </label>
                    <Input
                      type="tel"
                      placeholder={t("enterPhoneNumber")}
                      className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("dateOfBirth")}
                    </label>
                    <Input
                      type="date"
                      className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                {selectedService === "relationship" && (
                  <div
                    className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6"
                  >
                    <h3
                      className="text-lg font-medium text-indigo-700 dark:text-indigo-300 mb-4"
                    >
                      {t("partnerInformation")}
                    </h3>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          {t("partnersFullName")}
                        </label>
                        <Input
                          type="text"
                          placeholder={t("enterPartnersName")}
                          className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          {t("partnersDateOfBirth")}
                        </label>
                        <Input
                          type="date"
                          className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedService === "business" && (
                  <div
                    className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6"
                  >
                    <h3
                      className="text-lg font-medium text-indigo-700 dark:text-indigo-300 mb-4"
                    >
                      {t("businessInformation")}
                    </h3>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          {t("businessName")}
                        </label>
                        <Input
                          type="text"
                          placeholder={t("enterBusinessName")}
                          className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          {t("businessType")}
                        </label>
                        <Select>
                          <SelectTrigger
                            className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                          >
                            <SelectValue
                              placeholder={t("selectBusinessType")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">
                              {t("startup")}
                            </SelectItem>
                            <SelectItem value="small">
                              {t("smallBusiness")}
                            </SelectItem>
                            <SelectItem value="medium">
                              {t("mediumEnterprise")}
                            </SelectItem>
                            <SelectItem value="large">
                              {t("largeCorporation")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t("specificQuestions")}
                  </label>
                  <Textarea
                    placeholder={t("questionsPlaceholder")}
                    className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500 min-h-[100px]"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
                  >
                    {t("back")}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {t("continueToPayment")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="text-center">
            <CardHeader>
              <div
                className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4"
              >
                <CheckIcon
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                />
              </div>
              <CardTitle className="text-2xl">
                {t("bookingConfirmed")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("bookingThankYou")}
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
                    {t("nextSteps")}
                  </span>
                </div>
                <p
                  className="text-gray-600 dark:text-gray-300 text-sm"
                >
                  {selectedService === "birthmap"
                    ? t("birthMapDelivery")
                    : t("numerologistContact")}
                </p>
              </div>
              <Button
                onClick={() => setStep(1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {t("bookAnother")}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
