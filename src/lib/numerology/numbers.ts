import { getDate, getMonth, getYear } from 'date-fns';

import { ChallengesNumbers, DefaultNumbers, OneToNineNumbers } from './types';

export const Consonants = {
  b: 2,
  c: 3,
  d: 4,
  f: 8,
  g: 3,
  h: 5,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  p: 8,
  q: 1,
  r: 2,
  s: 3,
  t: 4,
  v: 6,
  w: 6,
  x: 6,
  z: 7,
  ç: 6,
  "'": 2,
  '`': 2,
  º: 7,
};

export const Vowels = {
  a: 1,
  á: 1 + 2,
  à: 1 * 2,
  ä: 1 * 2,
  ã: 1 + 3,
  â: 1 + 7,
  e: 5,
  é: 5 + 2,
  è: 5 * 2,
  ë: 5 * 2,
  ê: 5 + 7,
  i: 1,
  í: 1 + 2,
  ì: 1 * 2,
  ï: 1 * 2,
  î: 1 + 7,
  o: 7,
  ó: 7 + 2,
  ò: 7 * 2,
  ö: 7 * 2,
  õ: 7 + 3,
  ô: 7 + 7,
  u: 6,
  ú: 6 + 2,
  ù: 6 * 2,
  ü: 6 * 2,
  û: 6 + 7,
  y: 1,
};

export const LetterValues = {
  ...Vowels,
  ...Consonants,
};

export function sumDigitsToSingleDigit(value: number): number {
  const newValue = value
    .toString()
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  if (value >= 10) return sumDigitsToSingleDigit(newValue);

  return newValue;
}

export function sumDigits(value: number): number {
  const newValue = value
    .toString()
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  if (newValue === 11 || newValue === 22 || value < 10) return newValue;

  return sumDigits(newValue);
}

function getValue(name: string, base: Record<string, number>): number {
  const value = name
    .toLowerCase()
    .split('')
    .reduce((acc, letter) => {
      if (letter in base) {
        acc += base[letter as keyof typeof base];
      }

      return acc;
    }, 0);

  if (value === 11 || value === 22 || value < 10) return value;

  return sumDigits(value);
}

export function getImpressionNumber({
  fullName,
}: {
  fullName: string;
}): number {
  return sumDigitsToSingleDigit(getValue(fullName, Consonants));
}

export function getMotivationNumber({
  fullName,
}: {
  fullName: string;
}): number {
  return getValue(fullName, Vowels);
}

export function getExpressionNumber({
  fullName,
}: {
  fullName: string;
}): number {
  const sumFullName = getValue(fullName, LetterValues);
  if (sumFullName !== 2 && sumFullName !== 4) return sumFullName;

  const names = fullName.split(' ');
  const reducedNamesCount = names.reduce((acc, name) => {
    const sum = sumDigitsToSingleDigit(getValue(name, LetterValues));
    return acc + sum;
  }, 0);

  return sumDigits(reducedNamesCount);
}

export const BornDates = {
  1: {
    birthdayVibration: 'Liderança',
    psychicNumber: 1,
  },
  2: {
    birthdayVibration: 'Diplomacia',
    psychicNumber: 2,
  },
  3: {
    birthdayVibration: 'Popularidade',
    psychicNumber: 3,
  },
  4: {
    birthdayVibration: 'Persistência',
    psychicNumber: 4,
  },
  5: {
    birthdayVibration: 'Versatilidade',
    psychicNumber: 5,
  },
  6: {
    birthdayVibration: 'Amor',
    psychicNumber: 6,
  },
  7: {
    birthdayVibration: 'Inspiração',
    psychicNumber: 7,
  },
  8: {
    birthdayVibration: 'Êxito Material',
    psychicNumber: 8,
  },
  9: {
    birthdayVibration: 'Humanismo',
    psychicNumber: 9,
  },
  10: {
    birthdayVibration: 'Autoconfiança',
    psychicNumber: 1,
  },
  11: {
    birthdayVibration: 'Harmonia',
    psychicNumber: 2,
  },
  12: {
    birthdayVibration: 'Autoexpressão',
    psychicNumber: 3,
  },
  13: {
    birthdayVibration: 'Perícia',
    psychicNumber: 4,
  },
  14: {
    birthdayVibration: 'Compreensão',
    psychicNumber: 5,
  },
  15: {
    birthdayVibration: 'Magnetismo Pessoal',
    psychicNumber: 6,
  },
  16: {
    birthdayVibration: 'Triunfo',
    psychicNumber: 7,
  },
  17: {
    birthdayVibration: 'Perspicácia',
    psychicNumber: 8,
  },
  18: {
    birthdayVibration: 'Poder Mental',
    psychicNumber: 9,
  },
  19: {
    birthdayVibration: 'Caráter',
    psychicNumber: 1,
  },
  20: {
    birthdayVibration: 'Sensibilidade',
    psychicNumber: 2,
  },
  21: {
    birthdayVibration: 'Idealismo',
    psychicNumber: 3,
  },
  22: {
    birthdayVibration: 'Praticidade',
    psychicNumber: 4,
  },
  23: {
    birthdayVibration: 'Persuasão',
    psychicNumber: 5,
  },
  24: {
    birthdayVibration: 'União',
    psychicNumber: 6,
  },
  25: {
    birthdayVibration: 'Progresso',
    psychicNumber: 7,
  },
  26: {
    birthdayVibration: 'Justiça',
    psychicNumber: 8,
  },
  27: {
    birthdayVibration: 'Audácia',
    psychicNumber: 9,
  },
  28: {
    birthdayVibration: 'Querer',
    psychicNumber: 1,
  },
  29: {
    birthdayVibration: 'Espiritualidade',
    psychicNumber: 2,
  },
  30: {
    birthdayVibration: 'Realização',
    psychicNumber: 3,
  },
  31: {
    birthdayVibration: 'Habilidade',
    psychicNumber: 4,
  },
};

export function getBornDatesData({ birthday }: { birthday: Date }) {
  const day = birthday.getDate();

  return BornDates[day as keyof typeof BornDates];
}

export function getDestinyNumber({ birthday }: { birthday: Date }): number {
  const day = getDate(birthday);
  const month = getMonth(birthday) + 1;
  const year = getYear(birthday);

  const destinyNumber = sumDigits(Number(`${day}${month}${year}`));

  if (destinyNumber === 4 || destinyNumber === 2) {
    const [dayDestinyNumber, monthDestinyNumber, yearDestinyNumber] = [
      day,
      month,
      year,
    ].map((number) => sumDigits(Number(number)));

    const sum = dayDestinyNumber + monthDestinyNumber + yearDestinyNumber;

    if (sum === 11 || sum === 22 || sum < 10) return sum;
    return sumDigits(sum);
  }

  return destinyNumber;
}

export function getMissionNumber({
  fullName,
  birthday,
}: {
  fullName: string;
  birthday: Date;
}): number {
  const expressionValue = getExpressionNumber({ fullName });
  const destinyNumber = getDestinyNumber({ birthday });

  const sum = expressionValue + destinyNumber;

  if (sum === 11 || sum === 22) return sum;

  return sumDigits(sum);
}

export function getHiddenTalentNumber({
  fullName,
}: {
  fullName: string;
}): number {
  const expressionValue = getExpressionNumber({ fullName });
  const motivationNumber = getMotivationNumber({ fullName });

  const sum = expressionValue + motivationNumber;

  if (sum === 11 || sum === 22) return sum;

  return sumDigits(sum);
}

export function getKarmicLessons({ fullName }: { fullName: string }): number[] {
  const values: number[] = [];

  fullName
    .toLowerCase()
    .split('')
    .forEach((letter) => {
      if (letter in LetterValues) {
        if (letter === '`' || letter === "'") {
          const lastValue = values.pop() ?? 0;
          return values.push(lastValue + 2);
        }

        return values.push(LetterValues[letter as keyof typeof LetterValues]);
      }
    });

  const valuesSet = new Set(values);

  return Array.from({ length: 9 })
    .map((_, idx) => {
      if (valuesSet.has(idx + 1)) return 0;

      return idx + 1;
    })
    .filter((n) => n !== 0)
    .sort((a, b) => a - b);
}

export function getKarmicDebts({
  fullName,
  birthday,
}: {
  fullName: string;
  birthday: Date;
}): number[] {
  const birthDay = getDate(birthday);

  const destinyNumber = getDestinyNumber({ birthday });
  const motivationNumber = getMotivationNumber({ fullName });
  const expressionNumber = getExpressionNumber({ fullName });

  const karmicDebts: number[] = [];

  if (birthDay === 13) karmicDebts.push(13);
  if (birthDay === 14) karmicDebts.push(14);
  if (birthDay === 16) karmicDebts.push(16);
  if (birthDay === 19) karmicDebts.push(19);

  if (destinyNumber === 4) karmicDebts.push(13);
  if (motivationNumber === 4) karmicDebts.push(13);
  if (expressionNumber === 4) karmicDebts.push(13);

  if (destinyNumber === 5) karmicDebts.push(14);
  if (motivationNumber === 5) karmicDebts.push(14);
  if (expressionNumber === 5) karmicDebts.push(14);

  if (destinyNumber === 7) karmicDebts.push(16);
  if (motivationNumber === 7) karmicDebts.push(16);
  if (expressionNumber === 7) karmicDebts.push(16);

  if (destinyNumber === 1) karmicDebts.push(19);
  if (motivationNumber === 1) karmicDebts.push(19);
  if (expressionNumber === 1) karmicDebts.push(19);

  return karmicDebts.sort((a, b) => a - b);
}

export function getHiddenTendencies({
  fullName,
}: {
  fullName: string;
}): number[] {
  const valuesMap = new Map<number, number>();

  const parsedName = fullName.toLowerCase().split('');

  parsedName.forEach((letter, index) => {
    if (letter in LetterValues) {
      if (letter === '`' || letter === "'") return;
      const letterValue = LetterValues[letter as keyof typeof LetterValues];

      const nextLetter = parsedName[index + 1];
      if (nextLetter === '`' || nextLetter === "'") {
        const updatedLetterValue = letterValue + 2;
        const currentLetterValueInMap = valuesMap.get(letterValue) ?? 0;
        return valuesMap.set(updatedLetterValue, currentLetterValueInMap + 1);
      }

      const currentLetterValueInMap = valuesMap.get(letterValue) ?? 0;
      return valuesMap.set(letterValue, currentLetterValueInMap + 1);
    }
  });

  return Array.from(valuesMap.entries())
    .map(([key, value]) => {
      if (value < 4) return 0;
      return key;
    })
    .filter((value) => value !== 0)
    .sort((a, b) => a - b);
}

export function getSubconsciousResponse({
  fullName,
}: {
  fullName: string;
}): number {
  const karmicLessons = getKarmicLessons({ fullName });

  return 9 - karmicLessons.length;
}

export function getLifeCycles({ birthday }: { birthday: Date }) {
  const destinyNumber = getDestinyNumber({ birthday });

  const day = getDate(birthday);
  const month = getMonth(birthday) + 1;
  const year = getYear(birthday);

  const firstCycleEnergyNumber = sumDigits(month);
  const firstCycleEnd = year + 37 - destinyNumber;

  const secondCycleEnergyNumber = sumDigits(day);
  const secondCycleEnd = firstCycleEnd + 27;

  const thirdCycleEnergyNumber = sumDigits(year);

  return {
    first: {
      energyNumber: `${firstCycleEnergyNumber}` as DefaultNumbers,
      start: year,
      end: firstCycleEnd,
    },
    second: {
      energyNumber: `${secondCycleEnergyNumber}` as DefaultNumbers,
      start: firstCycleEnd,
      end: secondCycleEnd,
    },
    third: {
      energyNumber: `${thirdCycleEnergyNumber}` as DefaultNumbers,
      start: secondCycleEnd,
      end: undefined,
    },
  };
}

export function getChallenges({ birthday }: { birthday: Date }) {
  const destinyNumber = getDestinyNumber({ birthday });

  const day = getDate(birthday);
  const month = getMonth(birthday) + 1;
  const year = getYear(birthday);

  const reducedDay = sumDigits(day);
  const reducedMonth = sumDigits(month);
  const reducedYear = sumDigits(year);

  const firstCycleEnd = year + 37 - destinyNumber;
  const secondCycleEnd = firstCycleEnd + 27;

  const firstChallenge =
    reducedDay > reducedMonth
      ? reducedDay - reducedMonth
      : reducedMonth - reducedDay;
  const secondChallenge =
    reducedDay > reducedYear
      ? reducedDay - reducedYear
      : reducedYear - reducedDay;

  return {
    first: {
      number: `${firstChallenge}` as ChallengesNumbers,
      start: year,
      end: firstCycleEnd,
    },
    second: {
      number: `${secondChallenge}` as ChallengesNumbers,
      start: firstCycleEnd,
      end: secondCycleEnd,
    },
    main: {
      number:
        firstChallenge > secondChallenge
          ? (`${firstChallenge - secondChallenge}` as ChallengesNumbers)
          : (`${secondChallenge - firstChallenge}` as ChallengesNumbers),
      start: secondCycleEnd,
      end: undefined,
    },
  };
}

export function getDecisiveMoments({ birthday }: { birthday: Date }) {
  const day = getDate(birthday);
  const month = getMonth(birthday) + 1;
  const year = getYear(birthday);

  const endOfFirstCycle = getLifeCycles({ birthday }).first.end;

  const firstDecisiveMoment = sumDigits(day + month);
  const secondDecisiveMoment = sumDigits(day + year);
  const thirdDecisiveMoment = sumDigits(
    firstDecisiveMoment + secondDecisiveMoment
  );
  const fourthDecisiveMoment = sumDigits(month + year);

  return {
    first: {
      number: `${firstDecisiveMoment}` as DefaultNumbers,
      start: year,
      end: endOfFirstCycle,
    },
    second: {
      number: `${secondDecisiveMoment}` as DefaultNumbers,
      start: endOfFirstCycle,
      end: endOfFirstCycle + 9,
    },
    third: {
      number: `${thirdDecisiveMoment}` as DefaultNumbers,
      start: endOfFirstCycle + 9,
      end: endOfFirstCycle + 18,
    },
    fourth: {
      number: `${fourthDecisiveMoment}` as DefaultNumbers,
      start: endOfFirstCycle + 18,
      end: undefined,
    },
  };
}

export function getPersonalYear({
  birthday,
  baseYear,
  dateToCheck,
}: {
  birthday: Date;
  baseYear: number;
  dateToCheck: Date;
}) {
  const day = getDate(birthday);
  const month = getMonth(birthday) + 1;

  const dayToday = getDate(dateToCheck);
  const monthToday = getMonth(dateToCheck) + 1;
  const yearToday = getYear(dateToCheck);

  if (
    yearToday <= baseYear &&
    (monthToday < month || (monthToday === month && dayToday > day))
  ) {
    return [
      {
        year: yearToday,
        number: sumDigitsToSingleDigit(day + month + (yearToday - 1)),
        end: `${day - 1}/0${month}/${yearToday}`,
      },
      {
        year: yearToday,
        number: sumDigitsToSingleDigit(day + month + yearToday),
      },
    ];
  }

  return [
    {
      year: yearToday,
      number: sumDigitsToSingleDigit(day + month + yearToday),
    },
  ];
}

export function getPersonalYears({ birthday }: { birthday: Date }) {
  const today = new Date();

  const dayToday = today.getDate();
  const monthToday = today.getMonth() + 1;
  const yearToday = today.getFullYear();

  const yearNumbers: {
    year: number;
    number: OneToNineNumbers;
    end?: string;
  }[] = [];

  Array.from({ length: 9 }).forEach((_, idx) => {
    const year = yearToday + idx;
    const currentPersonalYear = getPersonalYear({
      birthday,
      baseYear: yearToday,
      dateToCheck: new Date(`${year}-${monthToday}-${dayToday}`),
    }).map((data) => {
      return {
        ...data,
        number: `${data.number}` as OneToNineNumbers,
      };
    });
    yearNumbers.push(...currentPersonalYear);
  });

  return yearNumbers;
}

export function getPersonalMonth({
  birthday,
  baseYear,
  desiredMonth,
  dateToCheck,
}: {
  birthday: Date;
  baseYear: number;
  desiredMonth: number;
  dateToCheck: Date;
}) {
  const day = getDate(birthday);
  const month = getMonth(birthday) + 1;
  const yearToCheck = getYear(dateToCheck);

  if (month > desiredMonth && yearToCheck > baseYear) {
    const personalYear = getPersonalYear({
      birthday,
      baseYear: baseYear + 1,
      dateToCheck,
    });
    const sum = personalYear[0].number + desiredMonth;

    return [
      {
        year: yearToCheck,
        month: desiredMonth,
        number: sum === 11 || sum === 22 ? sum : sumDigits(sum),
      },
    ];
  }

  const personalYear = getPersonalYear({ birthday, baseYear, dateToCheck });

  const personalMonth = personalYear.map((year, idx) => {
    if (personalYear.length === 2 && idx === 0) {
      return {
        year: yearToCheck,
        month: desiredMonth,
        number: sumDigits(year.number - 1 + desiredMonth),
        end: `${day - 1}/0${month}/${year.year}`,
      };
    }
    if (month > desiredMonth && yearToCheck > baseYear) {
      const sum = year.number + 1 + desiredMonth;

      return [
        {
          year: yearToCheck,
          month: desiredMonth,
          number: sum === 11 || sum === 22 ? sum : sumDigits(sum),
        },
      ];
    }
    if (month === desiredMonth) {
      return [
        {
          year: yearToCheck,
          month: desiredMonth,
          number: sumDigits(year.number - 1 + desiredMonth),
          end: `${day}/0${month}/${year.year}`,
        },
        {
          year: yearToCheck,
          month: desiredMonth,
          number: sumDigits(year.number + desiredMonth),
        },
      ];
    }
    return {
      year: yearToCheck,
      month: desiredMonth,
      number: sumDigits(year.number + desiredMonth),
    };
  });

  return personalMonth.flat();
}

export function getPersonalMonths({ birthday }: { birthday: Date }) {
  const today = new Date();

  const dayToday = today.getDate();
  const monthToday = today.getMonth() + 1;
  const yearToday = today.getFullYear();

  const personalMonths: {
    year: number;
    month: number;
    number: number;
    end?: string;
  }[] = [];

  Array.from({ length: 12 }).forEach((_, idx) => {
    const month = monthToday + idx;
    const desiredMonth = month > 12 ? month - 12 : month;
    const yearToUse = month > 12 ? yearToday + 1 : yearToday;

    const personalMonth = getPersonalMonth({
      birthday,
      baseYear: yearToday,
      desiredMonth,
      dateToCheck: new Date(`${yearToUse}-${desiredMonth}-${dayToday}`),
    });

    personalMonths.push(...personalMonth);
  });

  return personalMonths.flat();
}

const has28Days = [2];
const has30Days = [4, 6, 9, 11];

export function getPersonalDays({ birthday }: { birthday: Date }) {
  const birthDay = getDate(birthday);
  const birthMonth = getMonth(birthday) + 1;

  const personalMonths = getPersonalMonths({ birthday });
  const birthdayMonthPersonalNumber = personalMonths.find(
    (month) => !!month.end
  );

  let initialPersonalMonthNumber: number | null = null;

  const personalDaysByMonth = personalMonths
    .map((month) => {
      if (month.end) {
        initialPersonalMonthNumber = month.number;
        return;
      }

      const monthNumber = initialPersonalMonthNumber
        ? `${initialPersonalMonthNumber},${month.number}`
        : `${month.number}`;

      if (initialPersonalMonthNumber) {
        initialPersonalMonthNumber = null;
      }

      return {
        year: month.year,
        month: month.month,
        monthNumber: monthNumber,
        days: Array.from({ length: 31 })
          .map((_, idx) => {
            if (has28Days.includes(month.month) && idx >= 28) return;
            if (has30Days.includes(month.month) && idx >= 30) return;

            const day = idx + 1;

            if (month.month === birthMonth && day < birthDay) {
              const sum =
                day + (birthdayMonthPersonalNumber?.number ?? month.number);
              return sum === 11 || sum === 22 ? sum : sumDigits(sum);
            }

            const sum = month.number + day;
            return sum === 11 || sum === 22 ? sum : sumDigits(sum);
          })
          .filter(Boolean),
      };
    })
    .filter(Boolean) as {
    year: number;
    month: number;
    monthNumber: string;
    days: number[];
  }[];

  return personalDaysByMonth;
}

export function getAscensionDegree({ fullName }: { fullName: string }) {
  const vowelsSum = getMotivationNumber({ fullName });
  const consonantsSum = getImpressionNumber({ fullName });

  if (vowelsSum === consonantsSum) return 'illuminated' as const;
  if (vowelsSum > consonantsSum) return 'descendent' as const;
  return 'ascendent' as const;
}

export function getFavorableColors({ fullName }: { fullName: string }) {
  const expressionNumber = getExpressionNumber({ fullName });

  return `${expressionNumber}` as
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '11'
    | '22';
}

export const FAVORABLE_COLORS = {
  1: 'todos os tons de amarelo e laranja, castanho, dourado, verde, creme e branco.',
  2: 'todos os tons de verde, creme, branco e cinza.',
  3: 'violeta, vinho, púrpura e vermelha.',
  4: 'azul, cinza, púrpura e ouro.',
  5: 'todas as cores claras, cinza e prateado.',
  6: 'rosa, azul e verde.',
  7: 'verde, amarelo, branco, cinza e azul-claro.',
  8: 'púrpura, cinza, azul, preto e castanho.',
  9: 'vermelho, rosa, coral e vinho.',
  11: 'branco, violeta e cores claras.',
  22: 'violeta, branco e cores claras',
};
