import { jsPDF } from 'jspdf';

import { AllPossibleNumbers } from '@/lib/numerology/types';

import {
  createTitle,
  NEW_PAGE_START_HEIGHT,
  PALETTE,
  START_HEIGHT,
  START_WIDTH,
  TOP_MARGIN,
} from './base';

type TextItem<T extends AllPossibleNumbers> = {
  title: string;
  items: Record<T, string | null>;
};

type Text<T extends AllPossibleNumbers> = {
  title: string;
  description: string;
  sections: TextItem<T>[];
};

type CreateSectionArgs<T extends AllPossibleNumbers> = {
  pdf: jsPDF;
  title: string;
  results: {
    number: T;
    start: number;
    end?: number;
  }[];
  text: Text<T>;
  locale: string;
};

export async function createPeriodicalSection<T extends AllPossibleNumbers>({
  pdf,
  title,
  results,
  text,
  locale,
}: CreateSectionArgs<T>) {
  const periodicalExtraContentBase = (
    await import(`src/assets/documents/pt-br/periodicalExtraContent.json`)
  ).default;
  const periodicalExtraContent =
    ((
      await import(`src/assets/documents/${locale}/periodicalExtraContent.json`)
    ).default as typeof periodicalExtraContentBase) ??
    periodicalExtraContentBase;

  pdf = await createTitle({
    pdf,
    title: title,
    startHeight: NEW_PAGE_START_HEIGHT,
  });

  pdf.autoTable({
    head: [[text.description]],
    startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 10,
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

  for (let i = 0; i < text.sections.length; i++) {
    const section = text.sections[i];
    const result = results[i];
    const item = section.items[result.number];

    if (!item) {
      continue;
    }

    const endText = result.end
      ? periodicalExtraContent.endText1.replace(
          '{{endAge}}',
          result.end.toString()
        )
      : periodicalExtraContent.endText2;
    pdf.autoTable({
      head: [
        [
          periodicalExtraContent.head1
            .replace('{{title}}', section.title)
            .replace('{{number}}', result.number.toString())
            .replace('{{start}}', result.start.toString())
            .replace('{{endText}}', endText),
        ],
      ],
      startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
      headStyles: {
        cellPadding: 1,
        textColor: PALETTE.green,
        font: 'CenturyGothic',
        fontSize: 14,
        fontStyle: 'normal',
      },
      theme: 'plain',
      tableWidth: 180,

      margin: { top: TOP_MARGIN },
    });

    pdf.autoTable({
      head: [[item]],
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

  pdf.setDrawColor(PALETTE.green);
  pdf.setLineWidth(0.7);
  pdf.line(
    START_WIDTH,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5,
    190,
    (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 5
  );

  return pdf;
}
