import { jsPDF } from 'jspdf';

import { getPersonalMonths } from '@/lib/numerology/numbers';
import { DefaultNumbers } from '@/lib/numerology/types';

import {
  createTitle,
  NEW_PAGE_START_HEIGHT,
  PALETTE,
  START_HEIGHT,
  START_WIDTH,
  TOP_MARGIN,
} from './base';

type TextItem = {
  title: string;
  data: string;
};

type Text = {
  title: string;
  description: string;
  items: Record<DefaultNumbers, TextItem>;
};

type CreateSectionArgs = {
  pdf: jsPDF;
  title: string;
  results: ReturnType<typeof getPersonalMonths>;
  text: Text;
  locale: string;
};

export async function createPersonalMonthSection({
  pdf,
  title,
  results,
  text,
  locale,
}: CreateSectionArgs) {
  pdf = await createTitle({
    pdf,
    title: title,
    startHeight: NEW_PAGE_START_HEIGHT,
  });

  pdf.autoTable({
    head: [[text.description]],
    startY: (pdf.lastAutoTable.finalY ?? 0) + 10,
    headStyles: {
      cellPadding: 1,
      textColor: PALETTE.black,
      font: 'CenturyGothic',
      fontStyle: 'normal',
      fontSize: 10,
    },
    theme: 'plain',
    tableWidth: 180,
    margin: { top: TOP_MARGIN },
  });

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const parsedNumber = `${result.number}` as DefaultNumbers;
    const item = text.items[parsedNumber];

    if (!item) {
      continue;
    }

    const { month, year, end } = result;

    pdf.autoTable({
      head: [
        [
          await getTitle({
            baseTitle: item.title,
            month,
            year,
            end,
            start: i > 0 && results[i - 1].end ? results[i - 1].end : undefined,
            locale,
          }),
        ],
      ],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.purple,
        font: 'CenturyGothic',
        fontSize: 14,
        fontStyle: 'normal',
      },
      theme: 'plain',
      tableWidth: 180,
      margin: { top: TOP_MARGIN },
    });

    pdf.autoTable({
      head: [[item.data]],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.black,
        font: 'CenturyGothic',
        fontStyle: 'normal',
        fontSize: 10,
      },
      pageBreak: 'auto',
      theme: 'plain',
      tableWidth: 180,
      margin: { top: TOP_MARGIN },
    });
  }

  pdf.setDrawColor(PALETTE.purple);
  pdf.setLineWidth(0.7);
  pdf.line(
    START_WIDTH,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5,
    190,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5
  );

  return pdf;
}

const NUMBER_TO_MONTH = {
  1: 'Jan',
  2: 'Fev',
  3: 'Mar',
  4: 'Abr',
  5: 'Mai',
  6: 'Jun',
  7: 'Jul',
  8: 'Ago',
  9: 'Set',
  10: 'Out',
  11: 'Nov',
  12: 'Dez',
} as const;

type GetTitleArgs = {
  baseTitle: string;
  month: number;
  year: number;
  start?: string;
  end?: string;
  locale: string;
};
async function getTitle({
  baseTitle,
  month,
  year,
  start,
  end,
  locale,
}: GetTitleArgs) {
  const personalDatesExtraContentBase = (
    await import(`src/assets/documents/pt-br/personalDatesExtraContent.json`)
  ).default;
  const personalDatesExtraContent =
    ((
      await import(
        `src/assets/documents/${locale}/personalDatesExtraContent.json`
      )
    ).default as typeof personalDatesExtraContentBase) ??
    personalDatesExtraContentBase;

  if (end) {
    return personalDatesExtraContent.endTitle
      .replace('{{title}}', baseTitle)
      .replace(
        '{{date}}',
        `${NUMBER_TO_MONTH[month as keyof typeof NUMBER_TO_MONTH]}/${year}`
      )
      .replace('{{endDate}}', end);
  }

  if (start) {
    return personalDatesExtraContent.startTitle
      .replace('{{title}}', baseTitle)
      .replace(
        '{{date}}',
        `${NUMBER_TO_MONTH[month as keyof typeof NUMBER_TO_MONTH]}/${year}`
      )
      .replace('{{startDate}}', start);
  }

  return personalDatesExtraContent.baseTitle
    .replace('{{title}}', baseTitle)
    .replace(
      '{{date}}',
      `${NUMBER_TO_MONTH[month as keyof typeof NUMBER_TO_MONTH]}/${year}`
    );
}
