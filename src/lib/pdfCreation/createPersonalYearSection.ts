import { getDate, getMonth } from 'date-fns';
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
  birthday: Date;
  title: string;
  results: ReturnType<typeof getPersonalYears>;
  text: Text;
  locale: string;
};

export async function createPersonalYearSection({
  pdf,
  birthday,
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

  const day = getDate(birthday);
  const month = getMonth(birthday) + 1;

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
            .replace('{{start}}', `${day}/${month}/${result.year}`)
            .replace(
              '{{endText}}',
              `${getEndDate(day, month)}/${result.year + 1}`
            ),
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
      head: [[item.title]],
      startY: pdf.lastAutoTable.finalY ?? START_HEIGHT,
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
        head: [['Orientação:']],
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

const getEndDate = (day: number, month: number) => {
  if (day !== 1) {
    return `${day - 1}/${month}`;
  }

  const previousMonth = month === 1 ? 12 : month - 1;

  if (previousMonth === 2) {
    return `28/${previousMonth}`;
  }
  if ([4, 6, 9, 11].includes(previousMonth)) {
    return `30/${previousMonth}`;
  }

  return `31/${previousMonth}`;
};
