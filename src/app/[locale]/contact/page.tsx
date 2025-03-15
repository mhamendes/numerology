"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { useLanguage } from "(components)/language-context";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300"
          >
            {t("contactUs")}
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t("contactDescription")}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <h3
              className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400"
            >
              {t("sendMessage")}
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t("yourName")}
                </label>
                <Input
                  type="text"
                  placeholder={t("enterYourName")}
                  className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
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
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t("subject")}
                </label>
                <Input
                  type="text"
                  placeholder={t("whatIsYourMessageAbout")}
                  className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t("message")}
                </label>
                <Textarea
                  placeholder={t("enterYourMessage")}
                  className="border-indigo-200 dark:border-indigo-800 focus:ring-indigo-500 min-h-[150px]"
                />
              </div>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {t("sendMessageBtn")}
              </Button>
            </form>
          </div>

          <div>
            <h3
              className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400"
            >
              {t("contactInformation")}
            </h3>
            <div className="space-y-6">
              <Card
                className="border border-indigo-100 dark:border-indigo-900"
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div
                      className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4"
                    >
                      <MailIcon
                        className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                      />
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1"
                      >
                        {t("emailUs")}
                      </h4>
                      <p
                        className="text-gray-600 dark:text-gray-300"
                      >
                        contact@cosmicnumbers.com
                      </p>
                      <p
                        className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                      >
                        {t("emailResponse")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border border-indigo-100 dark:border-indigo-900"
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div
                      className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4"
                    >
                      <PhoneIcon
                        className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                      />
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1"
                      >
                        {t("callUs")}
                      </h4>
                      <p
                        className="text-gray-600 dark:text-gray-300"
                      >
                        (555) 123-4567
                      </p>
                      <p
                        className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                      >
                        {t("callHours")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border border-indigo-100 dark:border-indigo-900"
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div
                      className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4"
                    >
                      <MapPinIcon
                        className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                      />
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1"
                      >
                        {t("visitUs")}
                      </h4>
                      <p
                        className="text-gray-600 dark:text-gray-300"
                      >
                        123 Cosmic Way, Universe City
                      </p>
                      <p
                        className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                      >
                        {t("byAppointment")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
