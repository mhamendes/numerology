import { getDate, getMonth, getYear } from 'date-fns';

import { LetterValues, sumDigitsToSingleDigit } from './numbers';
import { ArcaneNumbers, NegativeSequences } from './types';

export function invertedTriangles({
  fullName,
  birthday,
}: {
  fullName: string;
  birthday: Date;
}) {
  const baseTriangleArray: number[] = [];

  fullName
    .toLowerCase()
    .split('')
    .forEach((letter) => {
      if (letter in LetterValues) {
        if (letter === '`' || letter === "'") {
          const lastValue = baseTriangleArray.pop() ?? 0;
          return baseTriangleArray.push(lastValue + 2);
        }

        return baseTriangleArray.push(
          sumDigitsToSingleDigit(
            LetterValues[letter as keyof typeof LetterValues]
          )
        );
      }
    });

  const baseNegativeSequences = getNegativeSequences(baseTriangleArray);

  const { singleDigitArcane, negativeSequences, allTriangleSums } =
    sumTriangleValues({
      triangle: baseTriangleArray,
      negativeSequences: baseNegativeSequences,
      allTriangleSums: [baseTriangleArray],
    });

  const arcanePairs = getArcanesPairs(baseTriangleArray) as ArcaneNumbers[];
  const numberOfArcanes = arcanePairs.length;

  const yearsForEachArcane = Math.floor(90 / numberOfArcanes);
  const monthsForEachArcane = Math.round(
    (90 / numberOfArcanes - yearsForEachArcane) * 12
  );

  const currentAge = getCurrentAge(birthday);

  const { currentArcane, currentArcaneEndAge } = getCurrentArcane(
    currentAge,
    yearsForEachArcane + monthsForEachArcane / 12,
    arcanePairs
  );

  return {
    singleDigitArcane,
    negativeSequences: negativeSequences.sort() as NegativeSequences[],
    numberOfArcanes,
    timeOfEachArcane: {
      years: yearsForEachArcane,
      months: monthsForEachArcane,
    },
    currentAge,
    currentArcane,
    currentArcaneEndAge,
    arcanePairs,
    allTriangleSums: [
      fullName.replace(/\s+/g, '').split(''),
      ...getTriangleSumWithNegativeSequences(
        allTriangleSums,
        negativeSequences
      ),
    ],
  };
}

function sumTriangleValues({
  triangle,
  negativeSequences,
  allTriangleSums,
}: {
  triangle: number[];
  negativeSequences: string[];
  allTriangleSums: number[][];
}): {
  singleDigitArcane: number;
  negativeSequences: string[];
  allTriangleSums: number[][];
} {
  if (triangle.length === 1)
    return {
      singleDigitArcane: triangle[0],
      negativeSequences,
      allTriangleSums,
    };

  const newTriangle = [];

  for (let i = 0; i < triangle.length - 1; i++) {
    newTriangle.push(sumDigitsToSingleDigit(triangle[i] + triangle[i + 1]));
  }

  const newNegativeSequences = getNegativeSequences(newTriangle);

  const updatedNegativeSequences = new Set([
    ...negativeSequences,
    ...newNegativeSequences,
  ]);

  allTriangleSums.push(newTriangle);

  return sumTriangleValues({
    triangle: newTriangle,
    negativeSequences: Array.from(updatedNegativeSequences),
    allTriangleSums,
  });
}

function getTriangleSumWithNegativeSequences(
  triangles: number[][],
  negativeSequences: string[]
): string[][] {
  return triangles.map((triangle) => {
    let triangleJoin = triangle.join('');

    negativeSequences.forEach((negativeSequence) => {
      if (!triangleJoin.includes(negativeSequence)) return;

      const negativeSequenceNumber = negativeSequence[0];
      const triangleLength = triangleJoin.length;

      for (let i = triangleLength; i >= 3; i--) {
        const sequence = Array.from(
          { length: i },
          (_) => negativeSequenceNumber
        ).join('');

        const split = triangleJoin.split(sequence);
        const firstComponent = split[0];
        const lastCharFirstComponent =
          firstComponent[firstComponent.length - 1];
        if (!lastCharFirstComponent || lastCharFirstComponent === '-') continue;
        triangleJoin = split.join(`-${sequence}-`);
      }
    });

    return triangleJoin.split('-');
  });
}

function getArcanesPairs(triangle: number[]): string[] {
  const pairs = [];

  for (let i = 0; i < triangle.length - 1; i++) {
    pairs.push(`${triangle[i]}${triangle[i + 1]}`);
  }

  return pairs;
}

function getNegativeSequences(array: number[]): string[] {
  const repetitions = [];

  for (let i = 0; i < array.length - 2; i++) {
    if (array[i] === array[i + 1] && array[i] === array[i + 2]) {
      const sequence = `${array[i]}${array[i + 1]}${array[i + 2]}`;
      repetitions.push(sequence);
    }
  }

  return repetitions;
}

function getCurrentAge(birthday: Date) {
  const day = getDate(birthday);
  const month = getMonth(birthday) + 1;
  const year = getYear(birthday);
  const currentYear = new Date().getFullYear();

  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  if (currentMonth > month) return currentYear - year;

  if (currentMonth === month) {
    if (currentDay >= day) return currentYear - year;
    return currentYear - year - 1;
  }

  return currentYear - year - 1;
}

function getCurrentArcane(
  currentAge: number,
  yearsForEachArcane: number,
  arcanePairs: string[]
) {
  const currentArcaneIndex = Math.floor(currentAge / yearsForEachArcane);

  return {
    currentArcane: arcanePairs[currentArcaneIndex],
    currentArcaneEndAge: Math.ceil(
      (currentArcaneIndex + 1) * yearsForEachArcane
    ),
  };
}
