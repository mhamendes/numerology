import { describe, expect, test, vi } from 'vitest';

import {
  getCompatibleNumbersInfo,
  getCompatibleNumbersValue,
} from './compatibleNumbers';
import {
  getConjugalVibrationInfo,
  getConjugalVibrationNumber,
} from './conjugalVibration';
import { getFavorableDays } from './favorableDays';
import {
  getAscensionDegree,
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
} from './numbers';

const exampleFullName = 'Yara Araújo D`Alessandro';

describe('Numerology', () => {
  test.each([
    { fullName: 'Yara Araújo D`Alessandro', expected: 4 },
    { fullName: 'Marcelo Azevedo da Trindade', expected: 7 },
  ])(
    `should return the impression number for $fullName}`,
    ({ fullName, expected }) => {
      expect(getImpressionNumber({ fullName })).toBe(expected);
    }
  );

  test.each([
    { fullName: 'Yara Araújo D`Alessandro', expected: 7 },
    { fullName: 'Marcelo Azevedo da Trindade', expected: 3 },
  ])(
    'should return the motivation number for $fullName',
    ({ fullName, expected }) => {
      expect(getMotivationNumber({ fullName })).toBe(expected);
    }
  );

  test.each([
    { fullName: 'Yara Araújo D`Alessandro', expected: 11 },
    { fullName: 'Marcelo Azevedo da Trindade', expected: 1 },
  ])(
    'should return the expression number for $fullName',
    ({ fullName, expected }) => {
      expect(getExpressionNumber({ fullName })).toBe(expected);
    }
  );

  test.each([
    { fullName: 'Yara Araújo D`Alessandro', expected: 9 },
    { fullName: 'Marcelo Azevedo da Trindade', expected: 4 },
  ])(
    'should return the hidden talent number for $fullName',
    ({ fullName, expected }) => {
      expect(getHiddenTalentNumber({ fullName })).toBe(expected);
    }
  );

  test.each([
    { fullName: 'Yara Araújo D`Alessandro', expected: [9] },
    { fullName: 'Marcelo Azevedo da Trindade', expected: [8, 9] },
  ])(`should return the karmic lessons $fullName`, ({ fullName, expected }) => {
    expect(getKarmicLessons({ fullName })).toEqual(expected);
  });

  test.each([
    { fullName: 'Yara Araújo D`Alessandro', expected: 'descendent' },
    { fullName: 'Marcelo Azevedo da Trindade', expected: 'ascendent' },
  ])(
    'should return the ascension degree for $fullName',
    ({ fullName, expected }) => {
      expect(getAscensionDegree({ fullName })).toBe(expected);
    }
  );

  test.each([
    { birthday: new Date('1970-04-08'), expected: 11 },
    { birthday: new Date('1940-06-11'), expected: 22 },
    { birthday: new Date('1966-03-17'), expected: 6 },
    { birthday: new Date('1962-09-22'), expected: 22 },
    { birthday: new Date('1976-05-21'), expected: 4 },
    { birthday: new Date('1991-05-18'), expected: 7 },
  ])(
    'should return the destiny number for birthday $birthday',
    ({ birthday, expected }) => {
      expect(getDestinyNumber({ birthday })).toBe(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1970-04-08'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: 22,
    },
    {
      birthday: new Date('1940-06-11'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: 6,
    },
    {
      birthday: new Date('1966-03-17'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: 8,
    },
    {
      birthday: new Date('1962-09-22'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: 6,
    },
    {
      birthday: new Date('1976-05-21'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: 6,
    },
    {
      birthday: new Date('1991-05-18'),
      fullName: 'Marcelo Azevedo da Trindade',
      expected: 8,
    },
  ])(
    'should return the mission number for birthday $birthday and fullName $fullName',
    ({ birthday, fullName, expected }) => {
      expect(getMissionNumber({ fullName, birthday })).toBe(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1970-04-16'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: [16, 16, 19],
    },
    {
      birthday: new Date('1940-06-11'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: [16],
    },
    {
      birthday: new Date('1966-03-13'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: [13, 16],
    },
    {
      birthday: new Date('1976-05-21'),
      fullName: 'Yara Araújo D`Alessandro',
      expected: [13, 16],
    },
    {
      birthday: new Date('1991-05-18'),
      fullName: 'Marcelo Azevedo da Trindade',
      expected: [16, 19],
    },
  ])(
    'should return the karmic debts number for birthday $birthday and fullName $fullName',
    ({ birthday, fullName, expected }) => {
      expect(getKarmicDebts({ fullName, birthday })).toEqual(expected);
    }
  );

  test.each([
    { fullName: 'Yara Araújo D`Alessandro', expected: [1] },
    { fullName: 'Marcelo Azevedo da Trindade', expected: [1, 4, 5] },
  ])(
    'should return the correct hidden tendencies for $fullName',
    ({ fullName, expected }) => {
      expect(getHiddenTendencies({ fullName })).toEqual(expected);
    }
  );

  test.each([
    { fullName: 'Yara Araújo D`Alessandro', expected: 8 },
    { fullName: 'Marcelo Azevedo da Trindade', expected: 7 },
  ])(
    'should return the correct subconcious response for $fullName',
    ({ fullName, expected }) => {
      expect(getSubconsciousResponse({ fullName })).toEqual(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1992-06-18'),
      expected: {
        first: {
          energyNumber: '6',
          start: 1992,
          end: 2020,
        },
        second: {
          energyNumber: '9',
          start: 2020,
          end: 2047,
        },
        third: {
          energyNumber: '3',
          start: 2047,
        },
      },
    },
    {
      birthday: new Date('1991-05-18'),
      expected: {
        first: {
          energyNumber: '5',
          start: 1991,
          end: 2021,
        },
        second: {
          energyNumber: '9',
          start: 2021,
          end: 2048,
        },
        third: {
          energyNumber: '2',
          start: 2048,
        },
      },
    },
  ])(
    'should return the correct life cycles $birthday',
    ({ birthday, expected }) => {
      expect(getLifeCycles({ birthday })).toEqual(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1992-06-18'),
      expected: {
        first: {
          end: 2020,
          number: '3',
          start: 1992,
        },
        main: {
          end: undefined,
          number: '3',
          start: 2047,
        },
        second: {
          end: 2047,
          number: '6',
          start: 2020,
        },
      },
    },
    {
      birthday: new Date('1991-05-18'),
      expected: {
        first: {
          end: 2021,
          number: '4',
          start: 1991,
        },
        main: {
          end: undefined,
          number: '3',
          start: 2048,
        },
        second: {
          end: 2048,
          number: '7',
          start: 2021,
        },
      },
    },
  ])(
    'should return the correct challenge numbers for $birthday',
    ({ birthday, expected }) => {
      expect(getChallenges({ birthday })).toEqual(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1992-06-18'),
      expected: {
        first: {
          number: '6',
          start: 1992,
          end: 2020,
        },
        second: {
          number: '3',
          start: 2020,
          end: 2029,
        },
        third: {
          number: '9',
          start: 2029,
          end: 2038,
        },
        fourth: {
          number: '9',
          start: 2038,
        },
      },
    },
    {
      birthday: new Date('1991-05-18'),
      expected: {
        first: {
          number: '5',
          start: 1991,
          end: 2021,
        },
        second: {
          number: '11',
          start: 2021,
          end: 2030,
        },
        third: {
          number: '7',
          start: 2030,
          end: 2039,
        },
        fourth: {
          number: '7',
          start: 2039,
        },
      },
    },
  ])(
    'should return the correct decisive moments for $birthday',
    ({ birthday, expected }) => {
      expect(getDecisiveMoments({ birthday })).toEqual(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1992-01-18'),
      yearToday: 2024,
      monthToday: 2,
      expected: [
        {
          year: 2024,
          number: '9',
        },
        {
          year: 2025,
          number: '1',
        },
        {
          year: 2026,
          number: '2',
        },
        {
          year: 2027,
          number: '3',
        },
        {
          year: 2028,
          number: '4',
        },
        {
          year: 2029,
          number: '5',
        },
        {
          year: 2030,
          number: '6',
        },
        {
          year: 2031,
          number: '7',
        },
        {
          year: 2032,
          number: '8',
        },
      ],
    },
    {
      birthday: new Date('1991-05-18'),
      yearToday: 2024,
      monthToday: 2,
      expected: [
        {
          year: 2024,
          number: '3',
          end: '17/05/2024',
        },
        {
          year: 2024,
          number: '4',
        },
        {
          year: 2025,
          number: '5',
        },
        {
          year: 2026,
          number: '6',
        },
        {
          year: 2027,
          number: '7',
        },
        {
          year: 2028,
          number: '8',
        },
        {
          year: 2029,
          number: '9',
        },
        {
          year: 2030,
          number: '1',
        },
        {
          year: 2031,
          number: '2',
        },
        {
          year: 2032,
          number: '3',
        },
      ],
    },
    {
      birthday: new Date('1992-06-22'),
      monthToday: 8,
      yearToday: 2024,
      expected: [
        {
          year: 2024,
          number: '9',
        },
        {
          year: 2025,
          number: '1',
        },
        {
          year: 2026,
          number: '2',
        },
        {
          year: 2027,
          number: '3',
        },
        {
          year: 2028,
          number: '4',
        },
        {
          year: 2029,
          number: '5',
        },
        {
          year: 2030,
          number: '6',
        },
        {
          year: 2031,
          number: '7',
        },
        {
          year: 2032,
          number: '8',
        },
      ],
    },
  ])(
    'should return correct personal year for $birthday',
    ({ birthday, yearToday, monthToday, expected }) => {
      const mockedToday = new Date(yearToday, monthToday, 19);

      vi.useFakeTimers();
      vi.setSystemTime(mockedToday);

      expect(getPersonalYears({ birthday })).toEqual(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1992-06-22'),
      dayToday: 23,
      monthToday: 7,
      yearToday: 2024,
      expected: [
        {
          year: 2024,
          month: 8,
          number: 8,
        },
        {
          year: 2024,
          month: 9,
          number: 9,
        },
        {
          year: 2024,
          month: 10,
          number: 1,
        },
        {
          year: 2024,
          month: 11,
          number: 2,
        },
        {
          year: 2024,
          month: 12,
          number: 3,
        },
        {
          year: 2025,
          month: 1,
          number: 1,
        },
        {
          year: 2025,
          month: 2,
          number: 11,
        },
        {
          year: 2025,
          month: 3,
          number: 3,
        },
        {
          year: 2025,
          month: 4,
          number: 4,
        },
        {
          year: 2025,
          month: 5,
          number: 5,
        },
        {
          year: 2025,
          month: 6,
          number: 6,
          end: '22/06/2025',
        },
        {
          year: 2025,
          month: 6,
          number: 7,
        },
        {
          year: 2025,
          month: 7,
          number: 8,
        },
      ],
    },
  ])(
    'should return correct personal month for $birthday',
    ({ birthday, yearToday, monthToday, dayToday, expected }) => {
      const mockedToday = new Date(yearToday, monthToday, dayToday);

      vi.useFakeTimers();
      vi.setSystemTime(mockedToday);

      expect(getPersonalMonths({ birthday })).toEqual(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1992-06-22'),
      dayToday: 23,
      monthToday: 7,
      yearToday: 2024,
      expected: [
        {
          year: 2024,
          month: 8,
          monthNumber: '8',
          days: [
            9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7, 8, 9, 1, 11, 3,
            4, 5, 6, 7, 8, 9, 1, 11, 3,
          ],
        },
        {
          year: 2024,
          month: 9,
          monthNumber: '9',
          days: [
            1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7, 8, 9, 1, 11, 3, 4,
            5, 6, 7, 8, 9, 1, 11, 3,
          ],
        },
        {
          year: 2024,
          month: 10,
          monthNumber: '1',
          days: [
            2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5,
            6, 7, 8, 9, 1, 11, 3, 4, 5,
          ],
        },
        {
          year: 2024,
          month: 11,
          monthNumber: '2',
          days: [
            3, 4, 5, 6, 7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6,
            7, 8, 9, 1, 11, 3, 4, 5,
          ],
        },
        {
          year: 2024,
          month: 12,
          monthNumber: '3',
          days: [
            4, 5, 6, 7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7,
            8, 9, 1, 11, 3, 4, 5, 6, 7,
          ],
        },
        {
          year: 2025,
          month: 1,
          monthNumber: '1',
          days: [
            2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5,
            6, 7, 8, 9, 1, 11, 3, 4, 5,
          ],
        },
        {
          year: 2025,
          month: 2,
          monthNumber: '11',
          days: [
            3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7, 8, 9, 1, 11, 3, 4, 5, 6,
            7, 8, 9, 1, 11, 3,
          ],
        },
        {
          year: 2025,
          month: 3,
          monthNumber: '3',
          days: [
            4, 5, 6, 7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7,
            8, 9, 1, 11, 3, 4, 5, 6, 7,
          ],
        },
        {
          year: 2025,
          month: 4,
          monthNumber: '4',
          days: [
            5, 6, 7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7, 8,
            9, 1, 11, 3, 4, 5, 6, 7,
          ],
        },
        {
          year: 2025,
          month: 5,
          monthNumber: '5',
          days: [
            6, 7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7, 8, 9,
            1, 11, 3, 4, 5, 6, 7, 8, 9,
          ],
        },
        {
          year: 2025,
          month: 6,
          monthNumber: '6,7',
          days: [
            7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7, 8, 9, 11,
            3, 4, 5, 6, 7, 8, 9, 1,
          ],
        },
        {
          year: 2025,
          month: 7,
          monthNumber: '8',
          days: [
            9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7, 8, 9, 1, 11, 3,
            4, 5, 6, 7, 8, 9, 1, 11, 3,
          ],
        },
      ],
    },
  ])(
    'should return correct personal day for $birthday',
    ({ birthday, yearToday, monthToday, dayToday, expected }) => {
      const mockedToday = new Date(yearToday, monthToday, dayToday);

      vi.useFakeTimers();
      vi.setSystemTime(mockedToday);
      expect(getPersonalDays({ birthday })).toEqual(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1992-06-18'),
      expected: [5, 6, 12, 17, 23, 28],
    },
    {
      birthday: new Date('1992-02-15'),
      expected: [3, 6, 12, 15, 21, 24, 30],
    },
    {
      birthday: new Date('1991-05-18'),
      expected: [5, 6, 12, 17, 23, 28],
    },
  ])(
    `should return the correct favorable days for birthday $birthday`,
    ({ birthday, expected }) => {
      expect(getFavorableDays({ birthday })).toEqual(expected);
    }
  );

  test.each([
    {
      birthday: new Date('1992-06-26'),
      expectedNumber: 8,
      expectedInfo: {
        info: {
          compatible: [2, 3, 9],
          neutral: [1, 6],
          incompatible: [4, 5, 7, 8],
        },
        value: '8',
      },
    },
    {
      birthday: new Date('1991-05-18'),
      expectedNumber: 9,
      expectedInfo: {
        info: {
          compatible: [1, 2, 3, 5, 6, 8, 9],
          neutral: [4, 7],
          incompatible: [],
        },
        value: '9',
      },
    },
  ])(
    'should return the correct compatible numbers for $birthday',
    ({ birthday, expectedNumber, expectedInfo }) => {
      expect(getCompatibleNumbersValue({ birthday })).toBe(expectedNumber);
      expect(getCompatibleNumbersInfo({ birthday })).toEqual(expectedInfo);
    }
  );

  test.each([
    {
      birthday: new Date('1970-04-08'),
      fullName: exampleFullName,
      expectedNumber: 4,
      expectedInfo: {
        info: {
          vibrate: [6],
          attracts: [1, 8],
          oposes: [3, 5],
          oposesProfoundly: [],
          passive: [2, 7, 9],
        },
        value: '4',
      },
    },
    {
      birthday: new Date('1940-06-11'),
      fullName: exampleFullName,
      expectedNumber: 6,
      expectedInfo: {
        info: {
          vibrate: [4],
          attracts: [3, 7, 9],
          oposes: [1, 8],
          oposesProfoundly: [5],
          passive: [2],
        },
        value: '6',
      },
    },
    {
      birthday: new Date('1966-03-17'),
      fullName: exampleFullName,
      expectedNumber: 8,
      expectedInfo: {
        info: {
          vibrate: [2],
          attracts: [1, 4],
          oposes: [3, 6],
          oposesProfoundly: [],
          passive: [5, 7, 9],
        },
        value: '8',
      },
    },
    {
      birthday: new Date('1962-09-22'),
      fullName: exampleFullName,
      expectedNumber: 6,
      expectedInfo: {
        info: {
          vibrate: [4],
          attracts: [3, 7, 9],
          oposes: [1, 8],
          oposesProfoundly: [5],
          passive: [2],
        },
        value: '6',
      },
    },
    {
      birthday: new Date('1976-05-21'),
      fullName: exampleFullName,
      expectedNumber: 6,
      expectedInfo: {
        info: {
          vibrate: [4],
          attracts: [3, 7, 9],
          oposes: [1, 8],
          oposesProfoundly: [5],
          passive: [2],
        },
        value: '6',
      },
    },
    {
      birthday: new Date('1991-05-18'),
      fullName: 'Marcelo Azevedo da Trindade',
      expectedNumber: 8,
      expectedInfo: {
        info: {
          vibrate: [2],
          attracts: [1, 4],
          oposes: [3, 6],
          oposesProfoundly: [],
          passive: [5, 7, 9],
        },
        value: '8',
      },
    },
  ])(
    'should return the correct conjugal vibration for birthday $birthday',
    ({ birthday, fullName, expectedNumber, expectedInfo }) => {
      expect(getConjugalVibrationNumber({ fullName, birthday })).toBe(
        expectedNumber
      );
      expect(getConjugalVibrationInfo({ fullName, birthday })).toEqual(
        expectedInfo
      );
    }
  );

  test.each([
    {
      fullName: 'Yara Araújo D`Alessandro',
      expected: '11',
    },
    {
      fullName: 'Marcelo Azevedo da Trindade',
      expected: '1',
    },
  ])(
    'should return favorable colors for $fullName',
    ({ fullName, expected }) => {
      expect(getFavorableColors({ fullName })).toBe(expected);
    }
  );
});
