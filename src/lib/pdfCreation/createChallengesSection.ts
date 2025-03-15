import { jsPDF } from 'jspdf';

import { getChallenges } from '@/lib/numerology/numbers';
import { ChallengesNumbers } from '@/lib/numerology/types';

import { createPeriodicalSection } from './createPeriodicalSection';

type Text = {
  title: string;
  description: string;
  items: Record<ChallengesNumbers, string | null>;
};

type CreateSectionArgs = {
  pdf: jsPDF;
  title: string;
  result: ReturnType<typeof getChallenges>;
  text: Text;
  locale: string;
};

export async function createChallengesSection({
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
    locale,
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
        number: result.main.number,
        start: result.main.start,
        end: result.main.end,
      },
    ],
    text: {
      title: text.title,
      description: text.description,
      sections: [
        { title: sectionTitles.firstChallenge, items: text.items },
        { title: sectionTitles.secondChallenge, items: text.items },
        { title: sectionTitles.mainChallenge, items: text.items },
      ],
    },
  });

  return pdf;
}
