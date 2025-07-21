import { jsPDF } from 'jspdf';

import { getPersonalYears } from '@/lib/numerology/numbers';
import { OneToNineNumbers } from '@/lib/numerology/types';

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
  orientation: string;
};

type Text = {
  title: string;
  description: string;
  items: Record<OneToNineNumbers, TextItem>;
};

type CreateSectionArgs = {
  pdf: jsPDF;
  title: string;
  results: ReturnType<typeof getPersonalYears>;
  text: Text;
  locale: string;
};

export async function createPersonalYearSection({
  pdf,
  title,
  results,
  text,
  locale,
}: CreateSectionArgs) {
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
    const item = text.items[result.number];

    if (!item) {
      continue;
    }

    pdf.autoTable({
      head: [
        [
          personalDatesExtraContent.period
            .replace('{{start}}', result.start)
            .replace('{{endText}}', result.end),
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
      head: [[item.title]],
      startY: pdf.lastAutoTable.finalY ?? START_HEIGHT,
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

    if (item.orientation) {
      pdf.autoTable({
        head: [[`${personalDatesExtraContent.orientation}:`]],
        startY: (pdf.lastAutoTable.finalY ?? START_HEIGHT) + 2,
        headStyles: {
          cellPadding: 1,
          textColor: PALETTE.black,
          font: 'CenturyGothic',
          fontStyle: 'bold',
          fontSize: 10,
        },
        pageBreak: 'auto',
        theme: 'plain',
        tableWidth: 180,
        margin: { top: TOP_MARGIN },
      });

      pdf.autoTable({
        head: [[item.orientation]],
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
