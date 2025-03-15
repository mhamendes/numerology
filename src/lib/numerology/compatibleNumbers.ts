import { getDate } from 'date-fns';

import { sumDigitsToSingleDigit } from './numbers';
import { OneToNineNumbers } from './types';

export function getCompatibleNumbersValue({ birthday }: { birthday: Date }) {
  const day = getDate(birthday);

  return sumDigitsToSingleDigit(day);
}

export function getCompatibleNumbersInfo({ birthday }: { birthday: Date }) {
  const compatibleNumbersValue = getCompatibleNumbersValue({ birthday });

  return {
    value: `${compatibleNumbersValue}` as OneToNineNumbers,
    info: NUMERIC_HARMONY[compatibleNumbersValue],
  };
}

const NUMERIC_HARMONY: Record<
  number,
  {
    compatible: number[];
    neutral: number[];
    incompatible: number[];
  }
> = {
  1: {
    compatible: [2, 4, 9],
    neutral: [1, 5, 6, 8],
    incompatible: [3, 7],
  },
  2: {
    compatible: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    neutral: [],
    incompatible: [],
  },
  3: {
    compatible: [2, 3, 6, 8, 9],
    neutral: [7, 4],
    incompatible: [1, 5],
  },
  4: {
    compatible: [1, 2, 6, 7],
    neutral: [3, 5, 9],
    incompatible: [4, 8],
  },
  5: {
    compatible: [2, 5, 6, 7, 9],
    neutral: [1, 4],
    incompatible: [3, 8],
  },
  6: {
    compatible: [2, 3, 4, 5, 6, 9],
    neutral: [1],
    incompatible: [7, 8],
  },
  7: {
    compatible: [2, 4, 5, 7],
    neutral: [3, 9],
    incompatible: [1, 6, 8],
  },
  8: {
    compatible: [2, 3, 9],
    neutral: [1, 6],
    incompatible: [4, 5, 7, 8],
  },
  9: {
    compatible: [1, 2, 3, 5, 6, 8, 9],
    neutral: [4, 7],
    incompatible: [],
  },
};
