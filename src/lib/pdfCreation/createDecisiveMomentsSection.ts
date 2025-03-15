import { jsPDF } from 'jspdf';

import { getDecisiveMoments } from '@/lib/numerology/numbers';

import { DefaultNumbers } from '../numerology/types';

import { createPeriodicalSection } from './createPeriodicalSection';

type Text = {
  title: string;
  description: string;
  items: Record<DefaultNumbers, string | null>;
};

type CreateSectionArgs = {
  pdf: jsPDF;
  title: string;
  result: ReturnType<typeof getDecisiveMoments>;
  text: Text;
  locale: string;
};

export async function createDecisiveMomentsSection({
  pdf,
  title,
  result,
  text,
  locale,
}: CreateSectionArgs) {
  const sectionTitlesBase = (
    await import(`src/assets/documents/pt-br/sectionTitles.json`)
  ).default;
  const sectionTitles =
    ((await import(`src/assets/documents/${locale}/sectionTitles.json`))
      .default as typeof sectionTitlesBase) ?? sectionTitlesBase;

  pdf = await createPeriodicalSection({
    pdf,
    title: title,
    results: [
      {
        number: result.first.number,
        start: result.first.start,
        end: result.first.end,
      },
      {
        number: result.second.number,
        start: result.second.start,
        end: result.second.end,
      },
      {
        number: result.third.number,
        start: result.third.start,
        end: result.third.end,
      },
      {
        number: result.fourth.number,
        start: result.fourth.start,
        end: result.fourth.end,
      },
    ],
    locale,
    text: {
      title: text.title,
      description: text.description,
      sections: [
        { title: sectionTitles.firstDecisiveMoment, items: text.items },
        { title: sectionTitles.secondDecisiveMoment, items: text.items },
        { title: sectionTitles.thirdDecisiveMoment, items: text.items },
        { title: sectionTitles.fourthDecisiveMoment, items: text.items },
      ],
    },
  });

  return pdf;
}
