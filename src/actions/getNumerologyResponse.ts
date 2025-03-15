'use server';
import 'server-only';

import { z } from 'zod';

import { getCompatibleNumbersInfo } from '@/lib/numerology/compatibleNumbers';
import { getConjugalVibrationInfo } from '@/lib/numerology/conjugalVibration';
import { getFavorableDays } from '@/lib/numerology/favorableDays';
import { invertedTriangles } from '@/lib/numerology/invertedTriangles';
import {
  getAscensionDegree,
  getBornDatesData,
  getChallenges,
  getDecisiveMoments,
  getDestinyNumber,
  getExpressionNumber,
  getFavorableColors,
  getHiddenTalentNumber,
  getHiddenTendencies,
  getImpressionNumber,
  getKarmicDebts,
  getKarmicLessons,
  getLifeCycles,
  getMissionNumber,
  getMotivationNumber,
  getPersonalDays,
  getPersonalMonths,
  getPersonalYears,
  getSubconsciousResponse,
} from '@/lib/numerology/numbers';
import {
  DefaultNumbers,
  KarmicDebtNumbers,
  OneToNineNumbers,
} from '@/lib/numerology/types';

const schema = z.object({
  fullName: z.string().min(2, {
    message: 'fullName',
  }),
  birthday: z.date({ required_error: 'birthday' }),
  password: z.string().min(8, {
    message: 'password',
  }),
});

export async function actionGetNumerologyResponse({
  fullName,
  birthday,
  password,
}: z.infer<typeof schema>) {
  if (password !== 'braga341314') throw new Error('wrong-password');

  return getNumerologyResponse({ fullName, birthday });
}

export type NumerologyResponse = Awaited<
  ReturnType<typeof getNumerologyResponse>
>;

export async function getNumerologyResponse({
  fullName,
  birthday,
}: Omit<z.infer<typeof schema>, 'password'>) {
  const motivationNumber = getMotivationNumber({ fullName });
  const impressionNumber = getImpressionNumber({ fullName });
  const expressionNumber = getExpressionNumber({ fullName });
  const { birthdayVibration, psychicNumber } = getBornDatesData({ birthday });
  const destinyNumber = getDestinyNumber({ birthday });
  const missionNumber = getMissionNumber({ fullName, birthday });
  const hiddenTalentNumber = getHiddenTalentNumber({ fullName });
  const karmicLessons = getKarmicLessons({ fullName });
  const karmicDebts = getKarmicDebts({ fullName, birthday });
  const hiddenTendencies = getHiddenTendencies({ fullName });
  const subconsciousResponse = getSubconsciousResponse({ fullName });
  const lifeCycles = getLifeCycles({ birthday });
  const challenges = getChallenges({ birthday });
  const decisiveMoments = getDecisiveMoments({ birthday });
  const personalYears = getPersonalYears({ birthday });
  const personalMonths = getPersonalMonths({ birthday });
  const personalDays = getPersonalDays({ birthday });
  const ascensionDegree = getAscensionDegree({ fullName });
  const favorableColors = getFavorableColors({ fullName });
  const favorableDays = getFavorableDays({ birthday });
  const compatibleNumbers = getCompatibleNumbersInfo({ birthday });
  const conjugalVibration = getConjugalVibrationInfo({ fullName, birthday });
  const invertedTrianglesData = invertedTriangles({ fullName, birthday });

  return {
    motivationNumber: `${motivationNumber}` as DefaultNumbers,
    impressionNumber: `${impressionNumber}` as OneToNineNumbers,
    expressionNumber: `${expressionNumber}` as DefaultNumbers,
    birthdayVibration,
    psychicNumber: `${psychicNumber}` as OneToNineNumbers,
    destinyNumber: `${destinyNumber}` as DefaultNumbers,
    missionNumber: `${missionNumber}` as DefaultNumbers,
    hiddenTalentNumber: `${hiddenTalentNumber}` as DefaultNumbers,
    karmicLessons: karmicLessons.map(
      (lesson) => `${lesson}` as OneToNineNumbers
    ) as OneToNineNumbers[],
    karmicDebts: karmicDebts.map(
      (lesson) => `${lesson}` as KarmicDebtNumbers
    ) as KarmicDebtNumbers[],
    hiddenTendencies: hiddenTendencies.map(
      (tendency) => `${tendency}` as OneToNineNumbers
    ) as OneToNineNumbers[],
    subconsciousResponse: `${subconsciousResponse}` as OneToNineNumbers,
    lifeCycles,
    challenges,
    decisiveMoments,
    ascensionDegree,
    favorableColors,
    favorableDays,
    compatibleNumbers,
    conjugalVibration,
    invertedTrianglesData,
    personalYears,
    personalMonths,
    personalDays,
  };
}
