import { jsPDF } from 'jspdf';

import { getLifeCycles } from '@/lib/numerology/numbers';
import { DefaultNumbers } from '@/lib/numerology/types';

import { createPeriodicalSection } from './createPeriodicalSection';

type TextItem<T extends DefaultNumbers> = {
  title: string;
  items: Record<T, string | null>;
};

type Text = {
  title: string;
  description: string;
  first: TextItem<DefaultNumbers>;
  second: TextItem<DefaultNumbers>;
  third: TextItem<DefaultNumbers>;
};

type CreateSectionArgs = {
  pdf: jsPDF;
  title: string;
  result: ReturnType<typeof getLifeCycles>;
  text: Text;
  locale: string;
};

export async function createLifeCycleSection({
  pdf,
  title,
  result,
  text,
  locale,
}: CreateSectionArgs) {
  pdf = await createPeriodicalSection({
    pdf,
    title: title,
    locale,
    results: [
      {
        number: result.first.energyNumber,
        start: result.first.start,
        end: result.first.end,
      },
      {
        number: result.second.energyNumber,
        start: result.second.start,
        end: result.second.end,
      },
      {
        number: result.third.energyNumber,
        start: result.third.start,
        end: result.third.end,
      },
    ],
    text: {
      title: text.title,
      description: text.description,
      sections: [text.first, text.second, text.third],
    },
  });

  return pdf;
}
