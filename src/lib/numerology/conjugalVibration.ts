import { getMissionNumber, sumDigitsToSingleDigit } from './numbers';
import { OneToNineNumbers } from './types';

export function getConjugalVibrationNumber({
  fullName,
  birthday,
}: {
  fullName: string;
  birthday: Date;
}) {
  const missionNumber = getMissionNumber({ fullName, birthday });

  return sumDigitsToSingleDigit(missionNumber);
}

export function getConjugalVibrationInfo({
  fullName,
  birthday,
}: {
  fullName: string;
  birthday: Date;
}) {
  const vibrationNumber = getConjugalVibrationNumber({ fullName, birthday });
  return {
    value: `${vibrationNumber}` as OneToNineNumbers,
    info: CONJUGAL_VIBRATION[vibrationNumber],
  };
}

const CONJUGAL_VIBRATION: Record<
  number,
  {
    vibrate: number[];
    attracts: number[];
    oposes: number[];
    oposesProfoundly: number[];
    passive: number[];
  }
> = {
  1: {
    vibrate: [9],
    attracts: [4, 8],
    oposes: [6, 7],
    oposesProfoundly: [],
    passive: [2, 3, 5],
  },
  2: {
    vibrate: [8],
    attracts: [7, 9],
    oposes: [5],
    oposesProfoundly: [],
    passive: [1, 3, 4, 6],
  },
  3: {
    vibrate: [7],
    attracts: [5, 6, 9],
    oposes: [4, 8],
    oposesProfoundly: [],
    passive: [1, 2],
  },
  4: {
    vibrate: [6],
    attracts: [1, 8],
    oposes: [3, 5],
    oposesProfoundly: [],
    passive: [2, 7, 9],
  },
  5: {
    vibrate: [5],
    attracts: [3, 9],
    oposes: [2, 4],
    oposesProfoundly: [6],
    passive: [1, 7, 8],
  },
  6: {
    vibrate: [4],
    attracts: [3, 7, 9],
    oposes: [1, 8],
    oposesProfoundly: [5],
    passive: [2],
  },
  7: {
    vibrate: [3],
    attracts: [2, 6],
    oposes: [1, 9],
    oposesProfoundly: [],
    passive: [4, 5, 8],
  },
  8: {
    vibrate: [2],
    attracts: [1, 4],
    oposes: [3, 6],
    oposesProfoundly: [],
    passive: [5, 7, 9],
  },
  9: {
    vibrate: [1],
    attracts: [2, 3, 5, 6],
    oposes: [7],
    oposesProfoundly: [],
    passive: [4, 8],
  },
};
